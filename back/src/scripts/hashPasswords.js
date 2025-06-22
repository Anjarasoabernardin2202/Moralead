const db = require('../src/config/db');
const bcrypt = require('bcrypt');

async function hashPasswords() {
  try {
    const [users] = await db.query('SELECT id, password FROM users WHERE password = ?', ['TEMP_PASSWORD']);
    for (const user of users) {
      const hashedPassword = await bcrypt.hash('defaultPassword123', 10);
      await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id]);
      console.log(`Mot de passe mis à jour pour l'utilisateur ID ${user.id}`);
    }
    console.log('Tous les mots de passe ont été hachés');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors du hachage des mots de passe:', error);
    process.exit(1);
  }
}

hashPasswords();