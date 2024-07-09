import { getProfileAPI, loginAPI } from "@/apis/user";
import {
  getToken,
  removeToken,
  setToken as setLocalStorageToken,
} from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      setLocalStorageToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    logout(state, action) {
      state.userInfo = {};
      state.token = "";
      removeToken();
    },
  },
});

const reducer = userStore.reducer;
const { setToken, setUserInfo, logout } = userStore.actions;

function login(data) {
  return async (dispatch) => {
    const res = await loginAPI(data);
    dispatch(setToken(res.data.token));
  };
}
function fetchUserInfo() {
  return async (dispatch) => {
    const res = await getProfileAPI();
    dispatch(setUserInfo(res.data));
  };
}

export { login, fetchUserInfo, logout };
export default reducer;
