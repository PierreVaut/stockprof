

import { connect } from 'react-redux';
import { requestBody } from '../actions/'
import { apiFetch } from '../actions/'
import Login from '../component/login'


function mapStateToProps(state){
    return {data: state}
}

function mapDispatchToProps(dispatch) {
    return { 
        onChange: () => { dispatch( requestBody() ) }
    }
}
const LoginContainer =  connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer