import React from 'react';
import { connect } from 'react-redux';
import UserList from './userList';
import { GuestMenu } from '../common';


const UserTable = props => {
  const { isLogged } = props.session;
  return isLogged ? <UserList /> : <GuestMenu />;
};

const mapStateToProps = state => state.dataReducer;

export default connect(mapStateToProps)(UserTable);
