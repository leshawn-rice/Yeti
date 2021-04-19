"use strict";
// External Dependencies
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// Internal Dependencies
const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");
// Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
// app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

// app.get('/', (req, res, next) => {
//   async function getLocation() {
//     let loc1 = '46.7352,-117.1729';
//     let loc2 = '50,-109';
//     // about 476 miles away
//     const distance = GeoLocator.calculateDistance(loc1, loc2);
//     return res.send(`${distance} miles`);
//   }
//   getLocation();
// });

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
