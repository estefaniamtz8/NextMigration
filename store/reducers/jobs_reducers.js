import { jobsTypes } from 'redux/actions/jobs_actions';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case jobsTypes.SET_JOBS:
      return action.payload.slice();
    case jobsTypes.ADD_JOB:
      return state.concat(action.payload);
    case jobsTypes.EDIT_JOB:
      return state.reduce((acc, element) => {
        if (element.jobID === action.payload.jobID) {
          acc.push({
            ...state,
            ...action.payload,
          });
        } else {
          acc.push(element);
        }
        return acc;
      }, []);
    default:
      return state;
  }
};
