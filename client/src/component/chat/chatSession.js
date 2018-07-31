import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { DoSomething, ChatSessionItem } from './';
import { GuestMenu } from '../common';


const ChatSessionList = ({ account }) =>
  (
    <div>{account && account.isLogged ?

    (<div>
      <h2>Mon historique de messagerie</h2>
      {account && account.chatSessions && account.chatSessions.map((props, index) => <ChatSessionItem data={props} key={index} />)}
      <br />
      <NavLink to="/userlist">Liste des utilisateurs</NavLink>
      <br />

      {account && !account.chatSessions && <DoSomething /> }

     </div>)
    : <GuestMenu />}
    </div>);


const mapStateToProps = state => state.dataReducer;


export default connect(mapStateToProps)(ChatSessionList);
