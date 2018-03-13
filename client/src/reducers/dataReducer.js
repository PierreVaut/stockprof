import * as actionType from '../actions/actionType'



let initialState = {
    cookie: 'no cookie yet',
    session: {
        isLogged:  false,
        lastVisit: Date.now(),
        ip:['ip']
    },
    account: { name: 'Guest', position: {'TEST': 15} },
    requestBody:{email: '', pwd: '', name: ''},
    userList: [{name:'no data yet...', isLogged: false, lastLogin: 0}],
    prices: [
            {symbol1: 'TEST',
            symbol2: 'USD',
            price: 120,
            open24: 100,
            timestamp: 0}
        ],
    priceListInitialized: false 
}


const dataReducer = (state = initialState, action) => {
    
    switch (action.type){

        case actionType.RECEIVE_DATA:
            console.log('[DataReducer] action:', action);
            return Object.assign({}, state, action.data )

        case actionType.RECEIVE_USERLIST:
            console.log('[DataReducer] action:', action);
            return {...state, userList: action.list}
            
        case actionType.RECEIVE_PRICES:
            console.log('[DataReducer] action:', action);
            return {...state, priceListInitialized: true, prices: action.prices}

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