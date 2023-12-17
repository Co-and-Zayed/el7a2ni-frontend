import {
    GET_MEDICINES_PATIENT_LOADING,
    GET_MEDICINES_PATIENT_SUCCESS,
    GET_MEDICINES_PATIENT_FAILURE,
  } from "Pharmacy/redux/PharmacyRedux/types";
  
  const initialState = {
   getMedicinesPatientLoading: false,
   getMedicinesPatient: null,
  };
  
  export const getMedicinesPatientReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case GET_MEDICINES_PATIENT_LOADING:
        return { ...state, getMedicinesPatientLoading: action.payload };
      case GET_MEDICINES_PATIENT_SUCCESS:
        return {
          ...state,
          getMedicinesPatient: action.payload,
        };
      case GET_MEDICINES_PATIENT_FAILURE:
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };
  