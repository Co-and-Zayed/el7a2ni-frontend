import {
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "VirtualClinic/redux/Logout/logoutTypes";

import { LOG_OUT } from "VirtualClinic/redux/VirtualClinicRedux/types";

import { Dispatch } from "redux";

import { logoutService } from "VirtualClinic/services/logoutService";

export const logoutAction = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOGOUT_LOADING, payload: true });
    const response = await logoutService();
    dispatch({ type: LOGOUT_SUCCESS, payload: true });
    dispatch({ type: LOG_OUT });
  } catch (err) {
    dispatch({ type: LOGOUT_SUCCESS, payload: false });
    dispatch({ type: LOGOUT_FAILURE, payload: err });
  } finally {
    dispatch({ type: LOGOUT_LOADING, payload: false });
  }
};
