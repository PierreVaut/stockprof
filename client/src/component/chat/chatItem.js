import React from 'react';
import Moment from 'react-moment';
import { colors } from '../../config/color';


const ChatItem = ({
  emitterId, timestamp, content, targetUser, currentUser,
}) => {
  const author = (emitterId === currentUser._id) ? currentUser : targetUser;
  const initial = author ? author.name.substr(0, 1).toUpperCase() : '_';

  if ((currentUser && emitterId === currentUser._id) || (targetUser && emitterId === targetUser._id)) {
    return (
      <div className="list-item">
        <div
          className="user-avatar"
          style={{ backgroundColor: colors[(initial.charCodeAt(0)) % colors.length] }}
        >
          {initial}
        </div>
        <div className="user-name">{author.name} - {content}
          <div className="timeline-timestamp"><Moment fromNow>{timestamp}</Moment></div>
        </div>
      </div>
    );
  }
  return null;
};

export default ChatItem;

