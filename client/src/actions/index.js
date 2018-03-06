import * as actionType from './actionType';


export const toggleSubheader = (visible) => {
    type: actionType.TOGGLE_SUBHEADER,
    visible
}

export const apiFetch = () => {
    type: actionType.API_FETCH
}

export const apiPost = () => {
    type: actionType.API_POST
}

export const requestBody = () => {
    return {type: actionType.REQUEST_BODY}
}