const mongoose = require('mongoose');
import { uri }    from '../config/connect';
import { domain } from '../config/domain';

mongoose.connect(uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
  console.log("[Mongoose] we're connected!");
});




