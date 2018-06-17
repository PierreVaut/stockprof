import React from 'react';
import { connect } from 'react-redux';
import { TimelineItem } from './timelineItem';
import { GuestMenu, Loader } from '../common';
import {
  getTimeline as getTimelineAC,
  updateTimelineItem as updateTimelineItemAC } from '../../actions/';

class Timeline extends React.Component {
  componentDidMount() {
    this.props.getTimeline();
  }

  render() {
    const { session, handleSubmit, timeline } = this.props;
    return (
      <div className="user">
        { session.isLogged ?
           (timeline ? timeline.map((el, index) =>
             (<TimelineItem
               {...el}
               handleSubmit={handleSubmit}
               key={index}
             />)) : <Loader />)
             :

             <GuestMenu />
          }
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
