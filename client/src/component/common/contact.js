import React from 'react';
import NavLink from 'react-router-dom/NavLink';

const Contact = () => (
  <div>
    <h2>Contact</h2>
    <a href="/">p.vautherin@hotmail.com</a><br />
    <a href="https://www.linkedin.com/in/pierrevautherin/" >linkedin</a><br />
    <a href="https://github.com/Carburator11/stockprof">github</a>
    <br /><br />
   © 2018 Pierre Vautherin
   <br /><br />
    <NavLink to="/about">Disclaimer</NavLink>
  </div>
);

export default Contact;

