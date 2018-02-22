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
        this.state = {data: 'no data', post: {} };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getUserInfo(cb) {
        const { cookies } = this.props;
        console.log('[React-userInfo]', cookies.get(domain));
        let params = {
            method: 'GET',
            accept: 'application/json',
            credentials: 'include'
        }
        fetch('/api/', params)
            .catch(function(err){
                let result = {error: '[React-userInfo] Error:'+ err}
                console.log(result.error)
                cb(result);
            })   
            .then(function(data){
                console.log('[React-userInfo] Fetch ok', data);
                data.json().then(
                    json => {console.log('[React-userInfo] JSON:', json)
                    let result = {'data': json};
                    console.log('[React-userInfo] result:', result)
                    cb(result);
                    }
                )
            })    
    }

    registerUser() {

    }

    componentWillMount() {
        const { cookies } = this.props;
        if(!cookies.get(domain)){
            let rdm = Math.floor(Math.random() * 99999942 );
            cookies.set(domain, rdm, { path: '/' });
        }
        this.getUserInfo(  data => this.setState(data) );

    }

    handleSubmit(event) {
        console.log( '[App] Submit:', this.state.post );
        fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            //credentials: 'include',
            body: JSON.stringify(this.state.post)
        })
            .catch( (err) => {
                this.setState({'[React] Post': err})
            })    
            .then( (result) => {
                this.setState({'[React] data': result})
            })

        event.preventDefault();
    }

    handleChange(event) {
        let newState = this.state;
        newState['post'][event.target.name] = event.target.value;
        this.setState(newState);
    }

    render() {
        return (
            <div className="App">
                Hello !<br/>
                <h2>User info</h2>
                <p>Status: {JSON.stringify(this.state.status)}</p>
                <p>Data: {JSON.stringify(this.state.data)}</p>              
                <br/>
                <h2>Register</h2>
                <form action='/register' onSubmit={this.handleSubmit}>
                    <label>Email<br/>
                        <input
                            name= 'email'
                            value= {this.state.value}
                            onChange={this.handleChange}
                        >
                        </input><br/>
                    </label><br/>

                    <label>Name<br/>
                        <input
                            name= 'name'
                            value= {this.state.value}
                            onChange={this.handleChange}
                        >
                        </input><br/>
                    </label><br/>

                    <label>Password<br/>
                        <input
                            name= 'password'
                            value= {this.state.value}
                            onChange={this.handleChange}
                        >
                        </input><br/>
                    </label><br/>

                    <button type='submit'>Submit !</button>
                </form>
                <h2>Login</h2>

                <h2>Disconnect</h2>
                <form action='/disconnect' method='POST'>
                    <button type='submit'>Disconnect</button>
                </form>
            </div>
        );
    }
}

export default withCookies(App);
