// const express = require('express');
// const { StreamChat } = require('stream-chat');
// const app = express();
// const port = 3002;

// // Remplacez par votre propre clé API et clé secrète
// const apiKey = 'aky7bwd7rn84';  // Remplacez par votre clé API
// const apiSecret = 'chhjp5rkeredqrkubazunn94fzc89hwfuza8ga6asjtsqhkfyx8hkue67y4wx5td';  // Remplacez par votre clé secrète

// // Initialisez le client StreamChat
// const client = new StreamChat(apiKey, apiSecret);

// app.use(express.json());

// // Route par défaut
// app.get('/', (req, res) => {
//   res.send('Bienvenue sur le serveur Stream Chat!');
// });

// // Endpoint pour générer un token
// app.post('/generate-token', (req, res) => {
//   const { userId } = req.body; // L'ID utilisateur pour lequel le token est généré

//   if (!userId) {
//     return res.status(400).json({ error: 'User ID is required' });
//   }

//   try {
//     // Créez un token pour l'utilisateur
//     const token = client.createToken(userId);
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
// });
// backend/server.js
const express = require('express');
const { StreamChat } = require('stream-chat');

const app = express();
const PORT = 5000;

// Remplacez par vos clés API Stream Chat
const apiKey = 'aky7bwd7rn84';
const apiSecret = 'chhjp5rkeredqrkubazunn94fzc89hwfuza8ga6asjtsqhkfyx8hkue67y4wx5td';

const serverClient = StreamChat.getInstance(apiKey, apiSecret);

app.use(express.json());

// Endpoint pour générer un jeton utilisateur
app.post('/token', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId est requis' });
  }

  const token = serverClient.createToken(userId);
  return res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log(`Serveur backend en cours d'exécution sur http://localhost:${PORT}`);
});

