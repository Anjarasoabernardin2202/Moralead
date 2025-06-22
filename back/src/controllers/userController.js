const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
  try {
    const { search, role, status, lot, page = 1 } = req.query;
    let query = `
      SELECT u.*, r.name as role_name, r.name as role_display_name, l.nom as lot_name, l.zone_geographique as lot_description
      FROM Users u
      LEFT JOIN Roles r ON u.roleId = r.id
      LEFT JOIN lots l ON u.lots = l.id
      WHERE 1=1
    `;
    const values = [];

    if (search) {
      query += ` AND (u.fullName LIKE ? OR u.email LIKE ?)`;
      values.push(`%${search}%`, `%${search}%`);
    }
    if (role) {
      query += ` AND u.roleId = ?`;
      values.push(role);
    }
    if (status) {
      query += ` AND u.status = ?`;
      values.push(status);
    }
    if (lot) {
      if (lot === 'null') {
        query += ` AND u.lots IS NULL`;
      } else {
        query += ` AND u.lots = ?`;
        values.push(lot);
      }
    }

    const limit = 10;
    const offset = (page - 1) * limit;
    query += ` LIMIT ? OFFSET ?`;
    values.push(limit, offset);

    const [users] = await require('../config/db').query(query, values);
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur getAllUsers:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs', details: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur getUserById:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur', details: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, phone, password, roleId, lots, status, avatar } = req.body;
    if (!fullName || !email || !phone || !password || !roleId) {
      return res.status(400).json({ error: 'Tous les champs requis doivent être fournis' });
    }
    // Validation de l'avatar (base64)
    if (avatar && !avatar.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Format d\'image invalide (base64 attendu)' });
    }
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }
    const user = await User.create({ fullName, email, phone, password, roleId, lots, status, avatar });
    res.status(201).json(user);
  } catch (error) {
    console.error('Erreur createUser:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur', details: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { fullName, email, phone, password, roleId, lots, status, avatar } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    // Validation de l'avatar (base64)
    if (avatar && !avatar.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Format d\'image invalide (base64 attendu)' });
    }
    if (email && email !== user.email) {
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
      }
    }
    const updatedUser = await User.update(req.params.id, {
      fullName,
      email,
      phone,
      password,
      roleId,
      lots,
      status,
      avatar
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Erreur updateUser:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur', details: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    if (user.role_name === 'Administrateur') {
      return res.status(403).json({ error: 'Impossible de supprimer un administrateur' });
    }
    await User.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Erreur deleteUser:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur', details: error.message });
  }
};