const mongoose = require("mongoose");

// Fonction pour connecter à MongoDB
const connectDB = async () => {
  console.log("Tentative de connexion à MongoDB...");
  console.log("URI de connexion :", process.env.MONGO_URI);

  // Ajout des événements Mongoose pour le diagnostic
  mongoose.connection.on("connected", () => {
    console.log("Mongoose est connecté à MongoDB.");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Erreur de connexion MongoDB via Mongoose :", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose est déconnecté de MongoDB.");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("Mongoose s'est reconnecté à MongoDB.");
  });

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connexion réussie à MongoDB : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erreur lors de la connexion MongoDB : ${error.message}`);
    process.exit(1); // Quitte le processus si la connexion échoue
  }
};

// Gestionnaire de déconnexion pour fermer proprement la connexion
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connexion MongoDB fermée en raison d'une interruption (SIGINT).");
  process.exit(0);
});

module.exports = connectDB;
