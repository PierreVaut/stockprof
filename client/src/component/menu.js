import React from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { NavLink } from 'react-router-dom';
import { ErrorHandler, GuestMenu } from './common';
import { receiveUserList, receivePrices } from '../actions/';
import { Balance } from './market';

const socket = openSocket();


class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.subscribeToListUpdates(list => {
      this.props.updateUserList(list);
    });

    this.subscribeToPriceUpdates(price => {
      this.props.updatePrice(price);
    });
  }


  subscribeToListUpdates(cb) {
    socket.on('userList', list => cb(list));
    console.log('[subscribeToListUpdates] ');
    socket.emit('subscribeToListUpdates', 'hello');
  }

  subscribeToPriceUpdates(cb) {
    socket.on('btc', data => {
      if (!this.props.priceListInitialized) {
        console.log('[React] socket.io BTC:', data);
        cb(data);
      }
    });
    socket.emit('btc-initial', 'hello');
    const { _id } = this.props.account;
    if (_id) {
      console.log('Emit notification', _id);
      socket.emit('notification', _id);
    }
  }

  render() {
    const { account, session, error } = this.props;
    const { name, cashAvailable } = this.props.account;
    return (
      <div className="menu" >
        <h2>Bienvenue {account && name ? name : 'Guest' } !</h2>

        {session && session.isLogged ?
            (
              <div>
                <div>Cash disponible: {cashAvailable} $</div>
                <div>Plus/moins-values: <Balance account={account} /></div>
                <br />
                <br />
                <p>Acheter et vendre des Monnaies virtuelles</p>
                <div className="menu-entry"><span role="img" aria-label="market">🏦 </span><NavLink to="/market">Market Place</NavLink></div>
                <br />
                <p>Votre flux d&#8217;information</p>
                <div className="menu-entry"><span role="img" aria-label="timeline">🕗 </span><NavLink to="/timeline">Timeline</NavLink></div>
                <br />
                <p>Voir les autres utilisateurs</p>
                <div className="menu-entry"><span role="img" aria-label="userlist">🏆</span><NavLink to="/userlist"> Liste </NavLink></div>
                <br />
                <p>Votre compte</p>
                <div className="menu-entry"><span role="img" aria-label="dashboard">💹 </span><NavLink to="/dashboard"> Dashboard</NavLink></div>
                <br />
              </div>)

            :
              <GuestMenu />
            }
        <br />
        <div className="menu-entry"><NavLink to="/about">A propos</NavLink></div>
        <div className="menu-entry"><NavLink to="/contact">Contact</NavLink></div>
        {session && session.isLogged ?
          <div className="menu-entry"><NavLink to="/disconnect">Déconnexion</NavLink></div> :
                    ''}
        {error ? <ErrorHandler errorMsg={error} /> : ''}
      </div>
    );
  }
}

const mapStateToProps = state => state.dataReducer;

function mapDispatchToProps(dispatch) {
  return {

    updatePrice: (prices) => {
      dispatch(receivePrices(prices));
    },

    updateUserList: (list) => {
      dispatch(receiveUserList(list));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);

