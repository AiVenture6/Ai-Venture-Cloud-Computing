const express = require('express');
const userController = require('./user/user.controller');
const imagesController = require('./images/images.controller');
const placesController = require('./places/place.controller');
const ratingController = require('./rating/rating.controller');
const scansController = require('./scans/scan.controller');
const restaurantsController = require('./restaurants/restaurant.controller');
const hotelsController = require('./hotels/hotel.controller');
const bookmarksController = require('./bookmarks/bookmark.controller');
const ticketsController = require('./tickets/ticket.controller');
const notificationController = require('./notification/notification.controller');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', userController);
app.use('/images', imagesController);
app.use('/places', placesController);
app.use('/ratings', ratingController);
app.use('/scans', scansController);
app.use('/restaurants', restaurantsController);
app.use('/hotels', hotelsController);
app.use('/bookmarks', bookmarksController);
app.use('/tickets', ticketsController);
app.use('/notifications', notificationController);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Ai-venture API' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
