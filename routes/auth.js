const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start Google login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
 
// Handle Google callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirect to dashboard or home page after successful authentication

    res.redirect('/listings');
  }
);

module.exports = router;
