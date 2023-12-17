import { Dispatch } from "redux";
import api from "Pharmacy/api";
import { archiveMedicine } from "Pharmacy/api/PharmacyRedux/apiUrls"; // Import your api url here
import {
  ARCHIVE_MEDICINE_LOADING,
  ARCHIVE_MEDICINE_SUCCESS,
  ARCHIVE_MEDICINE_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types"; // Import your action types here

export const archiveMedicineAction =
  (requestBody: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ARCHIVE_MEDICINE_LOADING, payload: true });

      const response = await api.post(
        archiveMedicine(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({
        type: ARCHIVE_MEDICINE_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: ARCHIVE_MEDICINE_FAILURE, payload: err });
    } finally {
      dispatch({ type: ARCHIVE_MEDICINE_LOADING, payload: false });
    }
  };
