import { Dispatch } from "redux";
import api from "Pharmacy/api";
import { unarchiveMedicine } from "Pharmacy/api/PharmacyRedux/apiUrls"; // Import your api url here
import {
  UNARCHIVE_MEDICINE_LOADING,
  UNARCHIVE_MEDICINE_SUCCESS,
  UNARCHIVE_MEDICINE_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types"; // Import your action types here

export const unarchiveMedicineAction =
  (requestBody: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UNARCHIVE_MEDICINE_LOADING, payload: true });

      const response = await api.post(
        unarchiveMedicine(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({
        type: UNARCHIVE_MEDICINE_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: UNARCHIVE_MEDICINE_FAILURE, payload: err });
    } finally {
      dispatch({ type: UNARCHIVE_MEDICINE_LOADING, payload: false });
    }
  };
