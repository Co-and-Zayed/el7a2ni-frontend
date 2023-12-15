import {
  DELETE_MEDICINE_FROM_PRESCRIPTION_LOADING,
  DELETE_MEDICINE_FROM_PRESCRIPTION_SUCCESS,
  DELETE_MEDICINE_FROM_PRESCRIPTION_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  deleteMedicineFromPrescriptionLoading: false,
  deleteMedicineFromPrescription: null,
};

export const deleteMedicineFromPrescriptionReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case DELETE_MEDICINE_FROM_PRESCRIPTION_LOADING:
      return {
        ...state,
        deleteMedicineFromPrescriptionLoading: action.payload,
      };
    case DELETE_MEDICINE_FROM_PRESCRIPTION_SUCCESS:
      return {
        ...state,
        deletedPackage: action.payload,
      };
    case DELETE_MEDICINE_FROM_PRESCRIPTION_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
