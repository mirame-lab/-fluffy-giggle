const quotesModel = require("../models/quotes_model");
const express = require("express");
const router = express.Router();

// Get all quotes
router.get("/", async (req, res, next) => {
  try {
    const result = await quotesModel.get();
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

// Get one quote
router.get("/:id", async (req, res, next) => {
  try {
    const result = await quotesModel.getById(req.params.id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

// Create a new quote
router.post("/", async (req, res, next) => {
  try {
    const result = await quotesModel.create(req.body);
    if (!result) return res.sendStatus(409);
    return res.status(201).json(result);
  } catch (e) {
    return next(e);
  }
});

// Delete a quote
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await quotesModel.delete(req.params.id);
    if (!result) return res.sendStatus(404);
    return res.sendStatus(200);
  } catch (e) {
    return next(e);
  }
});

// Update a quote
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const doc = await quotesModel.getById(id);
    if (!doc) return res.sendStatus(404);

    // Merge existing fields with the ones to be updated
    Object.keys(data).forEach((key) => (doc[key] = data[key]));

    const updateResult = await quotesModel.update(id, doc);
    if (!updateResult) return res.sendStatus(404);

    return res.json(doc);
  } catch (e) {
    return next(e);
  }
});

// Replace a quote
router.put("/:id", async (req, res, next) => {
  try {
    const updateResult = await quotesModel.update(req.params.id, req.body);
    if (!updateResult) return res.sendStatus(404);

    const result = await quotesModel.getById(req.params.id);
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;