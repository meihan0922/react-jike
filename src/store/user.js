import { getToken, request, setToken as setLocalStorageToken } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      setLocalStorageToken(action.payload);
    },
  },
});

const reducer = userStore.reducer;
const { setToken } = userStore.actions;

function login(data) {
  return async (dispatch) => {
    const res = await request.post("/authorizations", data);
    dispatch(setToken(res.data.token));
  };
}

export { login };
export default reducer;
