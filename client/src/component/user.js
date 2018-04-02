import React from 'react'
import { colors } from '../config/color'
import Balance from './balance';


const User = (props) => {

    let initial = props.name.substr(0,1);
    // Has been Logged in the past 3 hours.
    let hasbeenLoggedRecently = props.isLogged && ( new Date() - new Date(props.lastLogin)  ) < ( 1000 * 60 * 180 ) ;

    return (
    <div className='user'>
        <div 
        className='user-avatar'
        style = {{ backgroundColor: colors[(initial.charCodeAt(0) ) % colors.length]  }}
        >
        {initial.toUpperCase()}</div>
        <div 
        className='user-connect-light'
        style = {hasbeenLoggedRecently?
            {backgroundColor: 'green'}:{backgroundColor:'gray'}
        }
        >
        </div>
        
        <div className = 'user-name'>{props.name}
            <div>Balance: <Balance account={props} /></div>
        </div>
    </div>
)}

export default User