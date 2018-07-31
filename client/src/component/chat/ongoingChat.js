import React from 'react';
import { connect } from 'react-redux';
import { DoSomething } from './';


const OngoingChat = ({ account }) => {
  console.log(account);
  return (
    <div>
      <h2>Historique de messagerie</h2>
      {account && account.lastChatSessions && JSON.stringify(account.lastChatSessions) }
      {account && !account.lastChatSessions && <DoSomething /> }

    </div>);
};

const mapStateToProps = state => state.dataReducer;


export default connect(mapStateToProps)(OngoingChat);
