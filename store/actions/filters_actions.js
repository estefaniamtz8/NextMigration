export const filtersTypes = {
  SET_FILTERS: 'filters/SET_FILTERS',
  SET_DATA_SEARCH: 'filters/SET_DATA_SEARCH',
}


export const setFiltersRedux = (payload) => ({
  type: filtersTypes.SET_FILTERS,
  payload
});

export const setDataSearchRedux = (payload) => ({
  type: filtersTypes.SET_DATA_SEARCH,
  payload
});
