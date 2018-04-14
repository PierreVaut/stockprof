import React from 'react';

import { connect } from 'react-redux'
import User from './user'

let keyCount = 0;

const UserList = props => 
    (<div>
        <div>
        </div>
        
        <input type= 'checkbox'></input>Afficher uniquement les amis
        <br/><br/>
        {props.userList.map(
            el => {
                keyCount++;
                return <User {...el} key= {keyCount}/>
            })}
    </div>)


const mapStateToProps = state => state.dataReducer


export default connect( mapStateToProps)(UserList);