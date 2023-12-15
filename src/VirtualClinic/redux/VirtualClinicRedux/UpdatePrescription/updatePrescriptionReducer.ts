import {
  UPDATE_PRESCRIPTION_LOADING,
  UPDATE_PRESCRIPTION_SUCCESS,
  UPDATE_PRESCRIPTION_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  updatePrescriptionLoading: false,
  updatePrescription: null,
};

export const updatePrescriptionReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case UPDATE_PRESCRIPTION_LOADING:
      return { ...state, updatePrescriptionLoading: action.payload };
    case UPDATE_PRESCRIPTION_SUCCESS:
      return {
        ...state,
        updatePrescription: action.payload,
      };
    case UPDATE_PRESCRIPTION_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
