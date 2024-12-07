const TOKEN_KEY = 'auth_token';

const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

export { setToken, getToken, removeToken, isAuthenticated };