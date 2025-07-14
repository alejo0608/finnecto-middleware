const express = require('express');
const router = express.Router();
const invoiceService = require('../services/invoiceService');
const { appendResultToFile } = require('../utils/fileWriter');

router.post('/', (req, res) => {
  try {
    const transformed = invoiceService.transformInvoice(req.body);
    appendResultToFile(transformed);
    res.status(200).json(transformed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
