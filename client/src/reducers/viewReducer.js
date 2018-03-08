import * as actionType from '../actions/actionType'


let initialState = {
    visible: {
        subheader: true
        }
}

const viewReducer = (state = initialState, action) => {
    switch (action.type){
        case actionType.TOGGLE_VISIBILITY:
            console.log('[ViewReducer] action:', action);
            let newVisible = {...state.visible};
            newVisible[action.target] = !newVisible[action.target]
            return  {...state, visible: newVisible }
        default:
            return state

    }
    return state
}

export default viewReducer