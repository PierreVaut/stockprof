import React from 'react';

export const ErrorHandler = (props) => (
    <div className = 'errorHandler'>
    <h2>Erreur...</h2>
    <p>Nous n'avons pas pu vous connecter poru la rison suivante :</p>
    <p style = {{color: 'red'}}>{JSON.stringify(props.errorMsg)}</p>
    <p>Merci de réessayer</p>
    </div>
)