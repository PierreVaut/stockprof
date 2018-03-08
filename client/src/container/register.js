import React from 'react';
import { connect } from 'react-redux';
import { requestBody } from '../actions/'
import { apiPost } from '../actions/'
import { NavLink } from 'react-router-dom';

const Register = props => {

    return(
        <div className = 'login'>
        <h2>Register</h2>
            <form>
                <label>Email<br/>
                    <input
                        name= 'email'
                        value= {props.dataReducer.requestBody.email}
                        onChange={e => { props.onChange('email', e.target.value) }}
                    >
                    </input><br/>
                </label><br/>

                <label>Name<br/>
                    <input
                        name= 'name'
                        value= {props.dataReducer.requestBody.name}
                        onChange={e => { props.onChange('name', e.target.value) }}
                    >
                    </input><br/>
                </label><br/>

                <label>Password<br/>
                    <input
                        name= 'password'
                        value= {props.dataReducer.requestBody.pwd}
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
                                email: props.dataReducer.requestBody.email,
                                password: props.dataReducer.requestBody.pwd,
                                name: props.dataReducer.requestBody.name
                            }
                            props.onSubmit(body, '/register');
                            console.log('[Register]', body);
                        }
                    }
                >
                Register
                </NavLink> 
        </div>
    )   
}

const mapStateToProps = (state) => state

function mapDispatchToProps(dispatch) {
    return { 
        onChange: (field, content) => { dispatch( requestBody(field, content) ) },
        onSubmit: (body, url) => { dispatch( apiPost(body, url) ) },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

