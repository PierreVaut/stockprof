import React from 'react';
import SubheaderContainer  from '../container/subheader';
import { connect } from 'react-redux';
import { toggleSubheader } from '../actions/'

const Header = () => ( 
    <div>
        <div className = 'header'>
            <div className = 'menu'></div>
            <div className = 'title'>Stocks</div>
            <div className = 'account'></div>
        </div>
        <SubheaderContainer />
    </div>
)

export default Header