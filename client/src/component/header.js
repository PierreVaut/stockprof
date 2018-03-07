import React from 'react';
import SubheaderContainer  from '../container/subheader';

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