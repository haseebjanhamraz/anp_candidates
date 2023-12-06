// routes/upload.js
const express = require('express');
const router = express.Router();
const { upload } = require('../config/multer');
const Item = require('../models/item');

// GET route to display the form with the image preview
router.get('/add', (req, res) => {
  res.render('add', { imagePath: null });
});

// POST route for handling image upload and entry submission
router.post('/add', upload.single('profileImage'), async (req, res) => {
  try {
    // Construct the relative file path without /public
    const relativeFilePath = req.file.path.replace(/^public\//, '');

    // Save the relative file path to your MongoDB database using the Item model
    const newItem = new Item({
      name: req.body.name,
      description: req.body.description,
      imagePath: relativeFilePath,
    });

    await newItem.save();

    // Redirect to a success page or wherever you want after the entry is saved
    res.redirect('/success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
