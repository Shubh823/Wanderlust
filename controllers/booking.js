const Booking = require('../models/booking.js');
const Listing = require('../models/listing.js');

// Show booking form for a listing
module.exports.renderBookingForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash('error', 'Listing not found');
    return res.redirect('/listings');
  }
  res.render('bookings/new.ejs', { listing });
};

// Create a booking
module.exports.createBooking = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash('error', 'Listing not found');
    return res.redirect('/listings');
  }
  // Prevent double booking (simple check)
  const overlapping = await Booking.findOne({
    listing: id,
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
    ],
    status: { $ne: 'cancelled' }
  });
  if (overlapping) {
    req.flash('error', 'This property is already booked for the selected dates.');
    return res.redirect(`/listings/${id}`);
  }
  const booking = new Booking({
    listing: id,
    user: req.user._id,
    startDate,
    endDate,
    status: 'pending'
  });
  await booking.save();
  req.flash('success', 'Booking request submitted!');
  res.redirect('/bookings/my');
};

// View bookings made by the logged-in user
module.exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('listing');
  res.render('bookings/my.ejs', { bookings });
};

// View bookings for listings owned by the logged-in user
module.exports.ownerBookings = async (req, res) => {
  const listings = await Listing.find({ owner: req.user._id });
  const bookings = await Booking.find({ listing: { $in: listings.map(l => l._id) } }).populate('listing user');
  res.render('bookings/owner.ejs', { bookings });
};

// Cancel a booking
module.exports.cancelBooking = async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    req.flash('error', 'Booking not found');
    return res.redirect('/bookings/my');
  }
  // Only the user who made the booking or the owner can cancel
  if (!booking.user.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to cancel this booking.');
    return res.redirect('/bookings/my');
  }
  booking.status = 'cancelled';
  await booking.save();
  req.flash('success', 'Booking cancelled.');
  res.redirect('/bookings/my');
};

// Owner confirms a booking
module.exports.confirmBooking = async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findById(bookingId).populate('listing');
  if (!booking) {
    req.flash('error', 'Booking not found');
    return res.redirect('/bookings/owner');
  }
  // Only the owner can confirm
  if (!booking.listing.owner.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to confirm this booking.');
    return res.redirect('/bookings/owner');
  }
  booking.status = 'confirmed';
  await booking.save();
  req.flash('success', 'Booking confirmed.');
  res.redirect('/bookings/owner');
};

// Owner cancels a booking
module.exports.ownerCancelBooking = async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findById(bookingId).populate('listing');
  if (!booking) {
    req.flash('error', 'Booking not found');
    return res.redirect('/bookings/owner');
  }
  // Only the owner can cancel
  if (!booking.listing.owner.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to cancel this booking.');
    return res.redirect('/bookings/owner');
  }
  booking.status = 'cancelled';
  await booking.save();
  req.flash('success', 'Booking cancelled.');
  res.redirect('/bookings/owner');
}; 