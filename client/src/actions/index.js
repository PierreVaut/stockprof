import * as action from './actionType';


export const toggleSubheader = (visible) => {
    type: action.TOGGLE_SUBHEADER,
    visible
}


export const fetchApi = () => {
    type: action.API_FETCH
}

export const postApi = () => {
    type: action.API_POST
}