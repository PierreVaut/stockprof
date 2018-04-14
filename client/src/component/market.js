import React from 'react';
import Currency from './currency';
import Balance from './balance';
import { connect } from 'react-redux';
import Loader from './loader';
import { NavLink } from 'react-router-dom';

const Market = props => {
    const { isLogged } = props.session;
    const { cashAvailable } = props.account;
    return isLogged ? (
        <div className = 'market'>
            <h2>Market</h2>
            <p>Cash disponible: {Math.round(cashAvailable) }$ </p>
            <p>Plus/moins-values: <Balance account = {props.account} /></p><br/>
            
            {props.prices.map( 
               el => { 
                   if(el.symbol1 === 'TEST'){
                       return <Loader key={el.symbol1} />
                   } else {
                       return <Currency {...el} account={props.account} key={el.symbol1} /> 
                   }
            })}
        </div>
    ):
    (<div>
        <h2>Vous devez être connecté pour accéder à cette page</h2>
        <p>Connectez-vous</p>
        <div className = 'menu-entry'>🛂 <NavLink to="/login">Login </NavLink></div><br/>
        <p>Créez un compte</p>
        <div className = 'menu-entry'>😀 <NavLink to="/register">Register</NavLink></div><br/>    
    </div>)
}

const mapStateToProps = state => state.dataReducer

export default connect(
    mapStateToProps
)(Market);