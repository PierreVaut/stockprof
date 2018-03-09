import React from 'react'
import { connect } from 'react-redux'


// Top-security component^^
const Admin = (props) =>  {
    if( props.dataReducer.account.name  === 'admin'
        && props.dataReducer.account.email === 'admin'
        ){
            return (
                <p>Data: {JSON.stringify(props)}</p>
            )
        }
    else {
        return <p>Sorry {(props.dataReducer.account.name)?props.dataReducer.account.name:'Guest'}, you cannot see this page</p>
    }
}              
const mapStateToProps = state => state

export default connect(mapStateToProps)(Admin);