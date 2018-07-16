import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import homeIcon from '../../asset/pic/home.png';
import notifIcon from '../../asset/pic/notif.png';


const Header = ({ account }) => {
  const { notifications, _id } = account;


  const newNotifications = notifications ? notifications.filter(notif => notif.status === 'new') : [];

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
      { newNotifications.length > 0 ? <div className="notif-light">{newNotifications.length < 10 ? newNotifications.length : '9+'}</div> : null}
    </div>
  );
};


const mapStateToProps = state => state.dataReducer;


export default connect(mapStateToProps, null)(Header);
