import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './App.css';
import Ws from './component/ws';
import Btc from './component/btc';
const domain = 'stockprof-carb11.herokuapp.com';

class App extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

    constructor(props) {
        super(props);
        this.state = {data: 'no data', post: {}, login: {} };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);
    }


    componentWillMount() {
        const { cookies } = this.props;

        // setting cookie
        if(!cookies.get(domain)){
            let rdm = Math.floor(Math.random() * 99999942 );
            cookies.set(domain, rdm, { path: '/' });
        }

        // retrieving user Info
        if(this.state.data === 'no data'){
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
                })   
                .then( (result) => {
                    console.log('[React-userInfo] Fetch ok', result);
                    result.json().then(
                        json => {
                            console.log('[React Fetch] API:', json)
                            this.setState({'data': json})
                        }
                    )
                }) 
        }
    }

    handleSubmit(event) {
        console.log( '[App] Submit:', this.state.post );
        fetch('/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.post)
        })
            .catch( (err) => {
                console.log('[React Fetch] Error:', err)
                this.setState({'data': err})
            })    
            .then( (result) => {
                result.json().then(
                    json => {
                        console.log('[React Fetch] Register:', json)
                        this.setState({'data': json})
                    }
                )
            })

        event.preventDefault();
    }


    handleSubmit2(event){
        console.log( '[App] Login:', this.state.login );
        fetch('/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.login)
        })
            .catch( (err) => {
                console.log('[React Fetch] Error:', err)
                this.setState({'data': err})
            })    
            .then( (result) => {
                result.json().then(
                    json => {
                        console.log('[React Fetch] Login:', json)
                        this.setState({'data': json})
                    }
                )
            })

        event.preventDefault();
    }




    handleDisconnect(event){

        fetch('/disconnect', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.post)
        })
            .catch( (err) => {
                console.log('[React Fetch] Error:', err)
                this.setState({'data': err})
            })    
            .then( (result) => {
                result.json().then(
                    json => {
                        console.log('[React Fetch] Register:', json)
                        this.setState({'data': json})
                    }
                )
            })

        event.preventDefault();

    }

    handleChange(event) {
        let newState = this.state;
        newState.post[event.target.name] = event.target.value;
        this.setState(newState);
    }

    handleChange2(event) {
        let newState = this.state;
        newState.login[event.target.name] = event.target.value;
        this.setState(newState);
    }

    render() {
        return (

                <div className="App">
                    Hello !<br/>
                    <h2>User info</h2>
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

                        <button type='submit'>Register</button>
                    </form>



                    <h2>Login</h2>
                    <form action='/login' onSubmit={this.handleSubmit2}>
                        <label>Email<br/>
                            <input
                                name= 'email'
                                value= {this.state.value}
                                onChange={this.handleChange2}
                            >
                            </input><br/>
                        </label><br/>
                        <label>Password<br/>
                            <input
                                name= 'password'
                                value= {this.state.value}
                                onChange={this.handleChange2}
                            >
                            </input><br/>
                        </label><br/>

                        <button type='submit'>Login</button>
                    </form>



                    <h2>Disconnect</h2>
                    <form action='/disconnect' onSubmit={this.handleDisconnect}>
                        <button type='submit'>Disconnect</button>
                    </form>

                    <Ws />
                    <Btc />
                </div>

        );
    }
}

export default withCookies(App);
