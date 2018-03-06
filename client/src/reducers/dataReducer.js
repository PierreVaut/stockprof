import * as actionType from '../actions/actionType'
import * as params from '../config/params'


let initialState = {
    cookie: 'no cookie yet',
    session: {
        isLogged:  false,
        lastVisit: Date.now(),
        ip:['ip']
    },
    account: { name: 'Guest' },
    status: 'initializing...',
    requestBody:{email: '', pwd: '', name: ''}
}


const dataReducer = (state = initialState, action) => {

    switch (action.type){

        case actionType.API_FETCH:
            return state
        case actionType.API_POST:
            return state
        case actionType.REQUEST_BODY:
            console.log('[dataReducer]', action)
            let newRequestBody = state.requestBody;
            newRequestBody[action.field] = action.content;
            let newState = Object.assign({}, state, {requestBody: newRequestBody} )
            return newState
        default:
            return state

    }
    return state
}

export default dataReducer