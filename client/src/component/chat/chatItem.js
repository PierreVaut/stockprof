import React from 'react';
import Moment from 'react-moment';

const ChatItem = ({
  emitterId, timestamp, content, targetUser, currentUser,
}) => {
  const author = (emitterId === currentUser._id) ? currentUser : targetUser;
  const initial = author ? author.name.substr(0, 1).toUpperCase() : '_';

  if (emitterId === currentUser._id || emitterId === targetUser._id) {
    return (
      <div className="list-item">
        <div className="user-avatar">
          {initial}
        </div>
        <div className="user-name">{author.name} - {content}
          <div className="timeline-timestamp">{author._id}</div>
          <div className="timeline-timestamp"><Moment fromNow>{timestamp}</Moment></div>
        </div>
      </div>
    );
  }
};

export default ChatItem;

