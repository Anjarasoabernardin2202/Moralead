const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Configuration du pool avec options avancées
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,         // Ex: 'localhost' ou '185.31.40.47'
  user: process.env.MYSQL_USER,         // Ex: 'root'
  password: process.env.MYSQL_PASSWORD, // Ex: 'votre_mot_de_passe'
  database: process.env.MYSQL_DATABASE, // Ex: 'ma_base_de_donnees'
  waitForConnections: true,             // Attendre si plus de connexions que la limite
  connectionLimit: 10,                  // Nombre max de connexions dans le pool
  queueLimit: 0,                        // Pas de limite de requêtes en attente
  enableKeepAlive: true,                // ← Active le keep-alive pour éviter les timeouts
  keepAliveInitialDelay: 10000,         // ← Premier check après 10s
  connectTimeout: 20000,                // Timeout de connexion (20s)
  acquireTimeout: 20000,                // Timeout d'attente d'une connexion (20s)
});

// Promisify le pool pour utiliser async/await
const db = pool.promise();

// Test de connexion + reconnexion automatique en cas d'échec
const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ Connecté à MySQL avec succès');
    connection.release(); // Libère la connexion immédiatement
  } catch (err) {
    console.error('❌ Erreur de connexion MySQL:', err.message);
    // Reconnexion automatique après 5s
    setTimeout(testConnection, 5000);
  }
};

// Lance le test initial
testConnection();

// Exporte le pool pour les requêtes dans les routes
module.exports = db;