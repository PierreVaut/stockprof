import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserList from './userList';


const Play = props => {
  const { isLogged } = props.session;
  return isLogged ? (
    <div>
      <h2>Users</h2>
      <UserList />
    </div>
  ) :
    (<div>
      <h2>Vous devez être connecté pour accéder à cette page</h2>
      <p>Connectez-vous</p>
      <div className="menu-entry">🛂 <NavLink to="/login">Login </NavLink></div><br />
      <p>Créez un compte</p>
      <div className="menu-entry">😀 <NavLink to="/register">Register</NavLink></div><br />
    </div>);
};

const mapStateToProps = state => state.dataReducer;

export default connect(mapStateToProps)(Play);
