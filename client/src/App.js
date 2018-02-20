import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import './App.css';

class App extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

    constructor(props) {
        super(props);
        this.state = {data: 'no data'};
    }

 
    userInfo() {


        let params = {
            method: 'POST',
        }

        console.log('[userInfo] Fetching data');
        fetch('http://localhost:5000/api/', {
            accept: 'application/json'
        }).then(
            response => {console.log(response.json())}
        )
    }

    componentWillMount() {
        const { cookies } = this.props;
        console.log('[React-userInfo]', cookies.get("stockprof-carb11.herokuapp.com"));
        this.userInfo()
    }

    render() {
        return (
            <div className="App">
                {this.state.data}
            </div>
        );
    }
}

export default withCookies(App);
