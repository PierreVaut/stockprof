import React from 'react';
import { connect } from 'react-redux';
import UserList from './userList';
import { GuestMenu } from '../common';


const Play = props => {
  const { isLogged } = props.session;
  return isLogged ? (
    <div>
      <h2>Users</h2>
      <UserList />
    </div>
  ) : <GuestMenu />;
};

const mapStateToProps = state => state.dataReducer;

export default connect(mapStateToProps)(Play);
