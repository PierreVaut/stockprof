import React from 'react';
import { connect } from 'react-redux';

const Balance = props => {
  const { cashAvailable, position } = props.account;
  const { prices } = props;
  let profit = Math.round(cashAvailable - 5000);
  for (const el in position) {
    if (prices) {
      prices.forEach(price => {
        if (price.symbol1 === el) {
          profit += Math.round(position[el] * price.price);
        }
      });
    }
  }

  return (
    <span>
      {profit >= 0 ?
        <span style={{ color: 'green' }}>{`+${profit}` + '$'}</span>
            :
        <span style={{ color: 'red' }}>{`${profit}` + '$'}</span>
            }
    </span>
  );
};
const mapStateToProps = state => ({
  prices: state.dataReducer.prices,
});

export default connect(mapStateToProps)(Balance);

