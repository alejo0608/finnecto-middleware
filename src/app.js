const express = require('express');
const vendorRoutes = require('./routes/vendors');
const invoiceRoutes = require('./routes/invoices');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/vendors', vendorRoutes);
app.use('/invoices', invoiceRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Middleware service running on port ${PORT}`);
});
