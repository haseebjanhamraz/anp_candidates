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
  const user = req.user;
  res.render("login", { user, title: "Login" } ); // Create a login form (login.ejs)
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
      req.flash('error', 'Invalid username or password.');
      return res.redirect('/auth/login');
    }
    if (user.status !== 'active') {
      req.flash('error', 'User is not active');
      return res.redirect('/auth/login');
      // return res.status(401).json({ message: 'User is inactive' });
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
router.post("/logout", (req, res) => {
  // Use req.logout with a callback function
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Internal Server Error');
    }
    req.flash("success", "Successfully logged out.");
    res.redirect("/");
    console.log("Logged out")
  });
});



module.exports = router;
