import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { CurrentBalance } from '../market';
import { GuestMenu } from '../common';
import { colors } from '../../config/color';
import { FriendList } from '.';


const Dashboard = props => {
  const { isLogged } = props.session;
  const {
    cashAvailable, name, position, _id, friends, isFollowingYou,
  } = props.account;
  const initial = name ? name.substr(0, 1).toUpperCase() : '_';

  return isLogged ?
    (
      <div className="list-item-center">
        <div
          className="user-avatar"
          style={{ backgroundColor: colors[(initial.charCodeAt(0)) % colors.length] }}
        >
          {initial}
        </div><br /><br />
        <div>Votre nom: {name}</div>
        <div>Votre Id: {_id}</div>
        <div>Cash disponible: {cashAvailable} $</div><br />
        <div>Plus/moins-values: <CurrentBalance account={props.account} /></div><br />
        <div>Portefeuille: {JSON.stringify(position)}</div><br />
        <div><FriendList inputList={friends} userList={props.userList} listName="Vos contacts" /></div><br />
        <div><FriendList inputList={isFollowingYou} userList={props.userList} listName="Vos Followers" /></div><br />
        <br /><br />
        <span role="img" aria-label="suppress account">🗑️</span><NavLink to="/suppressAccount"> Supprimer le compte</NavLink>
      </div>
    ) :
    (<GuestMenu />);
};

const mapStateToProps = state => state.dataReducer;

export default connect(mapStateToProps)(Dashboard);
