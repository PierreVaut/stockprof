import React from 'react';
import { connect } from 'react-redux';
import Balance from './balance';
import { GuestMenu } from '../common';

const Dashboard = props => {
  const { isLogged } = props.session;
  const {
    cashAvailable, name, position, _id, friends, isFollowingYou,
  } = props.account;
  return isLogged ?
    (
      <div className="list-item-center">
        <div>Votre nom: {name}</div>
        <div>Votre Id: {_id}</div>
        <div>Cash disponible: {cashAvailable} $</div><br />
        <div>Plus/moins-values: <Balance account={props.account} /></div><br />
        <div>Portefeuille: {JSON.stringify(position)}</div><br />
        <div>Vous suivez: {JSON.stringify(friends)}</div><br />
        <div>Vous êtes suivis par : {JSON.stringify(isFollowingYou)}</div><br />
      </div>
    ) :
    (<GuestMenu />);
};

const mapStateToProps = state => state.dataReducer;

export default connect(mapStateToProps)(Dashboard);
