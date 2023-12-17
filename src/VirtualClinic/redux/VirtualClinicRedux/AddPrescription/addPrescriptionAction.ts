import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { addPrescription } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  ADD_PRESCRIPTION_FAILURE,
  ADD_PRESCRIPTION_LOADING,
  ADD_PRESCRIPTION_SUCCESS,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const addPrescriptionAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ADD_PRESCRIPTION_LOADING, payload: true });

      const response = await api.post(
        addPrescription(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: ADD_PRESCRIPTION_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: ADD_PRESCRIPTION_FAILURE, payload: err });
    } finally {
      dispatch({ type: ADD_PRESCRIPTION_LOADING, payload: false });
    }
  };
