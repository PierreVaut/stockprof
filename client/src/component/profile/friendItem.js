import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { colors } from '../../config/color';
import {
  unfollowUser as unfollowUserAC,
} from '../../actions/';

const FriendItem = ({
  name, _id, account: currentUser, unfollowUser,
}) => {
  const initial = name ? name.substr(0, 1).toUpperCase() : '_';

  return (
    <div className="list-item-center">
      <div
        className="user-avatar"
        style={{ backgroundColor: colors[(initial.charCodeAt(0)) % colors.length] }}
      >
        {initial}
      </div>
      <div className="user-name">
        {name}<br />
        <NavLink className="userSocialLink" to={`/chat/${_id}`} >&#9993; Message</NavLink>
        <div className="userSocialLink" onClick={() => { unfollowUser({ userId: currentUser._id, targetId: _id }); }} >&#10173; Ne plus suivre</div>
      </div>
    </div>

  );
};

const mapStateToProps = state => state.dataReducer;

const mapDispatchToProps = dispatch => ({
  unfollowUser: payload => {
    console.log('Un-follow: ', payload);
    dispatch(unfollowUserAC(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendItem);

