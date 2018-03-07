import * as actionType from '../actions/actionType'



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
    console.log('[DataReducer] action:', action);
    switch (action.type){

        case actionType.RECEIVE_DATA:
            return Object.assign({}, state, {fetch: action.data} )

        case actionType.API_POST:
            console.log('[DataReducer] action:', action);
            return state

        case actionType.REQUEST_BODY:
            let newRequestBody = state.requestBody;
            newRequestBody[action.field] = action.content;
            return Object.assign({}, state, {requestBody: newRequestBody} )

        default:
            return state

    }
    return state
}

export default dataReducer