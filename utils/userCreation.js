exports.validateUserCreation = (userInfo) => {
  return userInfo && typeof userInfo === "string";
};
