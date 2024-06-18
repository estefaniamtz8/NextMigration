import { usersTypes } from 'redux/actions/users_actions';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case usersTypes.SET_USERS:
      return {
        ...state,
        usersGeneral: action.payload.slice(),
      };
    case usersTypes.SET_USER_LOCAL:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
