const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class QuotesModel {
  constructor() {
    if (this.instance) return this.instance;
    QuotesModel.instance = this;
  }

  get() {
    return database.getList("quotes");
  }

  getById(id) {
    return database.get("quotes", id);
  }

  create(quote) {
    return database.create("quotes", quote);
  }

  delete(id) {
    return database.delete("quotes", id);
  }

  update(id, quote) {
    return database.set("quotes", id, quote);
  }
}

module.exports = new QuotesModel();