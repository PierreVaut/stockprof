import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { apiPost } from '../actions/'

const mapDispatchToProps = dispatch => {
    return { disconnect: () => { dispatch( apiPost({}, '/disconnect') ) } }
}

const Disconnect = connect(null, mapDispatchToProps)(
    props => (
        <div>
            <h2>Are you sure to Disconnect ?</h2>
            <NavLink
                to = '/'
                onClick = {
                    function(){
                        props.disconnect();
                        console.log('[Disconnecting]');
                    }
                }
            >
            yes, disconnect
            </NavLink> 
        </div>
    )
)


export default Disconnect