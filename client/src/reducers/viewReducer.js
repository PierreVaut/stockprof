import * as action from '../actions/actionType'


let initialState = {
    visible: {
        subheader: true
        }
}

const viewReducer = (state = initialState, action) => {
    switch (action.type){
        case action.TOGGLE_SUBHEADER:
            return  Object.assign({}, state, {visible:{subheader: !state.visible.subheader}})
        default:
            return state

    }
    return state
}

export default viewReducer