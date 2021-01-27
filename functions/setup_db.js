const db = require("./api/database");

async function setupDatabase(req, res, next) {
  // To delete all the collections
  const collections = ["users", "quotes"];
  collections.forEach(async (collection) => await deleteCollection(collection));

  // Add documents to the quotes collection
  addDocuments("quotes", [
    { data: "The purpose of our lives is to be happy.", like: 10, dislike: 0},
    { data: "Life is what happens when you’re busy making other plans.", like: 10, dislike: 0},
    { data: "Get busy living or get busy dying.", like: 10, dislike: 0 },
    { data: "You only live once, but if you do it right, once is enough.", like: 10, dislike: 0 },
    { data: "Many of life’s failures are people who did not realize how close they were to success when they gave up.", like: 10, dislike: 0},
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