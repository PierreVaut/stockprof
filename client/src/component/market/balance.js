import React from 'react';
import { connect } from 'react-redux';
import { getPrices } from '../../actions';
import { balance } from '../../config/balance';

const Balance = ({ prices, userAccount }) => {
  const profit = balance(prices, userAccount.position) - 5000 + userAccount.cashAvailable;
  return (
    <span>
      {profit && profit >= 0 ?
        <span style={{ color: 'green' }}>{`+${profit}` + '$'}</span>
            :
        <span style={{ color: 'red' }}>{`${profit}` + '$'}</span>
            }
    </span>
  );
};

const mapStateToProps = state => state.dataReducer;

const mapDispatchToProps = dispatch => ({
  fetchPrices: () => dispatch(getPrices()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);

