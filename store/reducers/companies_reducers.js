import { companiesTypes } from 'redux/actions/companies_actions';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case companiesTypes.SET_COMPANIES:
      return action.payload.slice();
    default:
      return state;
  }
};
