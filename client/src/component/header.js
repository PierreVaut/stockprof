import React from 'react';
import { connect } from 'react-redux';
import Subheader  from '../container/subheader';

const mapDispatchToProps = dispatch => {
    return { disconnect: () => { dispatch(  ) } }
}

const Header = () => ( 
    <div>
        <div className = 'header'>
            <div className = 'menu-link'></div>
            <div className = 'title'>Stocks</div>
            <div className = 'account'></div>
        </div>
        <Subheader />
    </div>
)

export default Header