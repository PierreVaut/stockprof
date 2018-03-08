import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import RawData from '../container/rawData';

const Menu = (props) => (
    <div className = 'menu' >
        <RawData />
        <div className = 'menu-entry'><NavLink to="/play">Start !</NavLink></div>
        <div className = 'menu-entry'><NavLink to="/dashboard">Dashboard</NavLink></div>
        <div className = 'menu-entry'><NavLink to="/login">Login </NavLink></div>
        <div className = 'menu-entry'>
            {props.isLogged?
                <NavLink to="/disconnect">Disconnect</NavLink>:
                <NavLink to="/register">Register</NavLink>}
        </div>
        <div className = 'menu-entry'><NavLink to="/about">About</NavLink></div>
        <div className = 'menu-entry'><NavLink to="/contact">Contact</NavLink></div>
    </div>
)

const mapStateToProps = state => state.dataReducer.session

export default connect(mapStateToProps)(Menu);

