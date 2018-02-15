// will return an object containing quantity detained, buyPrice, buyDate, log  (or undefined)
accountSchema.methods.getStock = stockID => {
    
    // we try to match StockID to a stock code
    let code = stocksNameCode.toLowerCase();
    if(stocksNameCode.stockID){
        console.log("getStock(): converting " + stockID + " to  code: " + code);
        code = stocksNameCode.stockID;
    }

    // check if the stock is already detained
    let result = this.position.map((el) => {
        if(el.stockCode === code){
            return this.position[indexOf(el)]
        }
    if(!result){
        console.log('GetStock():  code unknown');
        return undefined
    }
    console.log('GetStock:  code matching stock ' + result.stockName );
    return result
    })
};


accountSchema.methods.updatePosition = (accountID) => {

}



