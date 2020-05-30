import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import Currency from './currency';
import Balance from './balance';
import { GuestMenu, Loader } from '../common';

const Market = ({session, account, prices}) => {
  const { isLogged } = session;
  const { cashAvailable } = account;
  return (
    <div className="list-item-center">
      {isLogged && (
      <Fragment>
        <h2>Market</h2>
        <p>Cash disponible: {Math.round(cashAvailable) }$ </p>
        <p>Plus/moins-values: <Balance account={account} /></p><br />
      </Fragment>
      )}

      {prices.map(el => {
                   if (el.symbol1 === 'TEST') {
                       return <Loader key={el.symbol1} />;
                   }
                       return <Currency {...el} account={account} key={el.symbol1} isLogged={isLogged} />;
            })}
    </div>
  )
};

const mapStateToProps = state => state.dataReducer;

export default connect(mapStateToProps)(Market);
