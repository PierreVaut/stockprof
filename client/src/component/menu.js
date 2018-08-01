import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ErrorHandler, GuestMenu } from './common';
import { receiveUserList, receivePrices, getPrices } from '../actions/';
import { CurrentBalance } from './market';


const Menu = ({
  account, session, error, fetchPrices, prices,
}) => {
  if (!prices) { fetchPrices(); }
  const isAdmin = account.name === 'admin' && account.email === 'admin';

  return (
    <div className="menu" >
      {isAdmin ? (
        <div>
          <h2>&#9937; ADMIN MODE &#9937;</h2>
          <div className="menu-entry"><NavLink to="/userlist"> Liste des utilisateurs </NavLink></div>
          <br />

          <div className="menu-entry"><NavLink to="/timeline"> Timeline</NavLink></div>
          <br />
        </div>
      ) :
        <div>
          <h2>Bienvenue {account && account.name ? account.name : 'Guest' } !</h2>
          {session && session.isLogged ?
            (
              <div>
                <div>Cash disponible: {account.cashAvailable || 0} $</div>
                <div>Plus/moins-values: <CurrentBalance /></div>
                <br />
                <br />
                <p>Acheter et vendre des Monnaies virtuelles</p>
                <div className="menu-entry"><span role="img" aria-label="market">🏦 </span>
                  <NavLink className="normal-link" to="/market">Market Place</NavLink>
                </div>
                <br />
                <p>Votre flux d&#8217;information</p>
                <div className="menu-entry"><span role="img" aria-label="timeline">🕗 </span>
                  <NavLink className="normal-link" to="/timeline">Timeline</NavLink>
                </div>
                <br />
                <p>Voir les autres utilisateurs</p>
                <div className="menu-entry"><span role="img" aria-label="userlist">🏆</span>
                  <NavLink className="normal-link" to="/userlist"> Liste </NavLink>
                </div>
                <br />
                <p>Votre compte</p>
                <div className="menu-entry"><span role="img" aria-label="dashboard">💹 </span>
                  <NavLink className="normal-link" to="/dashboard"> Dashboard</NavLink>
                </div>
                <br />
                <p>Messagerie instantanée</p>
                <div className="menu-entry"><span role="img" aria-label="chat">📲 </span>
                  <NavLink className="normal-link" to="/chat/sessions"> Chat</NavLink>
                </div>
                <br />
              </div>)

            :
              <GuestMenu />
      }
        </div>

      }

      <br />
      {isAdmin ? null :
      <div>
        <div className="menu-entry"><NavLink className="normal-link"to="/about">A propos</NavLink></div>
        <div className="menu-entry"><NavLink className="normal-link"to="/contact">Contact</NavLink></div>
      </div>
      }
      {session && session.isLogged ?
        <div className="menu-entry"><NavLink className="normal-link" to="/disconnect">Déconnexion</NavLink></div> :
                    ''}
      {error ? <ErrorHandler errorMsg={error} /> : ''}
    </div>
  );
};
const mapStateToProps = state => state.dataReducer;

const mapDispatchToProps = dispatch => ({

  updatePrice: (prices) => {
    dispatch(receivePrices(prices));
  },

  updateUserList: (list) => {
    dispatch(receiveUserList(list));
  },

  fetchPrices: () => dispatch(getPrices()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
