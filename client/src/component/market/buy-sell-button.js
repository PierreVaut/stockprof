import React from 'react';
import { connect } from 'react-redux';
import { marketOperation } from '../../actions/';


class BuySellButton extends React.Component {
  constructor(props) {
    super(props);
    // local state only
    this.state = { visible: false };
  }


  render() {
    let detainedQty = 0;
    const { position, cashAvailable, _id } = this.props;

    for (const el in position) {
      if (el === this.props.symbol) {
        detainedQty = position[el];
      }
    }
    const { price } = this.props;

    if (this.state.visible) {
      return (
        <div className="buy-sell-div" style={{ border: '3px solid #104f55', borderRadius: 5 }} >
          <div
            onClick={() => { this.setState({ visible: false }); }}
            className="buy-sell-close"
          >X
          </div>
          <button
            disabled={cashAvailable < 1}
            className="buy-sell-btn"
            onClick={() => {
const options = {
  _id,
  operation: 'buy',
  amount: -cashAvailable,
  qty: parseFloat((cashAvailable / price).toFixed(8)),
  symbol: this.props.symbol,
};
this.props.onClick(options);
}
}
          > All in !!! <span role="img" aria-label="buy all">🛒</span>
          </button>
          <button
            disabled={cashAvailable < 500}
            className="buy-sell-btn"
            onClick={() => {
const options = {
_id,
operation: 'buy',
amount: -500,
qty: parseFloat((500 / price).toFixed(8)),
symbol: this.props.symbol,
};
this.props.onClick(options);
}}
          >Buy 500$ <span role="img" aria-label="buy 500">👍</span>
          </button><br />
          <button
            disabled={detainedQty <= 0}
            className="buy-sell-btn"
            onClick={() => {
const options = {
_id,
operation: 'sell',
amount: parseFloat((detainedQty * price).toFixed(8)),
qty: detainedQty,
symbol: this.props.symbol,
};
this.props.onClick(options);
}
}
          >
Sell it all <span role="img" aria-label="sell all">🔥</span>
          </button>
          <button
            disabled={detainedQty * price < 500}
            className="buy-sell-btn"
            onClick={() => {
const options = {
_id,
operation: 'sell',
amount: 500,
qty: parseFloat((500 / price).toFixed(8)),
symbol: this.props.symbol,
};
this.props.onClick(options);
}
}
          >
Sell 500$ <span role="img" aria-label="sell 500">💸</span>
          </button>

        </div>
      );
    }


    return (<div
      className="buy-sell-link"
      onClick={() => { this.setState({ visible: true }); }}
      style={{ cursor: 'pointer' }}
    >transaction
            </div>);
  }
}


const mapDispatchToProps = dispatch => ({
  onClick: (options) => dispatch(marketOperation(options)),
});

const mapStateToProps = state => ({
  position: state.dataReducer.account.position,
  cashAvailable: state.dataReducer.account.cashAvailable,
  _id: state.dataReducer.account._id,
});

export default connect(mapStateToProps, mapDispatchToProps)(BuySellButton);

