
import React from 'react';
import { connect } from 'react-redux';
import { requestBody } from '../actions/'
import { apiPost } from '../actions/'


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        let body = {email: this.props.data.dataReducer.requestBody.email, password: this.props.data.dataReducer.requestBody.pwd}
        console.log( '[HandleSubmit] Login:', body );
        this.props.onSubmit(body, '/login')
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
                <form onSubmit={ e => this.handleSubmit(e)}>
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

function mapStateToProps(state){
    return {data: state}
}

function mapDispatchToProps(dispatch) {
    return { 
        onChange: (field, content) => { dispatch( requestBody(field, content) ) },
        onSubmit: (body, url) => { dispatch( apiPost(body, url) ) },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

