export const authTypes = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
};

export const setDataUser = (user) => ({
  type: authTypes.SET_USER,
  payload: user,
});

export const logout = () => ({
  type: authTypes.LOGOUT,
});
