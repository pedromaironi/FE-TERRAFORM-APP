import axios from "axios";

const AUTH_API_URL = "http://34.19.106.52/auth/login";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (accessToken) => ({
  type: LOGIN_SUCCESS,
  payload: accessToken,
});
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (username, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(AUTH_API_URL, {
      username,
      password,
    });
    const data = response.data;
    if (response.status === 201) {
      console.log("Login response:", data);
      console.log(data);
      localStorage.setItem("token", data.accessToken);
      dispatch(loginSuccess(data.accessToken));
    } else {
      dispatch(loginFailure(data.message));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
