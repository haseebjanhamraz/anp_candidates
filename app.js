require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User'); // Update the path accordingly
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { upload } = require('./config/multer');



const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const protectedRoutes = require('./routes/protected');
const uploadRoutes = require('./routes/upload')

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://haseebjanhamraz:nnLWE92stjSDU9VI@anpcluster.behcnv3.mongodb.net/anp-candidates-database?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// mongodb+srv://haseebjanhamraz:nnLWE92stjSDU9VI@anpcluster.behcnv3.mongodb.net/anp-candidates-database?retryWrites=true&w=majority
// Express middleware
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/public', express.static('public'));
app.use('/uploads', express.static('public/uploads'));
app.set('view engine', 'ejs');

// Passport setup
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// Include your authentication routes
app.use('/auth', authRoutes); // Adjust the route prefix if needed

// Ensure that the user is authenticated before allowing access to certain routes
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
}


app.use('/protected', protectedRoutes);  // Use '/protected' as the base path for protected routes
app.use(uploadRoutes);        // Use '/upload' as the base path for upload routes
app.use('/', indexRoutes);                // Use '/' as the base path for non-protected routes


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});