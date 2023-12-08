// routes/protected.js

const express = require('express');
const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
};

// Protected route
router.get('/add', isAuthenticated, (req, res) => {
  res.render('add', { user: req.user });
});

module.exports = router;