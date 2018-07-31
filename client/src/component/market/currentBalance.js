import React from 'react';
import { connect } from 'react-redux';
import { getPrices } from '../../actions';

const CurrentBalance = ({ balance, account }) => {
  const profit = balance && account ? (balance - 5000 + account.cashAvailable) : 0;
  return (
    <span>
      {profit && profit >= 0 ?
        <span style={{ color: 'green' }}>{`+${profit}` + '$'}</span>
            :
        <span style={{ color: 'red' }}>{`${profit}` + '$'}</span>
            }
    </span>);
};

const mapStateToProps = state => state.dataReducer;

const mapDispatchToProps = dispatch => ({
  fetchPrices: () => dispatch(getPrices()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBalance);

