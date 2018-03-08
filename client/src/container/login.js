
import React from 'react';
import { connect } from 'react-redux';
import { requestBody } from '../actions/'
import { apiPost } from '../actions/'
import { NavLink } from 'react-router-dom';

const Login = props => {

    return(
        <div className = 'login'>
        <h2>Login</h2>
            <form>
                <label>Email<br/>
                    <input
                        name= 'email'
                        value= {props.data.dataReducer.requestBody.email}
                        onChange={e => { props.onChange('email', e.target.value) }}
                    >
                    </input><br/>
                </label><br/>
                <label>Password<br/>
                    <input
                        name= 'password'
                        value= {props.data.dataReducer.requestBody.pwd}
                        onChange={e => { props.onChange('pwd', e.target.value) }}
                    >
                    </input><br/>
                </label><br/>
                </form>

                <NavLink
                    to = '/'
                    onClick = {
                        function(){
                            let body = {
                                email: props.data.dataReducer.requestBody.email, password: props.data.dataReducer.requestBody.pwd
                            }
                            props.onSubmit(body, '/login');
                            console.log('[Login]', body);
                        }
                    }
                >
                Login
                </NavLink> 
        </div>
    )   
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

