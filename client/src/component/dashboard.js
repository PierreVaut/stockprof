import React   from 'react'
import { connect }  from 'react-redux';



const Dashboard = (props) => {
    let {cashAvailable, name, position } = props.account
    return (<div className= 'dashboard'>
        <h2>Dashboard</h2>
        <div>Name: {name}</div>
        <div>Cash: {cashAvailable}</div>
        <div>Position: {JSON.stringify(position)}</div>
        <div>Profit: </div>
    </div>)}


const mapStateToProps = state => state.dataReducer


export default connect(mapStateToProps)(Dashboard);