import { Dispatch } from "redux";
import api from "Pharmacy/api";
import { listAllUsers } from "Pharmacy/api/PharmacyRedux/apiUrls"; // Import your api url here
import {
  USERS_DATA_LOADING,
  USERS_DATA_SUCCESS,
  USERS_DATA_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types"; // Import your action types here

export const listAllUsersAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: USERS_DATA_LOADING, payload: true });

      const response = await api.get(
        listAllUsers() // Your Endpoint
        // requestBody, // (for requests with a body)
      );

      dispatch({ type: USERS_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: USERS_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: USERS_DATA_LOADING, payload: false });
    }
  };
