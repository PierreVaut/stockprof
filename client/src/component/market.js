import React from 'react';
import Currency from './currency';
import { connect } from 'react-redux'
import Loader from './loader'


const Market = props => {
    return (
        <div className = 'market'>
            <h2>Market</h2>
            
            {props.prices.map( 
               el => { 
                   if(el.symbol1 === 'TEST'){
                       return <Loader key={el.symbol1} />
                   } else {
                       return <Currency {...el} account={props.account} key={el.symbol1} /> 
                   }
            })}
        </div>
    )
}

const mapStateToProps = state => state.dataReducer

export default connect(
    mapStateToProps
)(Market);