import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestBody, resetRequestBody, apiPost } from '../../actions/';

const Register = props => (
  <div className="login">
    <h2>Création de compte</h2>
    <form>
      <label>Email<br />
        <input
          name="email"
          value={props.dataReducer.requestBody.email}
          onChange={e => { props.onChange('email', e.target.value); }}
        /><br />
      </label><br />

      <label>Nom<br />
        <input
          name="name"
          value={props.dataReducer.requestBody.name}
          onChange={e => { props.onChange('name', e.target.value); }}
        /><br />
      </label><br />

      <label>Mot de passe<br />
        <input
          name="password"
          value={props.dataReducer.requestBody.pwd}
          onChange={e => { props.onChange('pwd', e.target.value); }}
        /><br />
      </label><br />
    </form>

    <NavLink
      to="/"
      onClick={
        () => {
              const body = {
                  email: props.dataReducer.requestBody.email,
                  password: props.dataReducer.requestBody.pwd,
                  name: props.dataReducer.requestBody.name,
              };
              props.onSubmit(body, '/register');
              props.reset();
              console.log('[Register]', body);
          }
     }
    >
                Register
    </NavLink>
  </div>
);

const mapStateToProps = (state) => state;

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
)(Register);

