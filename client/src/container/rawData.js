import React from 'react'
import { connect } from 'react-redux'

const RawData = (props) =>  <p>Data: {JSON.stringify(props)}</p>              
const mapStateToProps = state => state

export default connect(mapStateToProps)(RawData);