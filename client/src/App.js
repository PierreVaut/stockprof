import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {data: 'no data'};
    }

    userInfo() {
        console.log('[userInfo] Fetching data');
        fetch('http://localhost:5000/api', {
            accept: 'application/json'
        }).then(
            response => {console.log(response.json())}
        )
    }

    componentWillMount() {
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

export default App;
