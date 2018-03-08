import * as actionType from './actionType';
import * as params from '../config/params'

export const toggleVisibility = (target) => {
    return {type: actionType.TOGGLE_VISIBILITY, target}
}

export const apiPost = (body, url) => {
    return dispatch => {
        return fetch(url, params.post(body))
        .then(response => {
            console.log('[API Fetch] success:', response);
            response.json().then(
                json => {
                    console.log('[API Json] success:', json);
                    dispatch(receiveData(json))
                }
            )
        })
    }
}

export const requestBody = (field, content) => {
    return {type: actionType.REQUEST_BODY, field, content}
}

export const receiveData = (data) => {
    return {type: actionType.RECEIVE_DATA, data}
}

export const apiFetch = () => {
    return dispatch => {
        return fetch('/api', params.get)
        .then(response => {
            console.log('[API Fetch] success:', response);
            response.json().then(
                json => {
                    console.log('[API Json] success:', json);
                    dispatch(receiveData(json))
                }
            )
        })
    }
}
        
