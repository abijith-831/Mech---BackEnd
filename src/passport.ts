// const express = require('express');
// const passport = require('passport');
// const session = require('express-session');
// const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

// const app = express();

// // Set up session middleware
// app.use(
//   session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// // Configure Passport.js
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: 'YOUR_GOOGLE_CLIENT_ID',
//       clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
//       callbackURL: 'http://localhost:8080/auth/google/callback',
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // Save user profile to session or database
//       done(null, profile);
//     }
//   )
// );

// // Serialize user
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// // Deserialize user
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // Routes
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/login',
//     successRedirect: '/dashboard',
//   })
// );

// app.get('/dashboard', (req, res) => {
//   res.send(`Hello, ${req.user.displayName}`);
// });

// app.listen(8080, () => {
//   console.log('Server running on http://localhost:8080');
// });
