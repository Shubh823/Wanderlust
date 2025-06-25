const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.js');
const { isLoggedIn } = require('../middleware.js');

// Show booking form
router.get('/listings/:id/book', isLoggedIn, bookingController.renderBookingForm);
// Create booking
router.post('/listings/:id/book', isLoggedIn, bookingController.createBooking);
// User's bookings
router.get('/my', isLoggedIn, bookingController.myBookings);
// Owner's bookings
router.get('/owner', isLoggedIn, bookingController.ownerBookings);
// Cancel booking
router.post('/:bookingId/cancel', isLoggedIn, bookingController.cancelBooking);
// Owner confirms a booking
router.post('/:bookingId/confirm', isLoggedIn, bookingController.confirmBooking);
// Owner cancels a booking
router.post('/:bookingId/owner-cancel', isLoggedIn, bookingController.ownerCancelBooking);

module.exports = router; 