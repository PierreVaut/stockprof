import { combineReducers } from 'redux'
import viewReducer from './viewReducer'
import dataReducer from './dataReducer'

const myApp = combineReducers({
    viewReducer, dataReducer
  })

export default myApp