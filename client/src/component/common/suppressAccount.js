
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  requestBody,
  resetRequestBody,
  suppressAccountUser,
  apiPost,
} from '../../actions/';

const SuppressAccount = props => (
  <div className="login">
    <h2>Suppression de compte</h2>
    <div>Votre nom: {props.account.name}</div>
    <div>Votre Id: {props.account._id}</div>
    <p>Veuillez saisir votre mot de passe et confirmer</p>
    <form>
      <input
        name="password"
        value={props.requestBody && props.requestBody.pwd ? props.requestBody.pwd : ''}
        onChange={e => { props.onChange('pwd', e.target.value); }}
      /><br />
      <br />
    </form>

    <NavLink
      to="/"
      onClick={e => {
        const body = { password: props.requestBody.pwd || '' };
        if (body.password && body.password.length > 0) {
          props.disconnect();
          props.onSubmit(body.password, props.account._id);
          props.reset();
          console.log('[Delete Account]', body);
        } else {
          e.preventDefault();
        }
    }
}
    >
    Confirm
    </NavLink><br /><br />
    <NavLink
      to="/dashboard"
      onClick={() => { props.reset(); }}
    >Cancel
    </NavLink>

  </div>
);

const mapStateToProps = state => state.dataReducer;

function mapDispatchToProps(dispatch) {
  return {
    disconnect: () => { dispatch(apiPost({}, '/disconnect')); },
    onChange: (field, content) => { dispatch(requestBody(field, content)); },
    onSubmit: (pwd, id) => { dispatch(suppressAccountUser(pwd, id)); },
    reset: () => { dispatch(resetRequestBody()); },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuppressAccount);

