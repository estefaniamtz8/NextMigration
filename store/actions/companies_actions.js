export const companiesTypes = {
  SET_COMPANIES: 'companies/SET_JOBS',
};

export const setCompaniesRedux = (jobs) => ({
  type: companiesTypes.SET_COMPANIES,
  payload: jobs,
});
