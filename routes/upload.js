// routes/upload.js
const express = require('express');
const router = express.Router();
const { upload } = require('../config/multer');
const user = require('../models/User');
const Item = require('../models/item');
const isAuthenticated = require('./protected'); // Assuming this import is correct

// GET route to display the form with the image preview
router.get('/add', isAuthenticated, (req, res) => {
  const user = req.user; // Fetch the user variable
  res.render('add', { user });
});

// POST route for handling image upload and entry submission
router.post('/add', upload.single('profileImage'), async (req, res) => {
  try {
    // Construct the relative file path without /public
    const relativeFilePath = req.file.path.replace(/^public\//, '');

    // Save the data to your MongoDB database using the Item model
    const newItem = new Item({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      question: req.body.question,
      imagePath: relativeFilePath, // Ensure 'imagePath' is a field in your Item model
    });

    await newItem.save();
    // Redirect to a success page or wherever you want after the entry is saved
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;