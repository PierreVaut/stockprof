import React from 'react';

const NotificationItem = ({ authorName, content }) => {
  const initial = authorName.substr(0, 1).toUpperCase();

  return (
    <div>
      <div className="user-avatar">
        {initial}
      </div>
      <div className="user-name">
        {authorName} - {content}
      </div>
    </div>
  );
};

export default NotificationItem;

