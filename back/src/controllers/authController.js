const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const dotenv = require('dotenv');
const db = require('../config/db');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET 
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET 
const TOKEN_EXPIRATION = '1h';
const REFRESH_TOKEN_EXPIRATION = '7d';

// Fonction de validation de l'email
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Fonction de validation du mot de passe
const validatePassword = (password) => {
  return password.length >= 6;
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Format d\'email invalide' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role_name },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );

    // Stocker le refresh token en base de données
    await db.query('UPDATE Users SET refresh_token = ? WHERE id = ?', [refreshToken, user.id]);

    await User.updateLastLogin(user.id);

    res.status(200).json({
      success: true,
      token,
      refreshToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role_name,
        roleId: user.roleId,
        lots: user.lots,
        status: user.status,
        avatar: user.avatar,
        last_login: user.last_login,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion', details: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role_name,
      roleId: user.roleId,
      lots: user.lots,
      status: user.status,
      avatar: user.avatar,
      last_login: user.last_login,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Erreur getCurrentUser:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur', details: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token requis' });
    }

    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const [rows] = await db.query('SELECT * FROM Users WHERE id = ? AND refresh_token = ?', [decoded.userId, refreshToken]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Refresh token invalide' });
    }

    const newToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role_name },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );

    res.status(200).json({ token: newToken });
  } catch (error) {
    console.error('Erreur refreshToken:', error);
    res.status(401).json({ error: 'Refresh token invalide ou expiré', details: error.message });
  }
};