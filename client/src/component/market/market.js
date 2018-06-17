import React from 'react';
import { connect } from 'react-redux';
import Currency from './currency';
import Balance from './balance';
import { GuestMenu, Loader } from '../common';

const Market = props => {
  const { isLogged } = props.session;
  const { cashAvailable } = props.account;
  return isLogged ? (
    <div className="market">
      <h2>Market</h2>
      <p>Cash disponible: {Math.round(cashAvailable) }$ </p>
      <p>Plus/moins-values: <Balance account={props.account} /></p><br />

      {props.prices.map(el => {
                   if (el.symbol1 === 'TEST') {
                       return <Loader key={el.symbol1} />;
                   }
                       return <Currency {...el} account={props.account} key={el.symbol1} />;
            })}
    </div>
  ) :
    (<GuestMenu />);
};

const mapStateToProps = state => state.dataReducer;

export default connect(mapStateToProps)(Market);
