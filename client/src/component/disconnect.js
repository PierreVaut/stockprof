import React from 'react';

const handleSubmit = (e, props) => {
    let body = {  }
    console.log( '[HandleSubmit] Disconnect:', body );
    props.onSubmit(body, '/disconnect')
    e.preventDefault();
}

const Disconnect = (props) => {
    return(
        <div>
        <h2>Disconnect</h2>
        <form onSubmit={e => handleSubmit(e, props)}>
            <button type='submit'>Disconnect</button>
        </form>
        </div>
    )
}

export default Disconnect