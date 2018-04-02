import React from 'react';
import { connect }  from 'react-redux';
import { marketOperation } from '../actions/'



class BuySellButton extends React.Component {

    constructor(props){
        super(props);
        // local state only 
        this.state = {visible: false, msg: 'test'};
    }


    render(){
        let detainedQty = 0;
        const { position, cashAvailable, _id } = this.props;
        console.log(this.props);
        
        for(let el in position){ 
            // console.log("Position: ", el, this.props.symbol);
            if(el === this.props.symbol){
                // console.log(el, position, position[el])
                detainedQty = position[el]
            }
        }
        let price = this.props.price;

        if(this.state.visible){    
            return(
                <div className='buy-sell-div' style = {{border: '3px solid #104f55', borderRadius: 5}} >
                            
                            
                    <div 
                        onClick = { ()=> { this.setState({visible: false}) } }
                        className = 'buy-sell-close'
                    >
                        X
                    </div>           
                    
                    <div className='buy-sell-text'>
                        Quantity: {(detainedQty)? detainedQty : 0}<br/>
                        Cash: {Math.round(cashAvailable) } 
                    </div>

                        <button
                            disabled={cashAvailable < 1}
                            className='buy-sell-btn' 
                            onClick={() => {
                                let options = {
                                    _id,
                                    operation: 'buy',
                                    amount: -cashAvailable,
                                    qty: parseFloat((cashAvailable/price).toFixed(8)),
                                    symbol: this.props.symbol
                                };
                                console.log("[market] :", options)
                                this.props.onClick(options)}
                            }
                        >
                        All in !!! 🛒
                        </button>
                        <button 
                            disabled={cashAvailable < 500}
                            className='buy-sell-btn' 
                            onClick={() => {
                                let options = {
                                    _id,
                                    operation: 'buy',
                                    amount: -500,
                                    qty: parseFloat((500/price).toFixed(8)),
                                    symbol: this.props.symbol
                                };
                                console.log("[market] :", options)
                                this.props.onClick(options);}
                            }
                        >
                        Buy 500$ 👍
                        </button><br/>
                        <button 
                            disabled={detainedQty <= 0}
                            className='buy-sell-btn' 
                            onClick={()=>{
                                let options = {
                                    _id,
                                    operation: 'sell',
                                    amount: parseFloat((detainedQty*price).toFixed(8)),
                                    qty: detainedQty,
                                    symbol: this.props.symbol
                                };
                                console.log("[market] :", options)
                                this.props.onClick(options)}
                            }
                        >
                        Sell it all 🔥
                        </button>
                        <button 
                            disabled={detainedQty * price < 500}
                            className='buy-sell-btn' 
                            onClick={()=>{
                                let options = {
                                    _id,
                                    operation: 'sell',
                                    amount: 500,
                                    qty: parseFloat((500/price).toFixed(8)),
                                    symbol: this.props.symbol
                                };
                                console.log("[market] :", options)
                                this.props.onClick(options)}
                            }
                        >
                        Sell 500$ 💸
                        </button>

                <br/>

                {(this.state.msg)?<div className='buy-sell-msg'>{this.state.msg}</div>:null}

                </div>    
            )
        }
     
        else{
            return <div
            className='buy-sell-link'
            onClick = { ()=> { this.setState({visible: true}) }}
            style = {{ cursor: 'pointer' }}
            >buy/sell</div>
        }
    }
}



const mapDispatchToProps = dispatch => {
    return {
        onClick: (options) => dispatch( marketOperation(options) )
    }
}

const mapStateToProps = state => {
    return {
        position: state.dataReducer.account.position,
        cashAvailable: state.dataReducer.account.cashAvailable,
        _id: state.dataReducer.account._id
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuySellButton)