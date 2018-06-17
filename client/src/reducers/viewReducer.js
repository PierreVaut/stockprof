import * as actionType from '../actions/actionType';


const initialState = {
  visible: {
    subheader: true,
  },
};

const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TOGGLE_VISIBILITY:
      const newVisible = { ...state.visible };
      newVisible[action.target] = !newVisible[action.target];
      return { ...state, visible: newVisible };
    default:
      return state;
  }
  return state;
};

export default viewReducer;

