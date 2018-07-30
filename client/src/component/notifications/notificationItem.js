import React from 'react';
import { colors } from '../../config/color';


const NotificationItem = ({
  authorName, content, status, timestamp,
}) => {
  const initial = authorName ? authorName.substr(0, 1).toUpperCase() : '_';

  return (
    <div>
      <div
        className="user-avatar"
        style={{ backgroundColor: colors[(initial.charCodeAt(0)) % colors.length] }}
      >
        {initial}
      </div>
      <div className="user-name">
        {authorName} - {content}
        {status === 'new' ? '    (New!)' : null}<br />
        {timestamp}
      </div>
    </div>
  );
};

export default NotificationItem;

