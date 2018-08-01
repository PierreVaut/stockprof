import React from 'react';
import { NavLink } from 'react-router-dom';
import { colors } from '../../config/color';
import { Balance } from '../market';

const User = (props) => {
  const {
    userId, targetId, handleFollow, handleUnfollow, isFriend, isYourself, name, isFollowingYou, lastLogin, isLogged, currentUser, suppressAccount,
  } = props;
  const initial = props.name.substr(0, 1);
  const hasbeenLoggedRecently = (new Date() - new Date(lastLogin)) < (1000 * 60 * 180); // Last 3 hours
  const isAdmin = currentUser.name === 'admin' && currentUser.email === 'admin';
  return (
    <div className="list-item">
      <div
        className="user-avatar"
        style={{ backgroundColor: colors[(initial.charCodeAt(0)) % colors.length] }}
      >
        {initial.toUpperCase()}
        <div
          className="user-connect-light"
          style={hasbeenLoggedRecently ?
            { backgroundColor: 'green' } : { backgroundColor: 'gray' }
        }
        />
      </div>

      <div className="user-name"><NavLink to={`/profile/${targetId}`} className="user-name-link">{name}</NavLink> {isYourself ? '(Vous)' : null} {'   '}{!isAdmin && isFollowingYou ? <i>(Follower)</i> : null}
        {'   '}<Balance userAccount={props} /><br />
        { isAdmin ?
          <div>
            <div className="userSocialLink" onClick={() => { suppressAccount('admin12345', targetId); }} >&#9760; Supprimer (Admin)</div>
            <NavLink className="userSocialLink" to={`/admin/dashboard/${targetId}`} >&#9937; Voir le profil (Admin)</NavLink>
          </div>
          :
          isYourself ?
          null :
          (
            <span>
              {isFriend ?
                <div>
                  <div className="userSocialLink" onClick={() => { handleUnfollow({ userId, targetId }); }} >&#10173; Ne plus suivre</div>
                  <NavLink className="userSocialLink" to={`/chat/${targetId}`} >&#9993; Message</NavLink>
                </div>
              :
                <div>
                  <div className="userSocialLink" onClick={() => { handleFollow({ userId, targetId }); }} >&#10173; Suivre</div>
                  <NavLink className="userSocialLink" to={`/chat/${targetId}`} >&#9993; Message</NavLink>
                </div>
              }

            </span>
          )
        }
      </div>
    </div>
  );
};

export default User;
