
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestBody, resetRequestBody, apiPost } from '../../actions/';

const Login = props => (
  <div className="login">
    <h2>Connexion</h2>
    <form>
      <label>Email<br />
        <input
          name="email"
          value={props.data.dataReducer.requestBody.email}
          onChange={e => { props.onChange('email', e.target.value); }}
        /><br />
      </label><br />
      <label>Mot de passe<br />
        <input
          name="password"
          value={props.data.dataReducer.requestBody.pwd}
          onChange={e => { props.onChange('pwd', e.target.value); }}
        /><br />
      </label><br />
    </form>

    <NavLink
      to="/"
      onClick={() => {
        const body = {
            email: props.data.dataReducer.requestBody.email,
            password: props.data.dataReducer.requestBody.pwd,
        };
        props.onSubmit(body, '/login');
        props.reset();
        console.log('[Login]', body);
    }
}
    >
    Login
    </NavLink><br /><br />
    <NavLink to="/reset">Mot de passe oublié ?</NavLink>

  </div>
);

function mapStateToProps(state) {
  return { data: state };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: (field, content) => { dispatch(requestBody(field, content)); },
    onSubmit: (body, url) => { dispatch(apiPost(body, url)); },
    reset: () => { dispatch(resetRequestBody()); },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

