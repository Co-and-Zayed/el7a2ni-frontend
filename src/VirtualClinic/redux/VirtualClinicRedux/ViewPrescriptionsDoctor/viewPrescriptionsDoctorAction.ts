import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { viewPrescriptionsDoctor } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  VIEW_PRESCRIPTIONS_DOCTOR_SUCCESS,
  VIEW_PRESCRIPTIONS_DOCTOR_FAILURE,
  VIEW_PRESCRIPTIONS_DOCTOR_LOADING,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const viewPrescriptionsDoctorAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: VIEW_PRESCRIPTIONS_DOCTOR_LOADING, payload: true });

      const response = await api.post(
        viewPrescriptionsDoctor(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({
        type: VIEW_PRESCRIPTIONS_DOCTOR_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: VIEW_PRESCRIPTIONS_DOCTOR_FAILURE, payload: err });
    } finally {
      dispatch({ type: VIEW_PRESCRIPTIONS_DOCTOR_LOADING, payload: false });
    }
  };
