import React from 'react';
import { connect } from 'react-redux';
import { toggleVisibility } from '../actions/'
import { NavLink } from 'react-router-dom';
import homeIcon    from '../asset/pic/home.png';
import notifIcon   from '../asset/pic/notif.png';

const Header = (props) => ( 
    <div>
        <div className = 'header'>
            <div className = 'menu-link'>
                <NavLink to="/">
                    <img src = {homeIcon} alt ="Home" style = {{width: 40}}/>
                </NavLink>
            </div>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
            <div id = 'title' style={{ textDecoration: 'none', color: 'white' }}>Stocks</div>
            </NavLink>
            <div className = 'notification-link'>
                <img src = {notifIcon} alt ="Home" style = {{width: 35, marginTop: 4}}/>
            </div>
        </div>
        
    </div>
)



export default Header;
