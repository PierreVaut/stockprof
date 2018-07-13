import React from 'react';
import { connect } from 'react-redux';
import User from './user';
import {
  followUser as followUserAC,
  unfollowUser as unfollowUserAC,
} from '../../actions/';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      viewFriendsOnly: false,
      viewFollowersOnly: false,
      showSearchAndFilters: false,
    };
  }

  updateSearchField(value) {
    this.setState({ search: value });
  }

  render() {
    const {
      userList, followUser, unfollowUser, account,
    } = this.props;
    const { friends, isFollowingYou } = account;
    const {
      showSearchAndFilters, search, viewFriendsOnly, viewFollowersOnly,
    } = this.state;
    return (
      <div className="list-item">
        {showSearchAndFilters ? (
          <div>
            <button
              className="middle-button-disable"
              onClick={() => this.setState({ showSearchAndFilters: false })}
            >
            Masquer
            </button><br />
            <input
              className="input-text"
              type="text"
              placeholder="Rechercher..."
              onChange={e => { this.updateSearchField(e.target.value); }}
              value={search}
            /><br />
            <input
              className=""
              type="checkbox"
              checked={viewFriendsOnly}
              onClick={() => { this.setState({ viewFriendsOnly: !viewFriendsOnly }); }}
            />
            <span className="input-checkbox-text"> Afficher uniquement les amis</span> <br />

            <input
              className=""
              type="checkbox"
              checked={viewFollowersOnly}
              onClick={() => { this.setState({ viewFollowersOnly: !viewFollowersOnly }); }}
            />
            <span className="input-checkbox-text"> Afficher uniquement les Followers</span> <br /><br />

          </div>
        ) :
          (<button
            className="middle-button"
            onClick={() => this.setState({ showSearchAndFilters: true })}
          >Filtrer / trier
           </button>)
        }
        {userList.filter(user => {
          if (!viewFriendsOnly) {
            return user._id === account._id || user.name.toLowerCase().includes(search.toLowerCase());
          }
          return user._id === account._id || (
            user.name.toLowerCase().includes(search.toLowerCase())
            && friends.includes(user._id)
          );
          })
          .filter(user => {
              if (viewFollowersOnly) {
                return user._id === account._id || isFollowingYou.includes(user._id);
              }
              return user;
          })

 .map(userProps => (<User
   {...userProps}
   key={userProps._id}
   targetId={userProps._id}
   userId={account._id}
   handleFollow={followUser}
   handleUnfollow={unfollowUser}
   isFriend={friends.includes(userProps._id)}
   isYourself={userProps._id === account._id}
   isFollowingYou={isFollowingYou.includes(userProps._id)}
 />))}


      </div>);
  }
}

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
