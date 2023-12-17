import { App } from "antd";
import {
  POST_APPOINTMENT_DATA_FAILURE,
  POST_APPOINTMENT_DATA_LOADING,
  POST_APPOINTMENT_DATA_SUCCESS,
  POST_APPOINTMENT_DATA_STATE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  appointmentLoading: false,
  response_message: null,
  updateWalletPage: false,
  statusCode: null,
};

export const createAppointmentReducer = (state = initialState, action: any) => {
  var sc = action.payload?.response?.status;
  switch (action.type) {
    case POST_APPOINTMENT_DATA_LOADING:
      return { ...state, appointmentLoading: action.payload, statusCode: sc };
    case POST_APPOINTMENT_DATA_STATE:
      console.log("UPDATING PAGE STATE", action.payload);
      return { ...state, updateWalletPage: action.payload, statusCode: sc };
    case POST_APPOINTMENT_DATA_SUCCESS:
      return {
        ...state,
        statusCode: sc,
        response_message: action.payload?.response,
      };
    case POST_APPOINTMENT_DATA_FAILURE:
      console.log("ERROR", action.payload);
      console.log("MESSAGE", action.payload?.response?.data?.message);
      return {
        ...state,
        response_message: action.payload?.response?.data?.message,
        statusCode: sc,
      };
    default:
      return state;
  }
};
