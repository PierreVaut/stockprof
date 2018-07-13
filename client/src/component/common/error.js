import React from 'react';

const ErrorHandler = (props) => (
  <div className="errorHandler">
    <h2>Erreur...</h2>
    <p>Nous n'avons pas pu vous connecter pour la raison suivante :</p>
    <p style={{ color: 'red' }}>{JSON.stringify(props.errorMsg)}</p>
    <p>Merci de réessayer</p>
  </div>
);

export default ErrorHandler;

