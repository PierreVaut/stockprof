import * as actionType from './actionType';
import * as params from '../config/params';

// only for UI
/** * called by subheader component */
export const toggleVisibility = (target) => ({ type: actionType.TOGGLE_VISIBILITY, target });


// sets input from user (login, pwd, email) into State for further apiPOST request (login or register)
/** * called by Login and Register components */
export const requestBody = (field, content) => ({ type: actionType.REQUEST_BODY, field, content });
export const resetRequestBody = () => ({ type: actionType.RESET_REQUEST_BODY });

// sets Session, Account, Cookies into State
/** * dispatched by apiFetch callback** */
export const receiveData = (data) => ({ type: actionType.RECEIVE_DATA, data });

// sets list of users (with infos) into State
/** * dispatched by users.js component when webSocket is updated ** */
export const receiveUserList = (list) => ({ type: actionType.RECEIVE_USERLIST, list });
export const receivePrices = (prices) => ({ type: actionType.RECEIVE_PRICES, prices });
export const receiveTimeline = (data) => ({ type: actionType.RECEIVE_TIMELINE, data });
export const receiveTimelineItem = (data) => ({ type: actionType.RECEIVE_TIMELINE_ITEM, data });

// Http request to retrieve Session, Account, Cookies
export const apiFetch = () => dispatch => fetch('/api', params.get)
  .then(response => {
    console.log('[API Fetch] success:', response);
    response.json().then(json => {
      console.log('[API Json] success:', json);
      dispatch(receiveData(json));
    });
  });

// 'body' is set in State by requestBody()
/** * called by Login and Register components */
export const apiPost = (body, url) => dispatch => fetch(url, params.post(body))
  .then(response => {
    console.log('[API Fetch] success:', response);
    response.json().then(json => {
      console.log('[API Json] success:', json);
      dispatch(receiveData(json));
    });
  });

export const marketOperation = body => {
  const url = '/market-operation';
  return dispatch => fetch(url, params.post(body))
    .then(response => {
      console.log('[API Market operation] success:', response);
      response.json().then(json => {
        console.log('[API Market operation] json:', json);
        dispatch(receiveData(json));
      });
    });
};

export const getTimeline = () => dispatch => {
  console.log('getting Timeline.....');
  fetch('/timeline', params.get)
    .then(response => {
      console.log('[Timeline Fetch] success:', response);
      response.json().then(json => {
        console.log('[API Json] success:', json);
        dispatch(receiveTimeline(json));
      });
    })
    .catch(error => console.log('[Timeline Fetch] error: ', error));
};


export const editTimelineItem = (payload, id) => dispatch => {
  dispatch(receiveTimelineItem(payload));
  fetch(`/interact/${id}`, params.post(payload))
    .then(response => {
      console.log('[Timeline interact] :', response);
      response.json()
        .then(json => {
          console.log('[Timeline interact] success:', json);
          dispatch(receiveTimelineItem(json));
        })
        .catch(error => console.log('[Timeline interact] error: ', error));
    });
};
