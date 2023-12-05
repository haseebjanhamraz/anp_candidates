const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Index route
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.render('index', { items });
});

// Add route
router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/add', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.redirect('/');
});

// Edit route
router.get('/edit/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render('edit', { item });
});

router.post('/edit/:id', async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

// Delete route
router.get('/delete/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
