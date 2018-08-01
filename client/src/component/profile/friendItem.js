import React from 'react';
import { NavLink } from 'react-router-dom';

import { colors } from '../../config/color';


const FriendItem = ({ name, _id }) => {
  const initial = name ? name.substr(0, 1).toUpperCase() : '_';

  return (
    <div className="list-item">
      <div
        className="user-avatar"
        style={{ backgroundColor: colors[(initial.charCodeAt(0)) % colors.length] }}
      >
        {initial}
      </div>
      <div className="user-name">
        {name}<br />
        <NavLink className="userSocialLink" to={`/chat/${_id}`} >&#9993; Message</NavLink>
      </div>
    </div>

  );
};

export default FriendItem;

