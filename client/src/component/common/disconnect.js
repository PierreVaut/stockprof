import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { apiPost, resetRequestBody } from '../../actions/';
import { GuestMenu } from '.';

const mapDispatchToProps = dispatch => ({
  disconnect: () => { dispatch(apiPost({}, '/disconnect')); },
  reset: () => { dispatch(resetRequestBody()); },
});

const mapStateToProps = state => state.dataReducer;

const Disconnect = props =>
  (
    props.account && props.account.isLogged ? (


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
    ) : <GuestMenu />
  );


export default connect(mapStateToProps, mapDispatchToProps)(Disconnect);
