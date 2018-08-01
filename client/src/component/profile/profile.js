import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Balance } from '../market';
import { GuestMenu, Loader } from '../common';
import { colors } from '../../config/color';
import { Dashboard } from '.';
import Moment from 'react-moment';

import {
  followUser as followUserAC,
  suppressAccount as suppressAccountAC,
} from '../../actions/';


const Profile = ({
  match: { params: { id: _id } },
  session: { isLogged },
  account,
  userList,
  suppressAccount,
  followUser,
}) => {
  const currentUser = userList ? userList.find(el => el._id === _id) : undefined;
  const initial = currentUser && currentUser.name ? currentUser.name.substr(0, 1).toUpperCase() : '_';
  const isAdmin = account.name === 'admin' && account.email === 'admin';
  const isYourself = _id === account._id;
  const isFollowingYou = account && account.isFollowingYou ? account.isFollowingYou.includes(_id) : undefined;
  const isFriend = account && account.friends ? account.friends.includes(_id) : undefined;

  return currentUser ? (isLogged ?
    (
      isYourself ? <Dashboard /> : (
        <div className="list-item-center">
          <div
            className="user-avatar"
            style={{ backgroundColor: colors[(initial.charCodeAt(0)) % colors.length] }}
          > {initial}
          </div><br /><br />
          <div>{currentUser.name}</div>
          <div className="span-timestamp">Last login: <Moment fromNow>{account.lastLogin}</Moment></div>
          <NavLink className="userSocialLink" to={`/chat/${_id}`} >&#9993; Message</NavLink>
          <br />
          <br />
          <br />
          <div>Vous suit (follower) : {isFollowingYou ? 'oui 😎' : 'non 😓'}</div>
          <div>Suivi (par vous) : {isFriend ? 'Suivi ☑️' : 'non 😾'}</div>
          {isFriend ? null : <div className="userSocialLink" onClick={() => { followUser({ userId: account._id, targetId: _id }); }} >&#10173; Suivre </div>}


          <br />
          <div>Cash disponible: {currentUser.cashAvailable} $</div><br />
          <div>Plus/moins-values: <Balance userAccount={currentUser} /></div><br />

          {isAdmin ? (<div className="userSocialLink" onClick={() => { suppressAccount('admin12345', _id); }} >&#9760; Supprimer (Admin)</div>) : null}
          <br />
          <NavLink to="/userlist">Retour</NavLink>
        </div>)
    ) :
    (<GuestMenu />)
  ) : <Loader />;
};

const mapStateToProps = state => state.dataReducer;

const mapDispatchToProps = dispatch => ({
  suppressAccount: (adminToken, id) => {
    console.log('suppressAccount ', id);
    dispatch(suppressAccountAC(adminToken, id));
  },
  followUser: payload => {
    console.log('Follow: ', payload);
    dispatch(followUserAC(payload));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
