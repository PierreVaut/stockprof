import React from 'react';
import NavLink from 'react-router-dom/NavLink';


const About = () => (
  <div>
    <h2>A propos</h2>
    <p>DISCLAIMER : cette application est un projet éducatif et ne constitue pas un produit financier.</p>
    <p>Cette application peut être modifiée ou retirée à tout moment. Merci de ne déposer aucune donnée personnelle.</p>
    <p>Les données financières présentées sur ce site n'ont aucun caractère contractuel et sont la propriété de leur ayant-droit CEX.IO.</p><br />
    <NavLink to="/contact">Contact</NavLink>
  </div>);
export default About;

