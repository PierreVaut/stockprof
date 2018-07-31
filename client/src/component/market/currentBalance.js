import React from 'react';
import { connect } from 'react-redux';
import { getPrices } from '../../actions';

const Balance = ({ balance, account }) => (
  <span>
    {balance && account && balance >= 0 ?
      <span style={{ color: 'green' }}>{`+${balance - 5000 + account.cashAvailable}` + '$'}</span>
            :
      <span style={{ color: 'red' }}>{`${balance - 5000 + account.cashAvailable}` + '$'}</span>
            }
  </span>
);

const mapStateToProps = state => state.dataReducer;

const mapDispatchToProps = dispatch => ({
  fetchPrices: () => dispatch(getPrices()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);

