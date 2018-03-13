import React from 'react';
import { connect }  from 'react-redux';

class BuySellButton extends React.Component {

    constructor(props){
        super(props);
        // local state only 
        this.state = {visible: false};
    }


    render(){
        let position = this.props.dataReducer.account.position[this.props.symbol]
        let { cashAvailable } = this.props.dataReducer.account;
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

export default connect(mapStateToProps)(BuySellButton)