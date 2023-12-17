import { Dispatch } from "redux";
import api from "Pharmacy/api";
import { getMedicinesPatient } from "Pharmacy/api/PharmacyRedux/apiUrls"; // Import your api url here
import {
  GET_MEDICINES_PATIENT_LOADING,
  GET_MEDICINES_PATIENT_SUCCESS,
  GET_MEDICINES_PATIENT_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types"; // Import your action types here

export const getMedicinesPatientAction =
(requestBody?: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_MEDICINES_PATIENT_LOADING, payload: true });

    const response = await api.post(
      getMedicinesPatient(), // Your Endpoint
       requestBody, // (for requests with a body)
    );

    dispatch({ type: GET_MEDICINES_PATIENT_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: GET_MEDICINES_PATIENT_FAILURE, payload: err });
  } finally {
    dispatch({ type: GET_MEDICINES_PATIENT_LOADING, payload: false });
  }
};
