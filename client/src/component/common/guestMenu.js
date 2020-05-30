
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Market } from '../market/';



const GuestMenu = () => (
  <div>
    <p>Bienvenue sur notre plateforme de trading virtuel<span role="img" aria-label="crypto-currencies">💵</span><br />
    Constituez un portefeuille de Crypto-monnaies (Bitcoin, Ethereum, Ripple...) <span role="img" aria-label="real time">💹</span><br />
    Suivez des amis dans votre timeline et échangez en direct <span role="img" aria-label="social">💁</span><br />
    </p>
    <Market/>
    <br />
    <p>Connectez-vous</p>
    <div className="menu-entry"><span role="img" aria-label="connection">🛂</span><NavLink to="/login">Login </NavLink></div><br />
    <p>Créez un compte</p>
    <div className="menu-entry"><span role="img" aria-label="register">😀</span><NavLink to="/register">Register</NavLink></div><br />
  </div>);

export default GuestMenu;

