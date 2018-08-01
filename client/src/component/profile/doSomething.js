import React from 'react';
import { NavLink } from 'react-router-dom';

const DoSomethingFriendList = () =>
  (
    <div className="list-item">
      <div style={{ 'text-align': 'center' }}>
        <span role="img" aria-label="sad-emoji">😢</span>Vous ne suivez personne pour le moment...<br />
        <NavLink to="/userlist">Aller sur la liste des utilisateurs</NavLink><br />
      </div>

    </div>
  );

export default DoSomethingFriendList;
