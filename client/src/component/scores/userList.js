import React from 'react';
import { connect } from 'react-redux';
import User from './user';
import {
  followUser as followUserAC,
  unfollowUser as unfollowUserAC,
} from '../../actions/';

const UserList = ({
  userList, followUser, unfollowUser, account,
}) => {
  const { friends } = account;
  return (
    <div>
      <input type="checkbox" />Afficher uniquement les personnes suivies<br /><br />
      {userList.map(userProps => (<User
        {...userProps}
        key={userProps._id}
        targetId={userProps._id}
        userId={account._id}
        handleFollow={followUser}
        handleUnfollow={unfollowUser}
        isFriend={friends.includes(userProps._id)}
      />))}
    </div>
  );
};


const mapStateToProps = state => state.dataReducer;

const mapDispatchToProps = dispatch => ({
  followUser: payload => {
    console.log('Follow: ', payload);
    dispatch(followUserAC(payload));
  },
  unfollowUser: payload => {
    console.log('Un-follow: ', payload);
    dispatch(unfollowUserAC(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
