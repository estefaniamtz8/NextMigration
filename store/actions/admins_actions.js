export const admins = {
  SET_ADMINS: 'SET_ADMINS',
  SET_FILTERS: 'filters/SET_FILTERS',
  SET_DATA_SEARCH: 'filters/SET_DATA_SEARCH',
  SET_ADMIN_DATA: 'filters/SET_ADMIN_DATA',
};

export const setAdmins = (data) => ({
  type: admins.SET_ADMINS,
  payload: data,
});

export const setFiltersAdminRedux = (payload) => ({
  type: admins.SET_FILTERS,
  payload
});

export const setDataSearchAdminRedux = (payload) => ({
  type: admins.SET_DATA_SEARCH,
  payload
});

export const setAdminData = (payload) => ({
  type: admins.SET_ADMIN_DATA,
  payload
});
