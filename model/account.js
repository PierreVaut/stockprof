
const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isLogged: Boolean,
  lastLogin: Date,
  friends: [{ type: String }],
  created: { type: Date, default: Date.now },
  cashAvailable: { type: Number, default: 5000 },
  position: mongoose.Schema.Types.Mixed,
  log: String,
  source: String,
});

accountSchema.methods.order = (operation, stockID, qty) => {
  // let stock = this.getStock(stockID);
  if (operation === 'buy') {
    // required = all parameters
    // is the stock available ?
    // is the cashAvailable >= budget ?
    console.log(this.accountID, operation, stockID, qty);
    // return
  } else if (operation === 'sell') {
    // required = all parameters
    // is the stock available ?
    // is the stock detained ?
    console.log(this.accountID, operation, stockID, qty);
    // return
  } else if (operation === 'status') {
    // required = only accountID & operation
    // return position matching accountID
    console.log(this.accountID, operation);
    // return
  } else {
    console.log('Error at order() : unknown operation');
    // return
  }
};

export { accountSchema };
