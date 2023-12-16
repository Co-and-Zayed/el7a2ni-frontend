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
};

export const createAppointmentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case POST_APPOINTMENT_DATA_LOADING:
      return { ...state, appointmentLoading: action.payload };
    case POST_APPOINTMENT_DATA_STATE:
      console.log("UPDATING PAGE STATE", action.payload);
      return { ...state, updateWalletPage: action.payload };
    case POST_APPOINTMENT_DATA_SUCCESS:
      return {
        ...state,
        response_message: action.payload,
      };
    case POST_APPOINTMENT_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
