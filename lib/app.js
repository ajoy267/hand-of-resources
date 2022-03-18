const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/bikes', require('./controllers/bikes'));
app.use('/api/v1/cars', require('./controllers/cars'));
app.use('/api/v1/snow', require('./controllers/snow'));
app.use('/api/v1/games', require('./controllers/games'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
