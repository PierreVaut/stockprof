import React from 'react';

import { connect } from 'react-redux'
import User from './user'

let keyCount = 0;

const UserList = props => 
    (<div>
        <div>
        Sort by:
        <select>
            <option>Highest Profit</option>
            <option>Activity</option>
            <option>Lowest Profit</option>
        </select>
        </div>
        
        <input type= 'checkbox'></input>   Friends only
        
        {props.userList.map(
            el => {
                keyCount++;
                return <User {...el} key= {keyCount}/>
            })}
    </div>)


const mapStateToProps = state => state.dataReducer


export default connect( mapStateToProps)(UserList);