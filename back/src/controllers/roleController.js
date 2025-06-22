const db = require('../config/db');

exports.getAllRoles = async (req, res) => {
  try {
    const [roles] = await db.query('SELECT * FROM Roles');
    const transformedRoles = roles.map(role => ({
      id: role.id,
      name: role.name,
      display_name: role.name // Utiliser name comme display_name
    }));
    res.status(200).json(transformedRoles);
  } catch (error) {
    console.error('Erreur getAllRoles:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des rôles', details: error.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const [roles] = await db.query('SELECT * FROM Roles WHERE id = ?', [req.params.id]);
    if (!roles.length) {
      return res.status(404).json({ error: 'Rôle non trouvé' });
    }
    const role = roles[0];
    res.status(200).json({
      id: role.id,
      name: role.name,
      display_name: role.name
    });
  } catch (error) {
    console.error('Erreur getRoleById:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du rôle', details: error.message });
  }
};