import {
  GET_AVAILABLE_MEDICINES_FAILURE,
  GET_AVAILABLE_MEDICINES_LOADING,
  GET_AVAILABLE_MEDICINES_SUCCESS,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  getAvailableMedicinesLoading: false,
  getAvailableMedicines: null,
};

export const getAvailableMedicinesReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case GET_AVAILABLE_MEDICINES_LOADING:
      return { ...state, getAvailableMedicinesLoading: action.payload };
    case GET_AVAILABLE_MEDICINES_SUCCESS:
      return {
        ...state,
        getAvailableMedicines: action.payload,
      };
    case GET_AVAILABLE_MEDICINES_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
