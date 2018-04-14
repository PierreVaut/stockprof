import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { apiPost, resetRequestBody } from '../actions/'

const mapDispatchToProps = dispatch => {
    return { 
        disconnect: () => { dispatch( apiPost({}, '/disconnect') ) }, 
        reset: () => { dispatch( resetRequestBody() ) }
    }
}

const Disconnect = connect(null, mapDispatchToProps)(
    props => (
        <div>
            <h2>Êtes-vous sûr de vous déconnectier</h2>
            <NavLink
                to = '/'
                onClick = {
                    function(){
                        props.disconnect();
                        console.log('[Disconnecting]');
                        props.reset();
                    }
                }
            >
            Oui, déconnexion
            </NavLink> 
        </div>
    )
)


export default Disconnect