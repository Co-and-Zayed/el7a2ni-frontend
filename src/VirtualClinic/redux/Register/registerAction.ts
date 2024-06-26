import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "VirtualClinic/redux/Register/registerTypes";

import {
  LOGIN_USER,
  SHOULD_REFRESH,
} from "VirtualClinic/redux/User/loginTypes";

import { Dispatch } from "redux";

import { registerService } from "VirtualClinic/services/registerService";
import { LOGIN_SUCCESS } from "VirtualClinic/redux/User/loginTypes";

export const regsiterAction = (data: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: REGISTER_LOADING, payload: true });

    const response = await registerService(data);

    dispatch({ type: LOGIN_USER, payload: response.data });
    dispatch({ type: SHOULD_REFRESH, payload: "START" });
  } catch (err: any) {
    dispatch({ type: REGISTER_FAILURE, payload: false });
  } finally {
    dispatch({ type: REGISTER_LOADING, payload: false });
  }
};
