import * as actionType from './actionType';
import * as params from '../config/params';

/* called by subheader component */
export const toggleVisibility = (target) => ({ type: actionType.TOGGLE_VISIBILITY, target });


// sets input from user (login, pwd, email) into State for further apiPOST request (login or register)
/* called by Login and Register components */
export const requestBody = (field, content) => ({ type: actionType.REQUEST_BODY, field, content });
export const resetRequestBody = () => ({ type: actionType.RESET_REQUEST_BODY });

// sets Session, Account, Cookies into State
/* dispatched by apiFetch callback */
export const receiveData = (data) => ({ type: actionType.RECEIVE_DATA, data });

// sets list of users (with infos) into State
/* dispatched by users.js component when webSocket is updated */
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
        dispatch(receivePrices(json));
      });
    });
};

export const getPrices = () => dispatch => {
  console.log('[Prices] start');

  fetch('/prices', params.get)
    .then(response => {
      response.json().then(json => {
        console.log('[Prices] success:', json);
        dispatch(receiveTimeline(json));
      });
    })
    .catch(error => console.log('[Timeline Fetch] error: ', error));
};

export const getTimeline = () => dispatch => {
  fetch('/timeline', params.get)
    .then(response => {
      response.json().then(json => {
        // console.log('[Timeline Fetch] success:', json);
        dispatch(receiveTimeline(json));
      });
    })
    .catch(error => console.log('[Timeline Fetch] error: ', error));
};

export const createTimelineItem = payload => {
  fetch('/timeline/insert', params.post(payload));
  return { type: actionType.SYNC_CREATE_TIMELINE_ITEM, payload };
};

export const updateTimelineItem = payload => {
  fetch(`/vote/${payload._id}`, params.post(payload));
  return { type: actionType.SYNC_UPDATE_TIMELINE_ITEM, payload };
};

export const followUser = payload => {
  fetch('/follow/', params.post(payload));
  return { type: actionType.SYNC_FOLLOW_USER, id: payload.targetId };
};

export const unfollowUser = payload => {
  fetch('/unfollow/', params.post(payload));
  return { type: actionType.SYNC_UNFOLLOW_USER, id: payload.targetId };
};

export const markAsRead = (id) => {
  fetch(`/markAsRead/${id}`, params.get);
  return { type: actionType.MARK_AS_READ };
};

export const flushNotifs = (id) => {
  fetch(`/flushNotifs/${id}`, params.get);
  return { type: actionType.FLUSH_NOTIFS };
};

export const receiveChatItem = (data) => {
  console.log('receiveChatItem', data);
  return { type: actionType.RECEIVE_CHAT_ITEM, data };
};

export const receiveChatHistory = (data) => {
  console.log('receiveChatHistory', data);
  return { type: actionType.RECEIVE_CHAT_HISTORY, data };
};

export const sendComment = comment => {
  console.log('New comment', comment);
  fetch('/comment/', params.post(comment));
  return { type: actionType.SYNC_ADD_COMMENT, data: comment };
};
