const { request } = require("@/utils");

function loginAPI(data) {
  return request({
    url: "/authorizations",
    method: "POST",
    data,
  });
}
function getProfileAPI() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}

export { loginAPI, getProfileAPI };
