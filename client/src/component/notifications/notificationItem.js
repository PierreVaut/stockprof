import React from 'react';

const NotificationItem = ({
  authorName, content, status, timestamp,
}) => {
  const initial = authorName ? authorName.substr(0, 1).toUpperCase() : '_';

  return (
    <div>
      <div className="user-avatar">
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

