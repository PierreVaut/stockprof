import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './App.css';
const domain = 'stockprof-carb11.herokuapp.com';


class App extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };


    constructor(props) {
        super(props);
        this.state = {data: 'no data'};
    }

 
    userInfo() {

        
        const { cookies } = this.props;
        let params = {
            method: 'POST',
        }

        console.log('[userInfo] Fetching data');
        fetch('http://localhost:5000/api/', {
            credentials: 'include'
        }).then(
            response => {console.log(response.json())}
        )
    }

    componentWillMount() {
        const { cookies } = this.props;
        if(!cookies.get(domain)){
            let rdm = Math.floor(Math.random() * 99999942 );
            cookies.set(domain, rdm, { path: '/' });
        }
        console.log('[React-userInfo]', cookies.get(domain));
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
