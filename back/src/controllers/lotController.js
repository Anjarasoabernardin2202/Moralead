const Lot = require('../models/lot');

exports.getAllLots = async (req, res) => {
  try {
    const lots = await Lot.findAll();
    res.status(200).json(lots);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des lots', details: error.message });
  }
};

exports.getLotById = async (req, res) => {
  try {
    const lot = await Lot.findById(req.params.id);
    if (!lot) {
      return res.status(404).json({ error: 'Lot non trouvé' });
    }
    res.status(200).json(lot);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du lot', details: error.message });
  }
};

exports.createLot = async (req, res) => {
  try {
    const { nom, code, zone_geographique, couleur, statut, capacite_max } = req.body;
    if (!nom || !code || !zone_geographique || !couleur || !statut || !capacite_max) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
    const lot = await Lot.create({ nom, code, zone_geographique, couleur, statut, capacite_max });
    res.status(201).json(lot);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du lot', details: error.message });
  }
};

exports.updateLot = async (req, res) => {
  try {
    const { nom, code, zone_geographique, couleur, statut, capacite_max } = req.body;
    const lot = await Lot.findById(req.params.id);
    if (!lot) {
      return res.status(404).json({ error: 'Lot non trouvé' });
    }
    const updatedLot = await Lot.update(req.params.id, { nom, code, zone_geographique, couleur, statut, capacite_max });
    res.status(200).json(updatedLot);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du lot', details: error.message });
  }
};

exports.deleteLot = async (req, res) => {
  try {
    const lot = await Lot.findById(req.params.id);
    if (!lot) {
      return res.status(404).json({ error: 'Lot non trouvé' });
    }
    await Lot.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du lot', details: error.message });
  }
};