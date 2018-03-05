import React from 'react';
import SubHeader  from './subHeader';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    this.state= {}
    }

    render() {
        return(
            <div>
                <div className = 'header'>
                    <div className = 'menu'></div>
                    <div className = 'title'>Stocks</div>
                    <div className = 'account'></div>
                </div>
                <SubHeader />
            </div>
        )
    }


}