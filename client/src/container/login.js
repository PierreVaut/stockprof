import React from 'react';
import * as params from '../config/params'


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.formValue = {email: '', pwd: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
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


    render(){
        return(
            <div className = 'login'>
            <h2>Login</h2>
                <form action='/login' onSubmit={this.handleSubmit}>
                    <label>Email<br/>
                        <input
                            name= 'email'
                            value= {this.state.value}
                            onChange={e => { this.formValue.email = e.target.value }}
                        >
                        </input><br/>
                    </label><br/>
                    <label>Password<br/>
                        <input
                            name= 'password'
                            value= {this.state.value}
                            onChange= {e => { this.formValue.pwd = e.target.value }}
                        >
                        </input><br/>
                    </label><br/>

                    <button type='submit'>Login</button>
                </form>
            </div>
        )
    }




}

export default Login