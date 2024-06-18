export const usersTypes = {
  SET_USERS: 'users/SET_USERS',
  SET_USER_LOCAL: 'users/SET_USER_LOCAL',
};

export const setUsersRedux = (payload) => ({
  type: usersTypes.SET_USERS,
  payload,
});

export const setUserLocalRedux = (payload) => ({
  type: usersTypes.SET_USER_LOCAL,
  payload,
});
