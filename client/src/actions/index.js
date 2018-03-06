import * as actionType from './actionType';


export const toggleSubheader = (visible) => {
    return {type: actionType.TOGGLE_SUBHEADER, visible}
}

export const apiFetch = () => {
    return {type: actionType.API_FETCH}
}

export const apiPost = () => {
    return {type: actionType.API_POST}
}

export const requestBody = (field, content) => {
    return {type: actionType.REQUEST_BODY, field, content}
}


