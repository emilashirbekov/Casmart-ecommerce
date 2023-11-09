const express = require('express');
const errorHandler = require('./middleware/errorHandle');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cors = require('cors');

connectDb();

const app = express();

const allowedOrigins = ['http://127.0.0.1:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/clothes', require('./routes/clothesRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
