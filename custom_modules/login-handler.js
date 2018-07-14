import { uri } from '../config/connect';

const mongoose = require('mongoose');

mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("[Mongoose] we're connected!");
});

