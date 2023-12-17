import {
  ADD_PRESCRIPTION_FAILURE,
  ADD_PRESCRIPTION_LOADING,
  ADD_PRESCRIPTION_SUCCESS,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  addPrescriptionLoading: false,
  confirm: null,
};

export const addPrescriptionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_PRESCRIPTION_LOADING:
      return { ...state, addPrescriptionLoading: action.payload };
    case ADD_PRESCRIPTION_SUCCESS:
      return {
        ...state,
        confirm: action.payload,
      };
    case ADD_PRESCRIPTION_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
