import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { updatePrescription } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  UPDATE_PRESCRIPTION_LOADING,
  UPDATE_PRESCRIPTION_SUCCESS,
  UPDATE_PRESCRIPTION_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const updatePrescriptionAction =
  (requestBody: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UPDATE_PRESCRIPTION_LOADING, payload: true });

      const response = await api.post(
        updatePrescription(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: UPDATE_PRESCRIPTION_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: UPDATE_PRESCRIPTION_FAILURE, payload: err });
    } finally {
      dispatch({ type: UPDATE_PRESCRIPTION_LOADING, payload: false });
    }
  };
