import { connect } from 'react-redux';
import { requestBody } from '../actions/'
import { apiPost } from '../actions/'
import Disconnect from '../component/disconnect'


function mapStateToProps(state){
    return {data: state}
}

function mapDispatchToProps(dispatch) {
    return { 
        onChange: (field, content) => { dispatch( requestBody(field, content) ) },
        onSubmit: (body, url) => { dispatch( apiPost(body, url) ) },
    }
}
const DisconnectContainer =  connect(
    mapStateToProps,
    mapDispatchToProps
)(Disconnect);

export default DisconnectContainer