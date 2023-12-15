import {
  VIEW_PRESCRIPTIONS_DOCTOR_LOADING,
  VIEW_PRESCRIPTIONS_DOCTOR_SUCCESS,
  VIEW_PRESCRIPTIONS_DOCTOR_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  viewPrescriptionsDoctorLoading: false,
  viewPrescriptionsDoctor: null,
};

export const viewPrescriptionsDoctorReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case VIEW_PRESCRIPTIONS_DOCTOR_LOADING:
      return { ...state, viewPrescriptionsDoctorLoading: action.payload };
    case VIEW_PRESCRIPTIONS_DOCTOR_SUCCESS:
      return {
        ...state,
        viewPrescriptionsDoctor: action.payload,
      };
    case VIEW_PRESCRIPTIONS_DOCTOR_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
