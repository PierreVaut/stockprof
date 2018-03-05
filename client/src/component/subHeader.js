import React from 'react';
import { connect } from 'react-redux';

const SubHeader = (props) =>{
    console.log('[Subheader]', props)
    if(1){
        return(
            <div className = 'subHeader'>
                <span className= 'subHeader-close' onClick= {this.close}> X </span>
                    <div className= 'subHeader-content'>
                        <p>Hello {props.data.account.name}</p>
                        <p>Last visit: {new Date(props.data.session.lastVisit).toLocaleString()}</p>
                    </div>
            </div>
    )} else {
        return <div className = 'subHeader' id='notVisible'></div>
    }
}


function mapStateToProps(state){
    // console.log('[FilterList] state:', state)
    return {
        data: state.viewReducer,
    };
  }
  export default connect(mapStateToProps)(SubHeader);
