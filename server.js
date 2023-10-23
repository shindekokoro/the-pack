const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  console.log(`Connection to ${process.env.MONGODB_URI} successful.`);
  app.listen(process.env.PORT, () => {
    console.log(`API server for the-pack running on port ${process.env.PORT}!`);
  });
});
