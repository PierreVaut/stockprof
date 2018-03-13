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
                <div className='buy-sell-div'>
                    
                    <span onClick = { ()=> { this.setState({visible: false}) } } >
                    Quantity: {'    '} 
                    </span>{(position)? position : 0}
                    
                    <span className = 'buy-sell-close' style ={{ cursor: 'pointer' }} >   [<span onClick = { ()=> { this.setState({visible: false}) } } >X</span>]</span>

                    <br/>
                    Cash: { cashAvailable } 

                    <br/>
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
            onClick = { ()=> { this.setState({visible: true}) }}
            style = {{ cursor: 'pointer' }}
            >buy/sell</div>
        }
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(BuySellButton)