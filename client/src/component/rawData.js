import React from 'react'
import { connect } from 'react-redux'

const RawData = ({requestBody, raw}) =>  <p>Data: {JSON.stringify(raw)}</p>

const mapStateToProps = state => {
    return {
        requestBody: state.dataReducer.requestBody,
        raw: state
    }
}

export default connect(mapStateToProps)(RawData);