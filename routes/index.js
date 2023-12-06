const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const { upload } = require('../config/multer'); // Import the upload middleware
// Index route
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.render('index', { items });
});

// Add route
router.get('/add', (req, res) => {
  res.render('add');
});

// router.post('/add', async (req, res) => {
//   const newItem = new Item(req.body);
//   await newItem.save();
//   res.redirect('/');
// });

// Handle form submission
router.post('/add', upload.single('profileImage'), async (req, res) => {
  try {
    // Extract data from the form submission
    const { name, username, email, subject, message } = req.body;

    // Get the uploaded image file
    const profileImage = req.file;

    // Create a new item instance
    const newItem = new Item({  
      name,
      username,
      email,
      subject,
      message,
      question,
      profileImage: profileImage.filename, // Save the filename to the database
    });

    // Save the item to the database
    await newItem.save();

    // Redirect to the home page or wherever you want
    res.redirect('/');
  } catch (error) {
    // Handle errors (e.g., validation errors)
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Edit route
router.get('/edit/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).send('Item not found');
    }

    res.render('edit', { item });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/edit/:id', upload.single('profileImage'), async (req, res) => {
  try {
    const itemId = req.params.id;

    // Find the existing item
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).send('Item not found');
    }

    // Update fields from the form
    item.name = req.body.name;
    item.username = req.body.username;
    item.email = req.body.email;
    item.subject = req.body.subject;
    item.message = req.body.message;
    item.question = req.body.question;

    // If a new image is provided, update the imagePath
    if (req.file) {
      // Set both profileImage and imagePath to the new file name
      // Log the existing and new file names
  console.log('Old imagePath:', item.imagePath);
  console.log('New imagePath:', req.file.filename);

      item.profileImage = req.file.filename;
      // item.imagePath = req.file.filename;
      item.imagePath = 'uploads/' + req.file.filename; // Ensure the correct path
    }

    // Save the updated item
    await item.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});






// Delete route
router.get('/delete/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
