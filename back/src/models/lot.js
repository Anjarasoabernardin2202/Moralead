const db = require('../config/db');

const Lot = {
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM lots');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM lots WHERE id = ?', [id]);
    return rows[0];
  },
  create: async (lot) => {
    const [result] = await db.query(
      'INSERT INTO lots (nom, code, zone_geographique, couleur, statut, capacite_max) VALUES (?, ?, ?, ?, ?, ?)',
      [lot.nom, lot.code, lot.zone_geographique, lot.couleur, lot.statut, lot.capacite_max]
    );
    return { id: result.insertId, ...lot };
  },
  update: async (id, lot) => {
    await db.query(
      'UPDATE lots SET nom = ?, code = ?, zone_geographique = ?, couleur = ?, statut = ?, capacite_max = ? WHERE id = ?',
      [lot.nom, lot.code, lot.zone_geographique, lot.couleur, lot.statut, lot.capacite_max, id]
    );
    return { id, ...lot };
  },
  delete: async (id) => {
    await db.query('DELETE FROM lots WHERE id = ?', [id]);
  }
};

module.exports = Lot;