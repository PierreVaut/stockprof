import React from 'react';
import { connect } from 'react-redux';
import BuySellButton from './buy-sell-button';

/* Keep this component as a Class */
class Currency extends React.Component {
  // this can be updated when component is rendered
  componentDidMount() {
    this.setState({
      price: this.props.localPrice,
    });
  }

  render() {
    const { position = {} } = this.props.account;
    let detainedQty = position[this.props.symbol1] || 0;

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
           {this.props.isLogged &&<p>Quantité : {detainedQty } </p>}
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

        {this.props.isLogged && <BuySellButton
          symbol={this.props.symbol1}
          price={this.props.price}
          detainedQty={detainedQty}
        />}


      </div>
    );
  }
}

const mapStateToProps = state => state.dataReducer;

export default connect(mapStateToProps)(Currency);
