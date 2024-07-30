console.log("Starting server...");

const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
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
// const cors = require("cors");

const { client_id, redirect_uri, client_secret } = require("./config");

const config = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// app.use(cors({ origin: '*' }));

// debugger
app.post("/authenticate", async (req, res) => {
  try {
    const { code } = req.body;

    // const data = new FormData();
    // data.append("client_id", client_id);
    // data.append("client_secret", client_secret);
    // data.append("code", code);
    // data.append("redirect_uri", redirect_uri);
  
    const data = {
      "client_id" : client_id,
      "client_secret": client_secret,
      "code": code,
    }
    console.log(data)
    
    // Request to exchange code for an access token
    const access_token_res = await axios.post(`https://github.com/login/oauth/access_token`, data)
    console.log(access_token_res.data)

    let params = new URLSearchParams(access_token_res.data);
    const access_token = params.get("access_token");
    const user = await axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    console.log(user)

    return res.status(200).json(user.data);
  }
  catch (error) {
    console.log(error?.message)
    return res.status(400).json(error);
  }

  
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
