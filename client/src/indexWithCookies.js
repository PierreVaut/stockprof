import React from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { receiveUserList, receivePrices } from './actions/';
import App from './App';

const socket = openSocket();
const domain = 'stockprof-carb11.herokuapp.com';

class IndexWithCookies extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  }

  constructor(props) {
    super(props);

    this.subscribeToPriceUpdates(price => this.props.updatePrice(price));

    this.subscribeToListUpdates(list => this.props.updateUserList(list));

    this.state = { _id: undefined };
  }

  componentWillMount() {
    const { cookies } = this.props;

    if (!cookies.get(domain)) {
      const rdm = Math.floor(Math.random() * 99999942);
      cookies.set(domain, rdm, { path: '/' });
    }
    console.log('[React-cookies]', cookies.get(domain));
  }

  componentWillReceiveProps() {
    if (this.props.dataReducer
        && this.props.dataReducer.account
        && this.props.dataReducer.account._id
        && this.props.dataReducer.account._id !== this.state._id
    ) {
      console.log('[Users] notifs', this.props.dataReducer.account._id);
      this.setState({ _id: this.props.dataReducer.account._id });
      socket.on(`notif_${this.props.dataReducer.account._id}`, data => console.log('RESPONSE:', data));
      socket.emit('notification', `notif_${this.props.dataReducer.account._id}`);
    }
  }

  subscribeToListUpdates(cb) {
    console.log('[subscribeToListUpdates] ');
    socket.on('userList', list => cb(list));
    socket.emit('subscribeToListUpdates', 'hello');
  }


  subscribeToPriceUpdates(cb) {
    console.log('[subscribeToPriceUpdates]');

    socket.on('btc', data => {
      if (!this.props.priceListInitialized) {
        cb(data);
      }
    });
    socket.emit('btc-initial', 'hello');
  }

  render() { return <App />; }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  updatePrice: prices => dispatch(receivePrices(prices)),
  updateUserList: list => dispatch(receiveUserList(list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(IndexWithCookies));

