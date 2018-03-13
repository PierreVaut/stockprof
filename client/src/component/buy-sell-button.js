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
        
        let position = 0;
        if(this.props.dataReducer.account.position){
            this.props.dataReducer.account.position.forEach( el => { 
                if(el.symbol === this.props.symbol){
                    position = el.qty
                }
            });
        }
        let { cashAvailable } = this.props.dataReducer.account;
        let userId = this.props.dataReducer.account['_id'];

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
                        Quantity: {(position)? position : 0}<br/>
                        Cash: {cashAvailable } 
                    </div>

                    <button className='buy-sell-btn' >All in !!! 🛒</button>
                    <button className='buy-sell-btn' >+500$ 👍</button><br/>
                    <button className='buy-sell-btn' >Sell it all 🔥</button>
                    <button className='buy-sell-btn' >-500$ 💸</button>
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

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (id, operation, value, symbol) => dispatch( marketOperation(id, operation, value, symbol) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuySellButton)