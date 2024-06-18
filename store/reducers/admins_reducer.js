import { adminsActionTypes } from '../actions/admins_actions'; 

const initialState = {
  admins: [],
  filters: {
    textSearch: '',
    allData: {},
    dataFiltered: [],
    page: 1,
    numPages: 1,
    pageSize: 10,
  },
  me: {},
};

const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminsActionTypes.SET_ADMINS:
      return {
        ...state,
        admins: action.payload,
      };
    case adminsActionTypes.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case adminsActionTypes.SET_DATA_SEARCH:
      return {
        ...state,
        dataSearch: {
          ...state.dataSearch,
          ...action.payload,
        },
      };
    case adminsActionTypes.SET_ADMIN_DATA:
      return {
        ...state,
        me: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default adminsReducer;
