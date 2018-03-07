
import { priceSchema } from '../model/account';
const mongoose = require('mongoose');
mongoose.connect(uri);
const database = mongoose.connection;


export const priceDB = {
    init: function(){

        database.on('error', console.error.bind(console, 'connection error:'));
        database.once('open', () => {
            console.log("[priceDB Init] we're connected !")
        });
    },

    handle(data){
        this.create(data, data => update(data))
    },

    create(data, cb){
        cb(data)
    },

    update(data){}

}