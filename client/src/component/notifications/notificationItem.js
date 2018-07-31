import React from 'react';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import { colors } from '../../config/color';


const NotificationItem = ({
  authorId, authorName, content, status, timestamp, notif_type,
}) => {
  const initial = authorName ? authorName.substr(0, 1).toUpperCase() : '_';
  let link = '';
  switch (notif_type) {
    case 'msg':
      link = `/chat/${authorId}`;
      break;
    case 'follow':
      link = `/profile/${authorId}`;
      break;
    case 'like':
      link = '/timeline';
      break;

    default:
      link = '/notifications';
  }
  return (
    <div className="list-item">
      <div
        className="user-avatar"
        style={status === 'new' ? { backgroundColor: colors[(initial.charCodeAt(0)) % colors.length] } : null}
      >
        {initial}
      </div>
      <div className="user-name">
        {authorName} - <NavLink className="notification-navlink" to={link}>{content}</NavLink>
        {status === 'new' ? '    (New!)' : null}<br />
        <div className="timeline-timestamp"><Moment fromNow>{timestamp}</Moment></div>
      </div>
    </div>
  );
};

export default NotificationItem;

