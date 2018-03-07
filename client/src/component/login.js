
import React from 'react';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        let body = {email: this.props.data.dataReducer.requestBody.email, password: this.props.data.dataReducer.requestBody.pwd}
        console.log( '[HandleSubmit]:', body );
        this.props.onSubmit(body)
        e.preventDefault();
    }

    handleChange(field, content){
        // console.log( '[HandleChange] field:', field, ' content:', content );
        this.props.onChange(field, content)
    }


    render(){
        return(
            <div className = 'login'>
            <h2>Login</h2>
                <form action='/login' onSubmit={ e => this.handleSubmit(e)}>
                    <label>Email<br/>
                        <input
                            name= 'email'
                            value= {this.props.data.dataReducer.requestBody.email}
                            onChange={e => { this.handleChange('email', e.target.value) }}
                        >
                        </input><br/>
                    </label><br/>
                    <label>Password<br/>
                        <input
                            name= 'password'
                            value= {this.props.data.dataReducer.requestBody.pwd}
                            onChange={e => { this.handleChange('pwd', e.target.value) }}
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