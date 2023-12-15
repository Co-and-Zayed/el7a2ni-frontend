import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { addMedicineToPrescription } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  ADD_MEDICINE_TO_PRESCRIPTION_SUCCESS,
  ADD_MEDICINE_TO_PRESCRIPTION_FAILURE,
  ADD_MEDICINE_TO_PRESCRIPTION_LOADING,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const addMedicineToPrescriptionAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ADD_MEDICINE_TO_PRESCRIPTION_LOADING, payload: true });

      const response = await api.post(
        addMedicineToPrescription(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({
        type: ADD_MEDICINE_TO_PRESCRIPTION_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: ADD_MEDICINE_TO_PRESCRIPTION_FAILURE, payload: err });
    } finally {
      dispatch({ type: ADD_MEDICINE_TO_PRESCRIPTION_LOADING, payload: false });
    }
  };
