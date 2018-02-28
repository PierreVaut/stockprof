import React from 'react';


export default class Header extends React.Component {

    constructor(props) {
        super(props);
    this.state= {}
    }

    render() {
        return(
            <div className = 'header'>
                <div className = 'menu'></div>
                <div className = 'title'>Stocks</div>
                <div className = 'account'></div>
            </div>
        )
    }


}