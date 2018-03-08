import { uri } from '../config/connect';
import { priceSchema } from '../model/price';
const chalk = require('chalk');
const mongoose = require('mongoose');
mongoose.connect(uri);
const database2 = mongoose.connection;


export const priceDB = {

    init(){
        const Price = mongoose.model('Price', priceSchema);
        database2.on('error', console.error.bind(console, 'connection error:'));
        database2.once('open', () => {
            console.log("[priceDB Init] we're connected !")
        });
    },

    handle(data, cb){
        if(data.symbol2 === 'USD'){
            const Price = mongoose.model('Price', priceSchema);
            Price.findOne({symbol1: data.symbol1}, (err, result)=>{
                if(result){
                    result.symbol1   = data.symbol1;
                    result.symbol2   = data.symbol2;
                    result.price     = data.price;
                    result.open24    = data.open24;
                    result.save(
                        this.get(cb)
                    );
                    console.log("[priceDB] " , result.symbol1, " - price updated:", result.price)

                }
                else{
                    let newPrice = new Price();
                    newPrice.timestamp = Date();
                    newPrice.symbol1   = data.symbol1;
                    newPrice.symbol2   = data.symbol2;
                    newPrice.price     = data.price;
                    newPrice.open24    = data.open24;
                    newPrice.save(
                       this.get(cb)
                    );
                    console.log("[priceDB] new Currency:", data, newPrice)
                }
                //console.log("[priceDB] else ?", data)
                
            })
        }
        else{
            console.log("[priceDB] error, use only USD")
        }
    },


    get(cb){
        const Price = mongoose.model('Price', priceSchema);
        Price.find().lean().exec( function(err, docs){
            if(err){return err}
            console.log(chalk.green('[priceDB] get: '+ JSON.stringify(docs).substr(0, 30)));
            cb(docs)
        } )
    }
}