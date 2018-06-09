import React from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ErrorHandler } from './error';
import { receiveUserList, receivePrices } from '../actions/';
import Balance from './balance';

const socket = openSocket();


class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.subscribeToListUpdates(list => {
      this.props.updateUserList(list);
      console.log('[Users] update list', list);
    });

    this.subscribeToPriceUpdates(price => {
      this.props.updatePrice(price);
      console.log('[Users] update price', price);
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
  }


  render() {
    const { name, cashAvailable } = this.props.dataReducer.account;
    return (
      <div className="menu" >
        <h2>Bienvenue {name} !</h2>

        {this.props.dataReducer.session.isLogged ?
            (
              <div>
                <div>Cash disponible: {cashAvailable} $</div>
                <div>Plus/moins-values: <Balance account={this.props.dataReducer.account} /></div>
                <br />
                <br />
                <p>Acheter et vendre des Monnaies virtuelles</p>
                <div className="menu-entry"><span role="img" aria-label="market">🏦 </span><NavLink to="/market">Market Place</NavLink></div>
                <br />
                <p>Votre flux d&#8217;information</p>
                <div className="menu-entry"><span role="img" aria-label="timeline">🕗 </span><NavLink to="/timeline">Timeline</NavLink></div>
                <br />
                <p>Voir les autres utilisateurs</p>
                <div className="menu-entry"><span role="img" aria-label="scores">🏆</span><NavLink to="/play"> Scores </NavLink></div>
                <br />
                <p>Votre compte</p>
                <div className="menu-entry"><span role="img" aria-label="dashboard">💹 </span><NavLink to="/dashboard"> Dashboard</NavLink></div>
                <br />
              </div>)

            :
            (
              <div>
                <p>Ce jeu vous permet d&#8217;acheter et de vendre des monaies virtuelles en temps réel<br /> et de comparer votre score à celui des autres utilisateurs</p>
                <p><span role="img" aria-label="diverse">💵💹💁</span></p>
                <br /><br /><br />
                <p>Connectez-vous</p>
                <div className="menu-entry"><span role="img" aria-label="connection">🛂</span><NavLink to="/login">Login </NavLink></div><br />
                <p>Créez un compte</p>
                <div className="menu-entry"><span role="img" aria-label="register">😀</span><NavLink to="/register">Register</NavLink></div><br />
              </div>)
            }
        <br />

        <div className="menu-entry"><NavLink to="/about">A propos</NavLink></div>
        <div className="menu-entry"><NavLink to="/contact">Contact</NavLink></div>
        {this.props.dataReducer.session.isLogged ?
          <div className="menu-entry"><NavLink to="/disconnect">Déconnexion</NavLink></div> :
                    ''}
        {
                (this.props.dataReducer.error) ?
                  <ErrorHandler errorMsg={this.props.dataReducer.error} /> : ''
            }
      </div>
    );
  }
}

const mapStateToProps = state => state;

function mapDispatchToProps(dispatch) {
  return {

    updatePrice: (prices) => {
      console.log('[Users] Dispatch updated price', prices);
      dispatch(receivePrices(prices));
    },

    updateUserList: (list) => {
      console.log('[Users] Dispatch updated list');
      dispatch(receiveUserList(list));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);

