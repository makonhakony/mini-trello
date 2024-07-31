console.log("Starting server...");

const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const firebaseAdmin = require("firebase-admin");
const jwt = require('jsonwebtoken');

const boardsRoute = require("./boards");

async function fetchData() {
  try {
    const fetch = await import("node-fetch");
    // Rest of your code here
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the async function
fetchData();

const { client_id, client_secret } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/boards", boardsRoute);

function generateJWT(user, gh_token) {
  const payload = {
    id: user.id,
    username: user.login,
  };

  const token = jwt.sign(payload, 'an_jwt_secret', { expiresIn: '1h' });
  return token;
}


// Initialize Firebase Admin SDK
const serviceAccount = require('../mini-trello-a8990-firebase-adminsdk-1fxr9-392888d74a.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://mini-trello-a8990-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

// app.get('/boards', async (req, res) => {
//   console.log('get boards')
//   const boardsSnapshot = await firebaseAdmin.firestore().collection('boards').get();
//   const boards = boardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   res.status(200).json(boards);
// });


app.post("/authenticate", async (req, res) => {
  try {
    const { code } = req.body;
  
    const data = {
      client_id,
      client_secret,
      code,
    };
    
    // Request to exchange code for an access token
    const access_token_res = await axios.post(`https://github.com/login/oauth/access_token`, data);

    let params = new URLSearchParams(access_token_res.data);
    const access_token = params.get("access_token");
    const user = await axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    // Save user profile to Firebase
    const userRef = firebaseAdmin.firestore().collection('users').doc(user.data.id.toString());
    await userRef.set({
      username: user.data.login,
      displayName: user.data.name,
      profileUrl: user.data.html_url
    });

    // const jwtToken = generateJWT(user.data);

    return res.status(200).json(user.data);
  } catch (error) {
    console.log(error?.message);
    return res.status(400).json(error);
  }
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
