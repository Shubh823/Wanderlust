# Wanderlust - A Property Listing Web Application

Wanderlust is a full-featured property listing and booking web application inspired by platforms like Airbnb. Users can explore, list, and book unique accommodations such as villas, domes, castles, and more. The platform supports user authentication, property management, reviews, and a robust booking system.

## Features

- **Explore Listings:** Browse all available properties with detailed information, images, and categories.
- **Advanced Search:** Search for properties by title, location, description, country, or price.
- **Category Filters:** Instantly filter listings by categories like Mountain, Domes, Castles, Arctic, Camping, Boats, and Farms.
- **User Authentication:** Secure signup, login, and session management using Passport.js.
- **Profile Management:** View your profile, including stats on your bookings and listings.
- **List Your Property:** Authenticated users can create, edit, and delete their own property listings with image uploads.
- **My Listings:** View and manage only the listings you have created.
- **Booking System:** Book available properties for specific dates, with prevention of double-booking.
- **Booking Management:** View your bookings, cancel them, and as an owner, confirm or cancel bookings for your properties.
- **Review System:** Leave reviews on properties and manage your own reviews.
- **Responsive Design:** Fully responsive UI for seamless experience on all devices.
- **Cloud Image Storage:** Property images are securely stored and served via Cloudinary.
- **Interactive Map:** (Planned/Optional) Integration with Leaflet.js for property location visualization.

## Tech Stack

- **Frontend:** EJS, HTML, CSS, JavaScript, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** Passport.js (Local Strategy)
- **File Uploads:** Multer, Cloudinary, multer-storage-cloudinary
- **Session Management:** express-session, connect-mongo
- **Flash Messages:** connect-flash
- **Map Integration:** Leaflet.js (for property locations)
- **Other:** dotenv, ejs-mate, method-override


## How It Works

1. **Sign Up / Log In:** Create an account or log in to access all features.
2. **Explore & Search:** Browse or search for properties.
3. **List a Property:** Add your own property with images and details.
4. **Book a Stay:** Select dates and book available properties.
5. **Manage Bookings:** View, confirm, or cancel bookings as a guest or owner.
6. **Leave Reviews:** Share your experience by reviewing properties.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shubh823/Wanderlust.git
   cd FindYourStay
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file with your MongoDB URI, Cloudinary credentials, and session secret.

4. **Run the app:**
   ```bash
   node app.js
   ```
   The app will be available at `http://localhost:8080`.

## Deployment

- The app is ready for deployment on platforms like Render, Heroku, or any Node.js-compatible service.
- Cloudinary is used for image storage, so no local image storage is required.

## Demo

- **Live Website:** [https://wanderlust-4i18.onrender.com](https://wanderlust-4i18.onrender.com)


## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
