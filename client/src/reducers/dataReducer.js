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
};


const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.RECEIVE_DATA:
      console.log('[DataReducer] action:', action);
      return {
        ...state,

        ...action.data,

      };

    case actionType.RECEIVE_TIMELINE:
      return { ...state, timeline: action.data };

    case actionType.RECEIVE_TIMELINE_ITEM:
      const { data } = action;
      data.toto = 'lolilol';
      const newTimeline = [...state.timeline];
      newTimeline.map(el => {
        console.log(el._id === data._id);
        if (el._id === data._id) {
          console.log('gagné!', el._id === data._id, el._id, data._id);

          return data;
        }
        return el;
      });
      const newStateTLI = { ...state, timeline: newTimeline };
      console.log('RECEIVE_TIMELINE_ITEM', newStateTLI);
      return newStateTLI;

    case actionType.RECEIVE_USERLIST:
      // console.log('[DataReducer] action:', action);
      return { ...state, userList: action.list };

    case actionType.RECEIVE_PRICES:
      // console.log('[DataReducer] action:', action);
      return { ...state, priceListInitialized: true, prices: action.prices };

    case actionType.REQUEST_BODY:
      const newState = {
        ...state,
        requestBody: {
          ...state.requestBody,
          [action.field]: action.content,
        },
      };
      console.log(state === newState);
      return newState;

    case actionType.RESET_REQUEST_BODY:
      return { ...state, requestBody: {} };


    default:
      return state;
  }
  return state;
};

export default dataReducer;
