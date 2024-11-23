const express = require('express');
// const dotenv = require('dotenv');
const authRoutes = require('./user/routes/authRoutes');
const imagesController = require('./images/images.controller');
const placesController = require('./places/places.controller');
const ratingController = require('./rating/rating.controller');


// dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use("/images", imagesController);
app.use("/places", placesController);
app.use("/ratings", ratingController);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Ai-venture API' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
