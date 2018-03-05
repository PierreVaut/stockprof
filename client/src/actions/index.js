import * as action from './actionType';


export const toggleSubheader = (visible) => {
    type: action.TOGGLE_SUBHEADER,
    visible
}