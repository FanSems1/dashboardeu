// action - state management
import * as actionTypes from './actions';

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

export const initialState = {
  isOpen: 'dashboard',
  navType: 'light' // Set default value ke 'light'
};

const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      return {
        ...state,
        isOpen: action.isOpen
      };
    case actionTypes.MENU_TYPE:
      return {
        ...state,
        navType: action.navType
      };
    default:
      return state;
  }
};

export default customizationReducer;
