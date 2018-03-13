import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ErrorHandler } from '../component/error'
import openSocket from 'socket.io-client';
import { receiveUserList } from '../actions/'
import { receivePrices } from '../actions/'
const socket = openSocket();


class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.subscribeToListUpdates(list => {
            this.props.updateUserList(list);
            console.log('[Users] update list', list)}
        )
        
        this.subscribeToPriceUpdates( price => {
            this.props.updatePrice(price)
            console.log('[Users] update price', price)}
        )

    }

    subscribeToListUpdates(cb) {
        socket.on('userList', list => cb(list));
        console.log('[subscribeToListUpdates] ');
        socket.emit('subscribeToListUpdates', 'hello');
    }


    subscribeToPriceUpdates(cb) {

        socket.on('btc',  data => {
            if(!this.props.priceListInitialized){
                console.log('[React] socket.io BTC:', data)
                cb(data)
            }
        })
        socket.emit('btc-initial', 'hello')
    }


    render(){
        return(
        <div className = 'menu' >
            <h2>Menu</h2>
            <div className = 'menu-entry'><NavLink to="/play">Start !</NavLink></div>
            <div className = 'menu-entry'><NavLink to="/dashboard">Dashboard</NavLink></div>
            <div className = 'menu-entry'><NavLink to="/market">Market</NavLink></div>
            <div className = 'menu-entry'><NavLink to="/login">Login </NavLink></div>
            <div className = 'menu-entry'>
                {this.props.dataReducer.session.isLogged?
                    <NavLink to="/disconnect">Disconnect</NavLink>:
                    <NavLink to="/register">Register</NavLink>}
            </div>
            <div className = 'menu-entry'><NavLink to="/about">About</NavLink></div>
            <div className = 'menu-entry'><NavLink to="/contact">Contact</NavLink></div>
            {
                (this.props.dataReducer.error)?
                    <ErrorHandler errorMsg = {this.props.dataReducer.error} />:''
            }
        </div>
    )}
}

const mapStateToProps = state => state

function mapDispatchToProps(dispatch) {

    return { 

        updatePrice: (prices) => { 
            console.log('[Users] Dispatch updated price', prices)
            dispatch( receivePrices(prices) )
        },

        updateUserList: (list) => { 
            console.log('[Users] Dispatch updated list')
            dispatch( receiveUserList(list) ) },
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Menu);

