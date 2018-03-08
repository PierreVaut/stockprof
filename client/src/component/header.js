import React from 'react';
import Hbg from '../container/hbg';
import SubheaderContainer  from '../container/subheaderContainer';

const Header = () => ( 
    <div>
        <div className = 'header'>
            <div className = 'menu'>
                <Hbg />
            </div>
            <div className = 'title'>Stocks</div>
            <div className = 'account'></div>
        </div>
        <SubheaderContainer />
    </div>
)

export default Header