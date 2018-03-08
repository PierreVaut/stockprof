import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Hbg = (props) => (
    <ul className = 'hbg' >
        <li><NavLink to="/login">Login </NavLink></li>
        <li>{props.isLogged?<NavLink to="/disconnect">Disconnect</NavLink>:<NavLink to="/register">Register</NavLink>}</li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/404">404</NavLink></li>
    </ul>
)

const mapStateToProps = state => state.dataReducer.session

export default connect(mapStateToProps)(Hbg);

