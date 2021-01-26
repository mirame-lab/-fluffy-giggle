const functions = require('firebase-functions');
const express = require("express");
const app = express();
const db = require("./api/database");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.hello = functions.https.onRequest((req, res) => {
    res.json({ message: "Hello World from Firebase function" });
  });
  
  exports.hi = functions.https.onRequest((req, res) => {
    res.json({ message: "Hi there. Greeting from Firebase" });
  });
exports.setupdb = functions.https.onRequest(require("./setup_database"));
app.get("/", (req, res, next) =>
  res.json({ message: "Firebase function service is working" })
);
 
app.get("/newuser/:name", async (req, res, next) => {
    const name = req.params.name;
    const user = { name: name };
    const result = await db.create("users", user);
    user.id = result.id;
    return res.json(user);
  });
  
app.get("/deleteuser/:id", async (req, res, next) => {
    const userId = req.params.id;
    const result = await db.delete("users", userId);
    console.log(result);
    return res.json(userId);
  });
  
// To handle "Function Timeout" exception
exports.functionsTimeOut = functions.runWith({
    timeoutSeconds: 300,
  });

exports.api = functions.https.onRequest(app);