// routes/auth.js

const express = require("express");
const passport = require("passport");

const User = require("../models/User");

const router = express.Router();


const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports = {
  ensureAuthenticated,
};

// Registration route
router.get("/register", (req, res) => {
  res.render("register"); // Create a registration form (register.ejs)
});

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ username: email, email }); 
    await User.register(user, password);
    console.log('User registered successfully:', user);
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Login route
router.get("/login", (req, res) => {
  res.render("login"); // Create a login form (login.ejs)
});


router.post('/login', (req, res, next) => {
  console.log('Form data:', req.body);
  passport.authenticate('local', (err, user, info) => {
    console.log('Authentication result:', err, user, info);
    if (err) {
      console.error('Authentication error:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (!user) {
      console.log('Invalid username or password');
      req.flash('error', 'Invalid username or password.');
      return res.redirect('/auth/login');
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error('Login error:', loginErr);
        return res.status(500).send('Internal Server Error');
      }

      console.log('User logged in successfully:', user);
      req.flash('success', 'Successfully logged in.');
      return res.redirect('/');
    });
  })(req, res, next);
});



// Logout route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Successfully logged out."); // Set flash message for successful logout
  res.redirect("/");
});
module.exports = router;
