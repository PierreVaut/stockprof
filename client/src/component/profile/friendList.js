import React from 'react';
import { FriendItem } from './';


const FriendList = ({ inputList, userList }) => {
  const processedList = [];
  inputList.forEach(id => processedList.push(userList.find(user => user._id === id)));
  return (

    <div>
      {processedList.map((props, index) => <FriendItem {...props} key={index} />)}
    </div>);
};

export default FriendList;

