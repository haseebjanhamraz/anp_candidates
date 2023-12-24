// routes/protected.js

const express = require('express');
const router = express.Router();
const Item = require('../models/item');
// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
};

// Protected route to edit an item
router.get('/edit/:id', isAuthenticated, async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).send('Item not found');
    }

    res.render('edit', { item, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Protected route to add an item
router.get('/add', isAuthenticated, (req, res) => {
  // Your logic for the 'add' route goes here
  // For example, you might want to render a form to add a new item
  res.render('add', { user: req.user, title: 'Add New Candidate' });
});

router.get('/delete/:id', isAuthenticated, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;