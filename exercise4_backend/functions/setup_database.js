const db = require("../functions/api/database");

async function setupDatabase(req, res, next) {
  // To delete all the collections
  const collections = ["users", "quotes"];
  collections.forEach(async (collection) => await deleteCollection(collection));

  // Add documents to the todos collection
  addDocuments("quotes", [
    { data: "Prepare proposal for the new project", like: 10, dislike: 0},
    { data: "Replace light bulb", like: 10, dislike: 0},
    { data: "Buy Flutter eBook", like: 10, dislike: 0 },
    { data: "Subscribe to Fibre optic internet service", like: 10, dislike: 0 },
    { data: "Setup online meeting room", like: 10, dislike: 0},
  ]);

  res.send("Setting Up Database.... Done ");
}

async function deleteCollection(collection) {
  const cref = db.firestore.collection(collection);
  const docs = await cref.listDocuments();
  docs.forEach((doc) => doc.delete());
}

function addDocuments(collection, docs) {
  docs.forEach((doc) => db.create(collection, doc));
}

module.exports = setupDatabase;