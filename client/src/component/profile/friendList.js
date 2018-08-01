import React from 'react';
import { FriendItem, DoSomethingFriendList } from './';


class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showFriends: false };
  }
  render() {
    const { inputList, userList, listName } = this.props;
    const processedList = [];
    inputList.forEach(id => processedList.push(userList.find(user => user._id === id)));
    return (
      <div>
        <button className="large primary" onClick={() => this.setState({ showFriends: !this.state.showFriends })}>{this.state.showFriends ? 'Fermer' : listName}</button>
        {
            this.state.showFriends ? ((processedList && processedList.length > 0) ? <div>{processedList.map((props, index) => <FriendItem {...props} key={index} />)}</div>
    : <DoSomethingFriendList />) : null}
      </div>);
  }
}

export default FriendList;

