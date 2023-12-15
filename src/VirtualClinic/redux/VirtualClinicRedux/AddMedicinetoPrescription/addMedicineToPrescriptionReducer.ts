import {
  ADD_MEDICINE_TO_PRESCRIPTION_LOADING,
  ADD_MEDICINE_TO_PRESCRIPTION_SUCCESS,
  ADD_MEDICINE_TO_PRESCRIPTION_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  addMedicineToPrescriptionLoading: false,
  addMedicineToPrescription: null,
};

export const addMedicineToPrescriptionReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case ADD_MEDICINE_TO_PRESCRIPTION_LOADING:
      return { ...state, addMedicineToPrescriptionLoading: action.payload };
    case ADD_MEDICINE_TO_PRESCRIPTION_SUCCESS:
      return {
        ...state,
        addMedicineToPrescription: action.payload,
      };
    case ADD_MEDICINE_TO_PRESCRIPTION_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
