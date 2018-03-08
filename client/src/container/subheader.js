import React from 'react';
import { Subheader }  from '../component/subheader';
import { connect } from 'react-redux';
import { toggleSubheader } from '../actions/'



const mapDispatchToProps = dispatch => {
    return {
      onClick: () => {
        console.log('[Subheader Cont] click')
        dispatch( toggleSubheader() )
      }
    }
  }

const mapStateToProps = state => state

const SubheaderContainer =  connect(
    mapStateToProps,
    mapDispatchToProps
)(Subheader);

export default SubheaderContainer