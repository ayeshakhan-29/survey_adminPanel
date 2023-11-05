// server.js
const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./src/survey-app-ac363-firebase-adminsdk-nrgqi-85d22f2d01.json');

const app = express();

// Initialize Firebase Admin with your service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://survey-app-ac363.firebaseio.com' // Updated with your Firebase Realtime Database URL
});

app.use(express.json());

app.get('/api/users', async (req, res) => {
  try {
    const auth = admin.auth();
    const listUsersResult = await auth.listUsers();
    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }));
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

