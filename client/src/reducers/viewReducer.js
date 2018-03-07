import * as actionType from '../actions/actionType'


let initialState = {
    visible: {
        subheader: true
        }
}

const viewReducer = (state = initialState, action) => {
    switch (action.type){
        case actionType.TOGGLE_SUBHEADER:
            console.log('[ViewReducer] action:', action);
            return  Object.assign({}, state, {visible:{subheader: !state.visible.subheader}})
        default:
            return state

    }
    return state
}

export default viewReducer