import React from 'react'
import { connect } from 'react-redux'


// Top-security component^^
const Admin = (props) =>  {
    if( 
        (
        props.dataReducer.account.name  === 'admin'
        && props.dataReducer.account.email === 'admin'
        )||
        (
        props.dataReducer.account.name  === '00'
        && props.dataReducer.account.email === '00'
        )
    ){
            return (
                <div className = 'admin'>
                <p>Data: {JSON.stringify(props)}</p>
                <button>Disconnect every user!</button>
                </div>
            )
        }
    else {
        return <p>Sorry {(props.dataReducer.account.name)?props.dataReducer.account.name:'Guest'}, you cannot see this page</p>
    }
}              
const mapStateToProps = state => state

export default connect(mapStateToProps)(Admin);