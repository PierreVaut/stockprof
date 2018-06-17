
import { NavLink } from 'react-router-dom';
import React from 'react';


const GuestMenu = () => (
  <div>
    <p>Ce Réseau social regroupe les amateurs de Crypto-monnaies <span role="img" aria-label="crypto-currencies">💵</span><br />
    Retrouvez vos amis et échangez en direct <span role="img" aria-label="social">💁</span><br />
    Constituez un portefeuille virtuel et comparez votre score en temps réel <span role="img" aria-label="real time">💹</span>
    </p>
    <br />
    <p>Connectez-vous</p>
    <div className="menu-entry"><span role="img" aria-label="connection">🛂</span><NavLink to="/login">Login </NavLink></div><br />
    <p>Créez un compte</p>
    <div className="menu-entry"><span role="img" aria-label="register">😀</span><NavLink to="/register">Register</NavLink></div><br />
  </div>);

export default GuestMenu;

