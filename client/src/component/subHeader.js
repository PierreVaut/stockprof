import React from 'react';
import { connect } from 'react-redux';

const SubHeader = (props) =>{
    console.log('[Subheader]', props)
    if(props.viewReducer.visible.subheader){
        return(
            <div className = 'subHeader'>
                <span className= 'subHeader-close' onClick= {this.close}> X </span>
                    <div className= 'subHeader-content'>
                        <p>Hello {props.dataReducer.account.name}</p>
                        <p>Last visit: {new Date(props.dataReducer.session.lastVisit).toLocaleString()}</p>
                    </div>
            </div>
    )} else {
        return <div className = 'subHeader' id='notVisible'></div>
    }
}


const mapStateToProps = state => state

export default connect(mapStateToProps)(SubHeader);
