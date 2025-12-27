module.exports = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{9,}$/;
  return regex.test(password);
};
