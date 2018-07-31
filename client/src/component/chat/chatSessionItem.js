import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';


const ChatSessionItem = ({ data, userList }) => {
  console.log('ChatSessionItem', data);
  let { id, timestamp } = data;
  if (typeof data === 'string') {
    id = data;
  }
  let targetUser = { name: '' };
  if (userList && id) {
    targetUser = userList.find(el => el._id === id);
  }

  if (userList && id) {
    targetUser = userList.find(el => el._id === id);
  }

  return (
    <div>
      <NavLink to={`/chat/${id}`}>
        {targetUser ? targetUser.name : 'session'}
      </NavLink> <span className="span-timestamp"> - <Moment fromNow>{timestamp}</Moment></span>
    </div>);
};


const mapStateToProps = state => state.dataReducer;


export default connect(mapStateToProps)(ChatSessionItem);
