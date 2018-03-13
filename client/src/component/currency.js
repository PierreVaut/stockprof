import React from 'react';
import BuySellButton from './buy-sell-button'


/* Keep this component as a Class */
class Currency extends React.Component{
    constructor(props){
        super(props);
        // local state only 
        this.state = {localPrice: 0}
    }

    // this can be updated when component is rendered
    componentDidMount(){
        this.setState({
            price: this.props.localPrice
        })
    }


    render(){
        return(
            <div className = 'currency'>
                <div className = 'currency-name'>
                    {this.props.symbol1}               

                    <span className = 'currency-open24-diff'
                        style = {(this.props.price >= this.props.open24)?{color: 'green'}:{color:'red'} }
                    >
                        {(this.props.price >= this.props.open24)?'  +':'  '}
                        {Math.round(100*(this.props.price - this.props.open24) / this.props.open24)}%
                    </span>
                
                </div>


                <div className = 'currency-price'>
                    Market price: {this.props.price}  $
                
                    {(this.props.price >= this.state.price)?
                        (<span className = "currency-diffprice-sign" style={{color: 'green'}}>  &#9650;</span>):
                        (<span className = "currency-diffprice-sign" style={{color: 'red'}}>  &#9660;</span>)
                    }

                </div>


                <div className = 'currency-open24'>
                    Last price (24h): {this.props.open24}$
                </div>




                <div className = 'currency-timestamp' >
                    timestamp: {new Date(this.props.timestamp).toLocaleString()}
                </div>
                
                <BuySellButton symbol = {this.props.symbol1} />


            </div>
        )
    }
}

export default Currency
