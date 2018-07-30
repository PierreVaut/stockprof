import React from 'react';
import Moment from 'react-moment';


const Comment = (props) => {
  const { author, content, timestamp } = props;
  return (
    <div className="comment-item">
      {author}: {content}
      <div className="timeline-timestamp"><Moment fromNow>{ timestamp }</Moment></div>
    </div>
  );
};

export default Comment;

