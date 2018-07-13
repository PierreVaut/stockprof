import React from 'react';
import { NavLink } from 'react-router-dom';
import { colors } from '../../config/color';
import { Balance } from '../market';

const User = (props) => {
  const {
    userId, targetId, handleFollow, handleUnfollow, isFriend, isYourself, name,
  } = props;
  const initial = props.name.substr(0, 1);
  const hasbeenLoggedRecently = props.isLogged && (new Date() - new Date(props.lastLogin)) < (1000 * 60 * 180); // Last 3 hours
  return (
    <div className="user">
      <div
        className="user-avatar"
        style={{ backgroundColor: colors[(initial.charCodeAt(0)) % colors.length] }}
      >
        {initial.toUpperCase()}
      </div>
      <div
        className="user-connect-light"
        style={hasbeenLoggedRecently ?
            { backgroundColor: 'green' } : { backgroundColor: 'gray' }
        }
      />

      <div className="user-name">{name} {isYourself ? '(Vous)' : null} {'   '}
        <Balance account={props} /><br />
        { isYourself ?
          null :
          (isFriend ?
            <div>
              <div className="userSocialLink" onClick={() => { handleUnfollow({ userId, targetId }); }} >&#10173; Ne plus suivre</div>
              <NavLink className="userSocialLink" to="/" >&#9993; Message</NavLink>
            </div>
            :
            <div>
              <div className="userSocialLink" onClick={() => { handleFollow({ userId, targetId }); }} >&#10173; Suivre</div>
              <NavLink className="userSocialLink" to="/" >&#9993; Message</NavLink>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default User;
