import * as actionType from './actionType';
import * as params from '../config/params'

// only for UI
/*** called by subheader component */
export const toggleVisibility = (target) => {
    return {type: actionType.TOGGLE_VISIBILITY, target}
}




// sets input from user (login, pwd, email) into State for further apiPOST request (login or register)
/*** called by Login and Register components */
export const requestBody = (field, content) => {
    return {type: actionType.REQUEST_BODY, field, content}
}

// sets Session, Account, Cookies into State
/*** dispatched by apiFetch callback***/
export const receiveData = (data) => {
    return {type: actionType.RECEIVE_DATA, data}
}

// sets list of users (with infos) into State
/*** dispatched by users.js component when webSocket is updated ***/
export const receiveUserList = (list) => {
    return {type: actionType.RECEIVE_USERLIST, list}
}

// Http request to retrieve Session, Account, Cookies
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

// 'body' is set in State by requestBody()
 /*** called by Login and Register components */
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

