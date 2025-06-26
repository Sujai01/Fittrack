const express = require("express");
const fs = require("fs");
const router = express.Router();

// Path to logs JSON file
const LOG_PATH = "./data/logs.json";

// GET /api/logs - return logs as JSON
router.get("/logs", (req, res) => {
  const logs = JSON.parse(fs.readFileSync(LOG_PATH, "utf8"));
  res.json(logs);
});

// POST /api/logs - add a log
router.post("/logs", (req, res) => {
  const logs = JSON.parse(fs.readFileSync(LOG_PATH, "utf8"));

  const newLog = {
    type: req.body.type,
    date: req.body.date,
    details: req.body.details
  };

  logs.push(newLog);
  fs.writeFileSync(LOG_PATH, JSON.stringify(logs, null, 2));
  res.status(201).json({ success: true, log: newLog });
});

// DELETE /api/logs/:index - remove log by index
router.delete("/logs/:index", (req, res) => {
  const logs = JSON.parse(fs.readFileSync(LOG_PATH, "utf8"));
  const index = parseInt(req.params.index);

  if (index >= 0 && index < logs.length) {
    logs.splice(index, 1);
    fs.writeFileSync(LOG_PATH, JSON.stringify(logs, null, 2));
    res.json({ success: true });
  } else {
    res.status(400).json({ error: "Invalid index" });
  }
});

module.exports = router;
