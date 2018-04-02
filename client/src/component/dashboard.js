import React   from 'react'
import Balance from './balance';
import { connect }  from 'react-redux';

const Dashboard = props => {
    console.log("DB", props)
    const {cashAvailable, name, position, _id } = props.account;
    const profit = Math.round(5000 - cashAvailable);

    return (<div className= 'dashboard'>
        <div>Votre nom: {name}</div>
        <div>Votre Id: {_id}</div>
        <div>Cash disponible: {cashAvailable} $</div>
        <div>Portefeuille: {JSON.stringify(position)}</div>
        <div>Plus/moins-values: <Balance account = {props.account} /></div>
    </div>)}

const mapStateToProps = state => state.dataReducer

export default connect(mapStateToProps)(Dashboard);