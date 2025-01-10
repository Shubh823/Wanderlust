// const express = require('express');
// const passport = require('passport');
// const router = express.Router();

// // Start Google login
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

 
// // Handle Google callback
// router.get(
//     '/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
//         console.log("a user curr",req.user)
//       res.locals.currUser = req.user; // Set currUser after successful authentication
//       res.redirect('/listings');
//     },
//     (err, req, res, next) => { // Handle error
//       console.log(err);  // You can log the error for debugging
//       res.redirect('/login');  // Redirect to login on failure
//     }
//   );



  
// module.exports = router;
