const { request } = require("@/utils");

function getChannelsAPI() {
  return request({
    url: "/channels",
    method: "GET",
  });
}

function createChannelsAPI(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data,
  });
}

function getArticleListAPI(params) {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
}

function deleteArticleAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: "DELETE",
  });
}

function getArticleAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: "GET",
  });
}

function updateArticleAPI(data) {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: "PUT",
    data,
  });
}

export {
  getChannelsAPI,
  createChannelsAPI,
  getArticleListAPI,
  deleteArticleAPI,
  getArticleAPI,
  updateArticleAPI,
};
