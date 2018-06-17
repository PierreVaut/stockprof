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


// Http request to retrieve Session, Account, Cookies
export const apiFetch = () => dispatch => fetch('/api', params.get)
  .then(response => {
    response.json().then(json => {
      dispatch(receiveData(json));
    });
  });

// 'body' is set in State by requestBody()
/** * called by Login and Register components */
export const apiPost = (body, url) => dispatch => fetch(url, params.post(body))
  .then(response => {
    response.json().then(json => {
      dispatch(receiveData(json));
    });
  });

export const marketOperation = body => {
  const url = '/market-operation';
  return dispatch => fetch(url, params.post(body))
    .then(response => {
      response.json().then(json => {
        console.log('[API Market operation] success:', json);
        dispatch(receiveData(json));
      });
    });
};

export const getTimeline = () => dispatch => {
  fetch('/timeline', params.get)
    .then(response => {
      response.json().then(json => {
        console.log('[Timeline Fetch] success:', json);
        dispatch(receiveTimeline(json));
      });
    })
    .catch(error => console.log('[Timeline Fetch] error: ', error));
};


export const updateTimelineItem = (payload) => {
  console.log({ payload });
  fetch(`/interact/${payload._id}`, params.post(payload));
  return { type: actionType.SYNC_UPDATE_TIMELINE_ITEM, payload };
};

