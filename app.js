const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { upload } = require('./config/multer');
const uploadRoutes = require('./routes/upload');
const indexRoutes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/anp-candidates-database', { useNewUrlParser: true, useUnifiedTopology: true });

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/public', express.static('public', { 'Content-Type': 'text/css' }));
app.set('view engine', 'ejs');


// Use routes
app.use('/', uploadRoutes);
app.use('/', indexRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
