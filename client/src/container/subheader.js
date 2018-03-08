import React from 'react';
import { connect } from 'react-redux';
import { toggleVisibility } from '../actions/'

export const Subheader = (props) => {
    console.log('[Subheader]', props)
    if(props.viewReducer.visible.subheader){
        return(
            <div className = 'subHeader'>
                <span className= 'subHeader-close' onClick= { ()=>props.onClick()  }> X </span>
                    <div className= 'subHeader-content'>
                        <p>Hello {(props.dataReducer.account.name)?props.dataReducer.account.name:'Guest'}</p>
                        <p>Last visit: {(props.dataReducer.session.visitLast)?
                        new Date(props.dataReducer.session.visitLast).toLocaleString():
                        new Date(Date.now()).toLocaleString()}</p>
                    </div>
            </div>
    )} else {
        return <div className = 'subHeader' id='notVisible'></div>
    }
}


const mapDispatchToProps = dispatch => {
    return {
      onClick: () => {
        console.log('[Subheader Cont] click')
        dispatch( toggleVisibility('subheader') )
      }
    }
  }

const mapStateToProps = state => state

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Subheader);

