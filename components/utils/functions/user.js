function getUserClaims(reloadUserInfo) {
  const { customAttributes = '{}' } = reloadUserInfo;
  const claims = JSON.parse(customAttributes);
  return claims;
}

function isAdmin(user) {
  if (!user) return false;
  const { reloadUserInfo = {} } = user;
  const { isAdmin = '' } = getUserClaims(reloadUserInfo);
  return isAdmin;
}

function getUserData(user) {
  const { reloadUserInfo } = user || {};
  const data = JSON.parse(JSON.stringify(reloadUserInfo));
  data.claims = getUserClaims(reloadUserInfo);
  data.uid = data.localId;
  data.emailVerified = user.emailVerified;
  data.accessToken = user.accessToken;
  delete data.localId;
  delete data.customAttributes;
  delete data.passwordHash;
  delete data.passwordUpdatedAt;
  delete data.providerUserInfo;
  return data;
}

export { getUserData, isAdmin };
