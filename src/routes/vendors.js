const express = require('express');
const router = express.Router();
const vendorService = require('../services/vendorService');
const { appendResultToFile } = require('../utils/fileWriter');

router.post('/', (req, res) => {
  try {
    const transformed = vendorService.transformVendor(req.body);
    appendResultToFile(transformed);
    res.status(200).json(transformed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

