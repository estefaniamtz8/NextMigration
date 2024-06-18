export const vacancyTypes = {
  SET_VACANCY: 'vacancy/SET_VACANCY',
}
export const setVacancyRedux = (payload) => ({
  type: vacancyTypes.SET_VACANCY,
  payload,
})
