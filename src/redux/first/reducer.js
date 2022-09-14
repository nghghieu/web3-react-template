import {
  FIRST,
  FIRST_SUCCESS,
  FIRST_FAILED,
} from './actionTypes';

const defaultState = {
  isLoading: false,
};

// eslint-disable-next-line default-param-last
const firstReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FIRST_SUCCESS:
    case FIRST_FAILED:
      return {
        isLoading: false,
      };

    case FIRST:
      return {
        isLoading: true,
      };

    default:
      return state;
  }
};

export default firstReducer;
