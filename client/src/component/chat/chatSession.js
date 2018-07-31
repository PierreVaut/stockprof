import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { DoSomething, ChatSessionItem } from './';


const ChatSessionList = ({ account }) => {
  console.log(account);
  return (
    <div>
      <h2>Historique de messagerie</h2>
      {account && account.chatSessions && account.chatSessions.map(id => <ChatSessionItem emitterId={id} key={id} />)}
      <br />
      <NavLink to="/userlist">Liste des utilisateurs</NavLink>
      <br />

      {account && !account.chatSessions && <DoSomething /> }

    </div>);
};

const mapStateToProps = state => state.dataReducer;


export default connect(mapStateToProps)(ChatSessionList);
