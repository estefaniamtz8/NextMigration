import { modalTypes } from 'redux/actions/loader_actions';

const initialState = {
  loader: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case modalTypes.CHANGE:
      return {
        ...state,
        loader: typeof action.payload === 'boolean' ? action.payload : !state.loader,
      };
    default:
      return state;
  }
};
