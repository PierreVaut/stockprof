import React from 'react';
import openSocket from 'socket.io-client';
import { receiveUserList } from '../actions/'
import { connect } from 'react-redux'
const socket = openSocket();


class Users extends React.Component {
    constructor(props) {
        super(props);
        this.timer;
        this.getUserList = this.getUserList.bind(this);
    }

    getUserList(props){
        console.log('[getUserList]', this.props);
        socket.emit('userList')
        socket.on('userList', 
            list => {
                this.props.update(list);
                console.log('[Users] update list', list);
            } 
        )
    }

    componentDidMount(){
        this.timer = setTimeout(
           this.getUserList 
        , 1000 )
    }

    componentWillMount(){
        clearTimeout(this.timer)
    }

    render(){
        return(
            <div>
            <p>props : {JSON.stringify(this.props)}</p>
            <br/><br/>
            <p>dataReducer : {JSON.stringify(this.props.dataReducer)}</p>
            <br/>
            <p>userList : {JSON.stringify(this.props.dataReducer.userList)}</p>      
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
)(Users);