import * as action from '../actions/actionType'
import * as params from '../config/params'


let initialState = {
    cookie: 'no cookie yet',
    session: {
        isLogged:  false,
        lastVisit: Date.now(),
        ip:['ip']
    },
    account: { name: 'Guest' },
    status: 'initializing...'
}


const dataReducer = (state = initialState, action) => {

    switch (action.type){

        case action.API_FETCH:
            fetch('/api', params.get)
                .catch( err => { 
                    return Object.assign({}, state, {status: err} )   })
                .then( result => result.json.then(
                    json => { 
                        return Object.assign({}, state, json )   } )
                )
        case action.API_POST:
            return state
        default:
            return state

    }
    return state
}

export default dataReducer