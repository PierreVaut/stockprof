import React from 'react';
import { NavLink } from 'react-router-dom';

const DoSomething = () =>
  (
    <div className="list-item">
      <div style={{ 'text-align': 'center' }}>
        <span role="img" aria-label="sad-emoji">😢</span><br />
      la Timeline est vide car vous ne suivez personne pour le moment...<br />
        <NavLink to="/userlist">Suivez d'autres utilisateurs</NavLink>
        <span role="img" aria-label="happy-emoji">😁</span>
      </div>

    </div>
  );

export default DoSomething;
