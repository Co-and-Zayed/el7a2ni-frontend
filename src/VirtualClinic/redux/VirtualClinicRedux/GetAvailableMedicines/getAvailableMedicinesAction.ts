import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { getAvailableMedicines } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  GET_AVAILABLE_MEDICINES_FAILURE,
  GET_AVAILABLE_MEDICINES_LOADING,
  GET_AVAILABLE_MEDICINES_SUCCESS,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const getAvailableMedicinesAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_AVAILABLE_MEDICINES_LOADING, payload: true });

      const response = await api.get(
        getAvailableMedicines(),
        requestBody // (for requests with a body)
      );

      dispatch({
        type: GET_AVAILABLE_MEDICINES_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: GET_AVAILABLE_MEDICINES_FAILURE, payload: err });
    } finally {
      dispatch({ type: GET_AVAILABLE_MEDICINES_LOADING, payload: false });
    }
  };
