import React from 'react';
import Hbg from '../container/hbg';
import { connect } from 'react-redux';
import Subheader  from '../container/subheaderContainer';

const mapDispatchToProps = dispatch => {
    return { disconnect: () => { dispatch(  ) } }
}

const Header = () => ( 
    <div>
        <div className = 'header'>
            <div className = 'menu'>
                <Hbg />
            </div>
            <div className = 'title'>Stocks</div>
            <div className = 'account'></div>
        </div>
        <Subheader />
    </div>
)

export default Header