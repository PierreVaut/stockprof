
import React from 'react';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        console.log( '[HandleSubmit]:', this.props );
        this.props.onChange()
        e.preventDefault();
    }

    handleChange(){
        console.log( '[App] Login:', this.props );
        this.props.onChange()
    }


    render(){
        return(
            <div className = 'login'>
            <h2>Login</h2>
                <form action='/login' onSubmit={ e => this.handleSubmit(e)}>
                    <label>Email<br/>
                        <input
                            name= 'email'
                            value= ''
                            onChange={e => { this.handleChange() }}
                        >
                        </input><br/>
                    </label><br/>
                    <label>Password<br/>
                        <input
                            name= 'password'
                            value= ''
                            onChange= {e => { this.handleChange() }}
                        >
                        </input><br/>
                    </label><br/>

                    <button type='submit'>Login</button>
                </form>
                <p>{/*JSON.stringify(this.props.data)*/}</p>
            </div>
        )
    }
}

export default Login