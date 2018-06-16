import React from 'react';
import { NavLink } from 'react-router-dom';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { TimelineItem } from './timelineItem';
import {
  receiveTimeline as receiveTimelineAC,
  editTimelineItem as editTimelineItemAC } from '../../actions/';


const socket = openSocket();

class Timeline extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    socket.on('timeline', data => {
      console.log('[RECEIVE TIMELINE]', data);
      this.props.receiveTimeline(data);
    });
    socket.emit('timeline', 'salut!');
  }


  render() {
    const { session, handleSubmit, timeline } = this.props;
    return (
      <div className="user">
        { session.isLogged ?
           (timeline.map(el =>
             <TimelineItem {...el} handleSubmit={handleSubmit} />))
             :
            (
              <div>
                <p>Ce jeu vous permet d&#8217;acheter et de vendre des monaies virtuelles en temps réel<br /> et de comparer votre score à celui des autres utilisateurs</p>
                <p><span role="img" aria-label="diverse">💵💹💁</span></p>
                <br /><br /><br />
                <p>Connectez-vous</p>
                <div className="menu-entry"><span role="img" aria-label="connection">🛂</span><NavLink to="/login">Login </NavLink></div><br />
                <p>Créez un compte</p>
                <div className="menu-entry"><span role="img" aria-label="register">😀</span><NavLink to="/register">Register</NavLink></div><br />
              </div>)
          }
      </div>
    );
  }
}

const mapStateToProps = state => state.dataReducer;

const mapDispatchToProps = dispatch => ({
  receiveTimeline: data => dispatch(receiveTimelineAC(data)),
  handleSubmit: (payload, id) => dispatch(editTimelineItemAC(payload, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
