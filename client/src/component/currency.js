import React from 'react';
import BuySellButton from './buy-sell-button';
import { connect } from 'react-redux';

/* Keep this component as a Class */
class Currency extends React.Component {
  constructor(props) {
    super(props);
    // local state only
    this.state = { localPrice: 0 };
  }

  // this can be updated when component is rendered
  componentDidMount() {
    this.setState({
      price: this.props.localPrice,
    });
  }


  render() {
    const { position } = this.props.account;
    let detainedQty = 0;
    for (const el in position) {
      if (el === this.props.symbol1) {
        detainedQty = position[el];
      }
    }
    return (
      <div className="currency">
        <div className="currency-name">
          <b>{this.props.symbol1}</b>

          <span
            className="currency-open24-diff"
            style={(this.props.price >= this.props.open24) ? { color: 'green' } : { color: 'red' }}
          >
            {(this.props.price >= this.props.open24) ? '  +' : '  '}
            {Math.round(100 * (this.props.price - this.props.open24) / this.props.open24)}%
          </span>

        </div>

        <div className="currency-price">
          <p>Quantité : {detainedQty } </p>
          <p>Prix de marché: {this.props.price}  $

                    {(this.props.price - this.props.open24 > 0) ?
                        (<span className="currency-diffprice-sign" style={{ color: 'green' }}>  &#9650;</span>) :
                        (<span className="currency-diffprice-sign" style={{ color: 'red' }}>  &#9660;</span>)
                    }
          </p>

        </div>

        <div className="currency-open24">
                    Dernier prix (24h): {this.props.open24}$
        </div>

        <div className="currency-timestamp" >
                    timestamp: {new Date(this.props.timestamp).toLocaleString()}
        </div>

        <BuySellButton
          symbol={this.props.symbol1}
          price={this.props.price}
          detainedQty={detainedQty}
        />


      </div>
    );
  }
}

const mapStateToProps = state => state.dataReducer;

export default connect(mapStateToProps)(Currency);
