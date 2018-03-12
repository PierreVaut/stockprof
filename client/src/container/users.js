import React from 'react';
import openSocket from 'socket.io-client';
import { receiveUserList } from '../actions/'
import { connect } from 'react-redux'
import User from './user'
const socket = openSocket();


class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.subscribeToListUpdates(list => {
            this.setState({'userList': list});
            console.log('[Users] update list', list)}
        )
        this.state = {userList: [{name: 'no data yet...'}]}
    }
    
    subscribeToListUpdates(cb) {
        socket.on('userList', list => cb(list));
        console.log('[subscribeToListUpdates] ', 1000);
        socket.emit('subscribeToListUpdates', 1000);
    }




    render(){
        return(
            <div>
            {this.state.userList.map(
                el => <div>{el.name}</div>
            )}
            </div>
        )
    }


}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch) {
    return { 
        update: (list) => { 
            console.log('[Users] Dispatch updated list')
            dispatch( receiveUserList(list) ) },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);