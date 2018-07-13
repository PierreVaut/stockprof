import React from 'react';
import { connect } from 'react-redux';
import { TimelineItem } from './timelineItem';
import { GuestMenu, Loader } from '../common';
import {
  getTimeline as getTimelineAC,
  updateTimelineItem as updateTimelineItemAC } from '../../actions/';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      viewFriendsOnly: false,
    };
  }

  componentDidMount() {
    this.props.getTimeline();
  }

  render() {
    const {
      session, handleSubmit, timeline, account,
    } = this.props;
    const { friends } = account;
    const { search, viewFriendsOnly } = this.state;

    return (
      <div className="user">
        { session.isLogged ?

          (timeline ?
            <div>
              <input
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
              <span className="input-checkbox-text"> Afficher uniquement les amis</span> <br /><br />
              {timeline.filter(timelineItem => {
                if (!viewFriendsOnly) {
                  return timelineItem.author.toLowerCase().includes(search.toLowerCase());
                }
                return (
                  timelineItem.author.toLowerCase().includes(search.toLowerCase())
                  && friends.includes(timelineItem.authorId)
                );
              }).map((el, index) =>
                (<TimelineItem
                  {...el}
                  handleSubmit={handleSubmit}
                  key={index}
                />))}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
