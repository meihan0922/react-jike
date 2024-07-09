const TOKEN_KEY = "token_key";

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
function setToken(data) {
  return localStorage.setItem(TOKEN_KEY, data);
}
function removeToken() {
  return localStorage.removeItem(TOKEN_KEY);
}

export { getToken, setToken, removeToken };
