import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { apiPost, resetRequestBody } from '../actions/';

const mapDispatchToProps = dispatch => ({
  disconnect: () => { dispatch(apiPost({}, '/disconnect')); },
  reset: () => { dispatch(resetRequestBody()); },
});

const Disconnect = connect(null, mapDispatchToProps)(props => (
  <div>
    <h2>Êtes-vous sûr de vous déconnecter ?</h2>
    <NavLink
      to="/"
      onClick={
        () => {
            props.disconnect();
            console.log('[Disconnecting]');
            props.reset();
        }
      }
    >
    Oui, déconnexion
    </NavLink>
  </div>
));


export default Disconnect;
