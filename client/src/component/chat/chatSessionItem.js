import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


const ChatSessionItem = ({ emitterId, userList }) => {
  let targetUser = { name: '' };
  if (userList) {
    targetUser = userList.find(el => el._id === emitterId);
  }
  return (
    <div>
      <NavLink to={`/chat/${emitterId}`}>
        {targetUser ? targetUser.name : 'session'}
      </NavLink>
    </div>);
};


const mapStateToProps = state => state.dataReducer;


export default connect(mapStateToProps)(ChatSessionItem);
