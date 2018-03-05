import * as action from '../actions/actionType'

let initialState = {
    cookie: 'no cookie yet',
    session: {
        isLogged:  false,
        lastVisit: false,
        ip:['ip']
    },
    account: {
        name: 'Guest'
    }
}

const viewReducer = (state = initialState, action) => {
    switch (action.type){
        case action.TOGGLE_SUBHEADER:
            return  state
        default:
            return state

    }
    return state
}

export default viewReducer