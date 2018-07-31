import React from 'react';
import { NavLink } from 'react-router-dom';

const DoSomething = () =>
  (
    <div className="list-item">
      <div style={{ 'text-align': 'center' }}>
        <span role="img" aria-label="sad-emoji">😢</span><br />
      Votre historique de messagerie instantanée est vide<br />car vous n'avez pas débuté de conversation<br /><br />
        <NavLink to="/userlist">Contactez d'autres utilisateurs</NavLink><br /><br />
        <span role="img" aria-label="happy-emoji">Ne soyez pas timide ! 😁😁😁</span>
      </div>

    </div>
  );

export default DoSomething;
