const db = require('../config/db');

const Role = {
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM `Roles`');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM `Roles` WHERE id = ?', [id]);
    return rows[0];
  },

  findByName: async (name) => {
    const [rows] = await db.query('SELECT * FROM `Roles` WHERE name = ?', [name]);
    return rows[0];
  }
};

module.exports = Role;