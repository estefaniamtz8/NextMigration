import { filtersTypes } from '../actions/filters_actions';

const initialState = {
  filters: {
    address: null,
    textSearch: '',
    date: null,
    page: 1,
    numPages: 1,
    viability: 'all',
    pageSize: 40,
    rfc: false,
    nss: false,
    curp: false,
    hasDocuments: false,
    acta: false,
    gradeCertification: false,
    matches: [0, 100],
    criminalRecord: false,
    passport: false,
    licence: false,
    cv: false,
    endDate: null,
    fairFilter: false,
    languagesFilter: [],
    nationalityFilter: [],
    originFilter: [],
    startDate: null,
    tagFilter: [],
    groupFilter: [],
  },
  dataSearch: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case filtersTypes.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case filtersTypes.SET_DATA_SEARCH:
      return {
        ...state,
        dataSearch: {
          ...state.dataSearch,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
