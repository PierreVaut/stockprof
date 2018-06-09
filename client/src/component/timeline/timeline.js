import React from 'react';
import { NavLink } from 'react-router-dom';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { TimelineItem } from './timelineItem';


const socket = openSocket();

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
    };

    this.getArray(stuff => this.setState({ response: stuff }));
  }

  componentDidMount() {
    socket.on('timeline', stuff => {
      console.log({ stuff });
      this.setState({ response: stuff });
    });
    socket.emit('timeline', 'salut!');
  }

  getArray(cb) {
    console.log('getArray !');
    socket.on('timeline', stuff => cb(stuff));
  }

  render() {
    return (
      <div className="user">
        { this.props.session.isLogged ?
           (this.state.response.map(el =>
             <TimelineItem {...el} />))
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

export default connect(mapStateToProps)(Timeline);
