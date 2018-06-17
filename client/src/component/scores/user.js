import React from 'react';
import { NavLink } from 'react-router-dom';
import { colors } from '../../config/color';
import { Balance } from '../market';

const User = (props) => {
  const initial = props.name.substr(0, 1);
  // Has been Logged in the past 3 hours.
  const hasbeenLoggedRecently = props.isLogged && (new Date() - new Date(props.lastLogin)) < (1000 * 60 * 180);

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

      <div className="user-name">{props.name} :{'   '}
        <Balance account={props} /><br />
        <NavLink className="userSocialLink" to="/" >Ajouter ami</NavLink>{' '}
        <NavLink className="userSocialLink" to="/" >&#9993;MP</NavLink>
      </div>
    </div>
  );
};

export default User;
