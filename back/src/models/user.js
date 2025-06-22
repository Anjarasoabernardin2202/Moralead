const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  findAll: async () => {
    const [rows] = await db.query(`
      SELECT u.*, r.name as role_name, r.name as role_display_name, l.nom as lot_name, l.zone_geographique as lot_description
      FROM Users u
      LEFT JOIN Roles r ON u.roleId = r.id
      LEFT JOIN lots l ON u.lots = l.id
    `);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query(`
      SELECT u.*, r.name as role_name, r.name as role_display_name, l.nom as lot_name, l.zone_geographique as lot_description
      FROM Users u
      LEFT JOIN Roles r ON u.roleId = r.id
      LEFT JOIN lots l ON u.lots = l.id
      WHERE u.id = ?
    `, [id]);
    return rows[0];
  },

  findByEmail: async (email) => {
    const [rows] = await db.query(`
      SELECT u.*, r.name as role_name, r.name as role_display_name, l.nom as lot_name, l.zone_geographique as lot_description
      FROM Users u
      LEFT JOIN Roles r ON u.roleId = r.id
      LEFT JOIN lots l ON u.lots = l.id
      WHERE u.email = ?
    `, [email]);
    return rows[0];
  },

  create: async (user) => {
    const { fullName, email, phone, password, roleId, lots, status, avatar } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      `INSERT INTO Users (fullName, email, phone, password, roleId, lots, status, avatar)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [fullName, email, phone, hashedPassword, roleId, lots || null, status || 'active', avatar || null]
    );
    return { id: result.insertId, fullName, email, phone, roleId, lots, status, avatar };
  },

  update: async (id, user) => {
    const { fullName, email, phone, roleId, lots, status, avatar, password } = user;
    let query = `
      UPDATE Users
      SET fullName = ?, email = ?, phone = ?, roleId = ?, lots = ?, status = ?, avatar = ?
    `;
    const values = [fullName, email, phone, roleId, lots || null, status, avatar || null];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += `, password = ?`;
      values.push(hashedPassword);
    }

    query += ` WHERE id = ?`;
    values.push(id);

    await db.query(query, values);
    return { id, fullName, email, phone, roleId, lots, status, avatar };
  },

  delete: async (id) => {
    await db.query('DELETE FROM Users WHERE id = ?', [id]);
  },

  updateLastLogin: async (id) => {
    await db.query('UPDATE Users SET last_login = NOW() WHERE id = ?', [id]);
  }
};

module.exports = User;