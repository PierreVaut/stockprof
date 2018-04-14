import React   from 'react'
import Balance from './balance';
import { connect }  from 'react-redux';
import { NavLink } from 'react-router-dom';

const Timeline = props => {
    const { isLogged } = props.session;
    const { cashAvailable, name, position, _id } = props.account;
    const profit = Math.round(5000 - cashAvailable);

    return isLogged ?
     (<div className= 'timeline'>
        <h2>Timeline</h2>
    </div>):
    (<div>
        <h2>Vous devez être connecté pour accéder à cette page</h2>
        <p>Connectez-vous</p>
        <div className = 'menu-entry'>🛂 <NavLink to="/login">Login </NavLink></div><br/>
        <p>Créez un compte</p>
        <div className = 'menu-entry'>😀 <NavLink to="/register">Register</NavLink></div><br/>    
    </div>)
    

}

const mapStateToProps = state => state.dataReducer

export default connect(mapStateToProps)(Timeline);