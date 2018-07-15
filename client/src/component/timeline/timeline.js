import React from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { TimelineItem } from './timelineItem';
import { GuestMenu, Loader, DoSomething } from '../common';
import {
  getTimeline as getTimelineAC,
  createTimelineItem as createTimelineItemAC,
  updateTimelineItem as updateTimelineItemAC } from '../../actions/';

const socket = openSocket();

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      viewFriendsOnly: true,
      newPost: '',
    };
  }

  componentDidMount() {
    this.props.getTimeline();
  }

  render() {
    const {
      session, handleSubmit, timeline, account, createTimelineItem,
    } = this.props;
    const {
      friends, _id, email, name,
    } = account;
    const { search, viewFriendsOnly, newPost } = this.state;

    return (
      <div>
        { session.isLogged ?

          (timeline ?
            <div >
              {/* <input
                className="input-text"
                type="text"
                placeholder="Rechercher..."
                onChange={e => { this.setState({ search: e.target.value }); }}
                value={search}
              /><br />
              <input
                className="input-checkbox"
                type="checkbox"
                checked={viewFriendsOnly}
                onClick={() => { this.setState({ viewFriendsOnly: !viewFriendsOnly }); }}
              />
              <span className="input-checkbox-text"> Afficher uniquement les amis</span> <br /><br /> */}
              <div className="list-item">

                <input
                  className="input-text"
                  type="text"
                  placeholder="Partager une info..."
                  onChange={e => { this.setState({ newPost: e.target.value }); }}
                  value={newPost}
                /><br />

                <button
                  className="middle-button"
                  onClick={() => {
                    this.setState({ newPost: '' });
                  const newTimelineItem = {
                    content: newPost,
                    author: name,
                    authorId: _id,
                    authorEmail: email,
                  };
                  createTimelineItem(newTimelineItem);
                  }}
                >
              Envoyer
                </button>
              </div>

              {friends.length > 0 ?

              timeline
              .filter(timelineItem => {
                if (viewFriendsOnly) {
                  return timelineItem.authorId === _id ||
                  (timelineItem.author.toLowerCase().includes(search.toLowerCase())
                  && friends.includes(timelineItem.authorId));
                }
                return timelineItem.authorId === _id ||
                timelineItem.author.toLowerCase().includes(search.toLowerCase());
              }).map((el, index) =>
                (<TimelineItem
                  {...el}
                  handleSubmit={handleSubmit}
                  key={index}
                  currentUser={account}
                />))
                :
              <DoSomething />

                }
            </div>
          : <Loader />)
        : <GuestMenu />}
      </div>
    );
  }
}

const mapStateToProps = state => state.dataReducer;

const mapDispatchToProps = dispatch => ({
  getTimeline: data => dispatch(getTimelineAC(data)),
  handleSubmit: (payload) => dispatch(updateTimelineItemAC(payload)),
  createTimelineItem: item => dispatch(createTimelineItemAC(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
