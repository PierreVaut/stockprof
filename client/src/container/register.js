import React from 'react';
import { connect } from 'react-redux';
import { requestBody } from '../actions/'
import { apiPost } from '../actions/'

const handleSubmit = (e, props) => {
    let body = {
        email: props.data.dataReducer.requestBody.email,
        password: props.data.dataReducer.requestBody.pwd,
        name: props.data.dataReducer.requestBody.name,   
    }
    console.log( '[HandleSubmit]  Register:', body );
    props.onSubmit(body, '/register')
    e.preventDefault();
}

const handleChange = (props, field, content) => {
    // console.log( '[HandleChange] field:', field, ' content:', content );
    props.onChange(field, content)
}

const Register = (props) => {

       return(
        <div className = 'register'>
        <h2>Register</h2>
            <form onSubmit={ e => handleSubmit(e, props)}>
                <label>Email<br/>
                    <input
                        name= 'email'
                        value= { props.data.dataReducer.requestBody.email }
                        onChange={e => { handleChange(props, 'email', e.target.value) }}
                    >
                    </input><br/>
                </label><br/>

                <label>Password<br/>
                    <input
                        name= 'password'
                        value= { props.data.dataReducer.requestBody.pwd }
                        onChange={e => { handleChange(props, 'pwd', e.target.value) }}
                    >
                    </input><br/>
                </label><br/>

                <label>Name<br/>
                    <input
                        name= 'name'
                        value= { props.data.dataReducer.requestBody.name }
                        onChange={e => { handleChange(props, 'name', e.target.value) }}
                    >
                    </input><br/>
                </label><br/>

                <button type='submit'>Register</button>
            </form>
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
)(Register);

