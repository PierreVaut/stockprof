import { uri } from '../config/connect';
import { accountSchema } from '../model/account';


const mongoose = require('mongoose');
mongoose.connect(uri);
const database = mongoose.connection;



export const db = {
    init: function(){
        const Account = mongoose.model('Account', accountSchema)
        database.on('error', console.error.bind(console, 'connection error:'));
        database.once('open', () => {
            console.log("we're connected!")
        });
    }

}