import App from './App';
import React from 'react';
import { connect }  from 'react-redux';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { receiveUserList } from './actions/'
import { receivePrices } from './actions/'
import openSocket from 'socket.io-client';
const socket = openSocket();
const domain = 'stockprof-carb11.herokuapp.com';

class IndexWithCookies extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

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

    componentWillMount() {
        const { cookies } = this.props;

        // setting cookie
        if(!cookies.get(domain)){
            let rdm = Math.floor(Math.random() * 99999942 );
            cookies.set(domain, rdm, { path: '/' });
        }
        console.log('[React-cookies]', cookies.get(domain));
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

    render() {return <App />}
}

const mapStateToProps = state => state

function mapDispatchToProps(dispatch) {

    return { 

        updatePrice: (prices) => { 
            // console.log('[Users] Dispatch updated price', prices)
            dispatch( receivePrices(prices) )
        },

        updateUserList: (list) => { 
            // console.log('[Users] Dispatch updated list')
            dispatch( receiveUserList(list) ) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(IndexWithCookies))