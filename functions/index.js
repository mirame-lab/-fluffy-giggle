const functions = require("firebase-functions");
const express = require("express");
const app = express();
const quotesRouter = require("./api/controllers/quotes_controller");
const db = require("./api/database");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

app.use(express.json());
app.use("/quotes", quotesRouter);
app.get("/", (req, res, next) =>
  res.json({ message: "Firebase function service is working" })
);

exports.api = functions.https.onRequest(app);
// To handle "Function Timeout" exception
exports.functionsTimeOut = functions.runWith({
    timeoutSeconds: 300,
  });
 
  exports.setupdb = functions.https.onRequest(require("./setup_db"));
