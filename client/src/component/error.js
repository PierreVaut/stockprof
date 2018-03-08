import React from 'react';

export const ErrorHandler = (errorMsg) => (
    <div className = 'errorHandler'>
    <h2>Error...</h2>
    <p>We couldn't log or register due to the error below :</p>
    <p style = {{color: 'red'}}>{JSON.stringify(errorMsg)}</p>
    <p>Please try again...</p>
    </div>
)