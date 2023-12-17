import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { deleteMedicineFromPrescription } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  DELETE_MEDICINE_FROM_PRESCRIPTION_LOADING,
  DELETE_MEDICINE_FROM_PRESCRIPTION_SUCCESS,
  DELETE_MEDICINE_FROM_PRESCRIPTION_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const deleteMedicineFromPrescriptionAction =
  (requestBody: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: DELETE_MEDICINE_FROM_PRESCRIPTION_LOADING,
        payload: true,
      });

      const response = await api.post(
        deleteMedicineFromPrescription(),
        requestBody // Your Endpoint
      );

      dispatch({
        type: DELETE_MEDICINE_FROM_PRESCRIPTION_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: DELETE_MEDICINE_FROM_PRESCRIPTION_FAILURE,
        payload: err,
      });
    } finally {
      dispatch({
        type: DELETE_MEDICINE_FROM_PRESCRIPTION_LOADING,
        payload: false,
      });
    }
  };
