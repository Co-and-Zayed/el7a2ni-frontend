import {
    UNARCHIVE_MEDICINE_LOADING,
    UNARCHIVE_MEDICINE_SUCCESS,
    UNARCHIVE_MEDICINE_FAILURE,
  } from "Pharmacy/redux/PharmacyRedux/types";
  
  const initialState = {
    unarchiveMedicineLoading: false,
    unarchivedMedicine: null,
  };
  
  export const unarchiveMedicineReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case UNARCHIVE_MEDICINE_LOADING:
        return { ...state, unarchiveMedicineLoading: action.payload };
      case UNARCHIVE_MEDICINE_SUCCESS:
        return {
          ...state,
          unarchivedMedicine: action.payload,
        };
      case UNARCHIVE_MEDICINE_FAILURE:
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };
  