const { Server } = require('socket.io');

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true
    },
    transports: ['websocket', 'polling']
  });

  io.on('connection', (socket) => {
    console.log(`✅ Utilisateur connecté: ${socket.id}`);
    
    // Joindre automatiquement la room de gestion des utilisateurs
    socket.join('users_management');
    
    // Événement pour rejoindre explicitement la room
    socket.on('join_user_management', () => {
      socket.join('users_management');
      console.log(`📋 Socket ${socket.id} a rejoint users_management`);
      socket.emit('joined_user_management', { 
        message: 'Connexion temps réel établie',
        timestamp: new Date().toISOString()
      });
    });
    
    // Événement pour quitter la room
    socket.on('leave_user_management', () => {
      socket.leave('users_management');
      console.log(`👋 Socket ${socket.id} a quitté users_management`);
    });
    
    // Gestion de la déconnexion
    socket.on('disconnect', (reason) => {
      console.log(`❌ Utilisateur déconnecté: ${socket.id} - Raison: ${reason}`);
    });
    
    // Événements personnalisés pour debug/test
    socket.on('ping', (data) => {
      socket.emit('pong', { 
        ...data, 
        timestamp: new Date().toISOString(),
        socketId: socket.id 
      });
    });
  });

  // Logs de démarrage
  console.log('🔌 Socket.io initialisé avec succès');
  
  return io;
};

// Fonctions pour émettre des événements spécifiques aux utilisateurs
const emitUserCreated = (user) => {
  if (io) {
    console.log(`📤 Émission user_created pour utilisateur: ${user.fullName || user.id}`);
    io.to('users_management').emit('user_created', {
      ...user,
      timestamp: new Date().toISOString()
    });
  } else {
    console.warn('⚠️ Socket.io non initialisé - impossible d\'émettre user_created');
  }
};

const emitUserUpdated = (user) => {
  if (io) {
    console.log(`📤 Émission user_updated pour utilisateur: ${user.fullName || user.id}`);
    io.to('users_management').emit('user_updated', {
      ...user,
      timestamp: new Date().toISOString()
    });
  } else {
    console.warn('⚠️ Socket.io non initialisé - impossible d\'émettre user_updated');
  }
};

const emitUserDeleted = (userId, userName = '') => {
  if (io) {
    console.log(`📤 Émission user_deleted pour utilisateur: ${userName || userId}`);
    io.to('users_management').emit('user_deleted', { 
      id: userId,
      name: userName,
      timestamp: new Date().toISOString()
    });
  } else {
    console.warn('⚠️ Socket.io non initialisé - impossible d\'émettre user_deleted');
  }
};

const emitUsersRefresh = () => {
  if (io) {
    console.log('📤 Émission users_refresh - rafraîchissement global demandé');
    io.to('users_management').emit('users_refresh', {
      timestamp: new Date().toISOString()
    });
  } else {
    console.warn('⚠️ Socket.io non initialisé - impossible d\'émettre users_refresh');
  }
};

// Fonction pour obtenir des statistiques
const getSocketStats = () => {
  if (io) {
    return {
      connected: io.engine.clientsCount,
      rooms: Array.from(io.sockets.adapter.rooms.keys()),
      timestamp: new Date().toISOString()
    };
  }
  return { connected: 0, rooms: [], timestamp: new Date().toISOString() };
};

module.exports = {
  initializeSocket,
  emitUserCreated,
  emitUserUpdated,
  emitUserDeleted,
  emitUsersRefresh,
  getSocketStats,
  getIO: () => io
};