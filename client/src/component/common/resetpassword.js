import React from 'react';
import { NavLink } from 'react-router-dom';

const resetPassword = () => (
  <div>
    <h2>Mot de passe oublié</h2>
    <label>Email<br />
      <input
        name="email"
      /><br />
    </label><br />
    <NavLink
      to="/"
      onClick={
        () => {
            alert('Mot de passe renvoyé');
        }
      }
    >
    Renvoyer mot de passe
    </NavLink>
  </div>
);


export default resetPassword;
