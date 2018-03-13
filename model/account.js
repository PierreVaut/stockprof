
const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isLogged: Boolean,
    lastLogin: Date,
    friends: [{ type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId('5a857519c4bb2a0e3043ef3a') }],
    created: { type: Date, default: Date.now },
    cashAvailable: { type: Number, default: 5000 },
    position: [
        {   
            symbol: String,
            qty: Number,
            buyPrice: Number,
            buyDate: Date
        }
    ],
    log: String,
    source: String
});

accountSchema.methods.order = function (operation, stockID, qty) {
    // let stock = this.getStock(stockID);
    if (operation === 'buy') {
        // required = all parameters
        // is the stock available ?
        // is the cashAvailable >= budget ?
        console.log (this.accountID, operation, stockID, qty)
        // return
    }
    else if (operation === 'sell') {
        // required = all parameters
        // is the stock available ?
        // is the stock detained ?
        console.log(this.accountID, operation, stockID, qty)
        // return
    }
    else if (operation === 'status') {
        // required = only accountID & operation
        // return position matching accountID
        console.log(this.accountID, operation)
        // return
    }
    else {
        console.log('Error at order() : unknown operation')
        // return
    }
}

export { accountSchema }