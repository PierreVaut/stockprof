import React from 'react'


const User = (props) => {
    <div>
    {props.name}

    <div 
    className='user-connect-light'
    style = {props.isLogged?
        {color: 'green'}:{color:'gray'}
    }
    >
    </div>

    </div>
}

export default User