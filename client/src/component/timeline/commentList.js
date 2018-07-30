import React from 'react';

import { CommentItem } from './';


const CommentList = ({ comments }) => (
  <div className="comment-list">
    { comments && comments.length > 0 ?
          comments.map((commentItem, index) => <CommentItem {...commentItem} key={index} />) :
          ''
          }
  </div>
);

export default CommentList;

