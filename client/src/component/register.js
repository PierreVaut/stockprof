import React from 'react';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleChange(event) {
        let newState = this.state;
        newState.post[event.target.name] = event.target.value;
        /*** Dispatch ! ***/
        this.setState(newState);
    }

    render(){
        return(
            <div>
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
            </div>

        )
    }
}

export default Register