import * as actionType from '../actions/actionType'



let initialState = {
    cookie: 'no cookie yet',
    session: {
        isLogged:  false,
        lastVisit: Date.now(),
        ip:['ip']
    },
    account: { name: 'Guest' },
    requestBody:{email: '', pwd: '', name: ''}
}


const dataReducer = (state = initialState, action) => {
    
    switch (action.type){

        case actionType.RECEIVE_DATA:
            console.log('[DataReducer] action:', action);
            return Object.assign({}, state, action.data )

        case actionType.RECEIVE_USERLIST:
            console.log('[DataReducer] action:', action);
            return {...state, userList: action.list}
            
        case actionType.REQUEST_BODY:
            console.log('[DataReducer] action:', action);
            let newRequestBody = state.requestBody;
            newRequestBody[action.field] = action.content;
            return Object.assign({}, state, {requestBody: newRequestBody} )

        case actionType.RESET_REQUEST_BODY:
            console.log('[DataReducer] action:', action);
            return {...state, requestBody: {} }


        default:
            return state

    }
    return state
}

export default dataReducer