import React from 'react';
import { connect } from 'react-redux';
import { TimelineItem } from './';
import { GuestMenu, Loader, DoSomething } from '../common';
import {
  getTimeline as getTimelineAC,
  createTimelineItem as createTimelineItemAC,
  updateTimelineItem as updateTimelineItemAC,
} from '../../actions/';

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
      session, handleSubmit, timeline, account, createTimelineItem, _id,
    } = this.props;
    const {
      friends, email, name,
    } = account;
    const { search, viewFriendsOnly, newPost } = this.state;
    const isAdmin = account.name === 'admin' && account.email === 'admin';

    return (
      <div>
        { session.isLogged ?

          (timeline ?
            <div >
              <div className="list-item">

                <input
                  className="input-text"
                  type="text"
                  placeholder="Partager une info..."
                  onChange={e => { this.setState({ newPost: e.target.value }); }}
                  value={newPost}
                /><br />

                <button
                  className="middle primary"
                  onClick={() => {
                    this.setState({ newPost: '' });
                  const newTimelineItem = {
                    content: newPost,
                    author: name,
                    authorId: account._id,
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
                if (!isAdmin && viewFriendsOnly) {
                  return timelineItem.authorId === account._id ||
                  (timelineItem.author.toLowerCase().includes(search.toLowerCase())
                  && friends.includes(timelineItem.authorId));
                }
                return timelineItem.authorId === account._id ||
                timelineItem.author.toLowerCase().includes(search.toLowerCase());
              }).map((el, index) =>
                (<TimelineItem
                  {...el}
                  handleSubmit={handleSubmit}
                  key={index}
                  account={account}
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
