import React from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import homeIcon from '../../asset/pic/home.png';
import notifIcon from '../../asset/pic/notif.png';

const Header = ({ account }) => {
  const { notifications } = account;

  return (
    <div className="header">
      <div className="menu-link">
        <NavLink to="/">
          <img src={homeIcon} alt="Home" style={{ width: 40 }} />
        </NavLink>
      </div>
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <div id="title" style={{ textDecoration: 'none', color: 'white' }}>Stocks</div>
      </NavLink>
      <div className="notification-link">
        <NavLink to="/notifications">
          <img src={notifIcon} alt="notif" style={{ width: 35, marginTop: 4 }} />
        </NavLink>
      </div>
      {notifications && notifications.length > 0 ? <div className="notif-light">{notifications.length < 10 ? notifications.length : '9+'}</div> : <div className="notif-light">0!</div>}
    </div>
  );
};


const mapStateToProps = state => state.dataReducer;


export default connect(mapStateToProps, null)(Header);
