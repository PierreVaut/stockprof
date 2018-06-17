import React from 'react';
import { connect } from 'react-redux';
import Balance from './balance';
import { GuestMenu } from '../common';

const Dashboard = props => {
  console.log('DB', props);
  const { isLogged } = props.session;
  const {
    cashAvailable, name, position, _id,
  } = props.account;

  return isLogged ?
    (
      <div className="dashboard">
        <div>Votre nom: {name}</div>
        <div>Votre Id: {_id}</div>
        <div>Cash disponible: {cashAvailable} $</div>
        <div>Portefeuille: {JSON.stringify(position)}</div>
        <div>Plus/moins-values: <Balance account={props.account} /></div>
      </div>
    ) :
    (<GuestMenu />);
};

const mapStateToProps = state => state.dataReducer;

export default connect(mapStateToProps)(Dashboard);
