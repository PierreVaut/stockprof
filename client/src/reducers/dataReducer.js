import * as actionType from '../actions/actionType';


const initialState = {
  cookie: 'no cookie yet',
  session: {
    isLogged: false,
    lastVisit: Date.now(),
    ip: ['ip'],
  },
  account: { name: 'Guest', position: [{ symbol: 'TEST', qty: 15 }] },
  requestBody: { email: '', pwd: '', name: '' },
  userList: [{
    name: 'no data yet...', isLogged: false, lastLogin: 0, _id: false,
  }],
  prices: [
    {
      symbol1: 'TEST',
      symbol2: 'USD',
      price: 120,
      open24: 100,
      timestamp: 0,
    },
  ],
  priceListInitialized: false,
  timeline: [],
  chatHistory: [],
};


const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.RECEIVE_DATA:
      return {
        ...state,

        ...action.data,

      };

    case actionType.RECEIVE_TIMELINE:
      return { ...state, timeline: action.data };

    case actionType.SYNC_UPDATE_TIMELINE_ITEM:
      const { timeline, ...rest } = state;
      const newTimeline = timeline.map(el => {
        if (el._id === action.payload._id) {
          const newEl = { ...el, ...action.payload };
          return newEl;
        }
        return el;
      });
      return { ...rest, timeline: newTimeline };

    case actionType.RECEIVE_USERLIST:
      return { ...state, userList: action.list };

    case actionType.RECEIVE_PRICES:
      return { ...state, priceListInitialized: true, prices: action.prices };

    case actionType.REQUEST_BODY:
      const newState = {
        ...state,
        requestBody: {
          ...state.requestBody,
          [action.field]: action.content,
        },
      };
      return newState;

    case actionType.RESET_REQUEST_BODY:
      return { ...state, requestBody: {} };

    case actionType.SYNC_FOLLOW_USER:
      return { ...state, account: { ...state.account, friends: [...state.account.friends, action.id] } };

    case actionType.SYNC_UNFOLLOW_USER:
      const newFriends = state.account.friends.filter(friend => friend !== action.id);
      return { ...state, account: { ...state.account, friends: [...newFriends] } };

    case actionType.SYNC_CREATE_TIMELINE_ITEM:
      return { ...state, timeline: [action.payload, ...state.timeline] };

    case actionType.MARK_AS_READ:
      return {
        ...state,
        account: { ...state.account, notifications: state.account.notifications.map(notif => ({ ...notif, status: 'read' })) },
      };

    case actionType.FLUSH_NOTIFS:
      return { ...state, account: { ...state.account, notifications: [] } };

    case actionType.RECEIVE_CHAT_ITEM:
      const newChatHistory = [action.data, ...state.chatHistory].filter((value, index, self) => self.indexOf(value) === index);
      console.log('receive chat item', action);
      return { ...state, chatHistory: [...newChatHistory] };

    case actionType.RECEIVE_CHAT_HISTORY:
      const newChatHistoryList = [...action.data, ...state.chatHistory].filter((value, index, self) => self.indexOf(value) === index);
      console.log('receive chat history', action);
      return { ...state, chatHistory: [...newChatHistoryList] };

    default:
      return state;
  }
  return state;
};

export default dataReducer;
