import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "redux/Register/registerTypes";

import { Dispatch } from "redux";

import { registerService } from "services/registerService";
import { LOGIN_SUCCESS } from "redux/User/loginTypes";

export const regsiterAction = (data: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: REGISTER_LOADING, payload: true });
    const response = await registerService(data);
    console.log(response);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: REGISTER_FAILURE, payload: false });
  } finally {
    dispatch({ type: REGISTER_LOADING, payload: false });
  }
};
