import {
    ARCHIVE_MEDICINE_LOADING,
    ARCHIVE_MEDICINE_SUCCESS,
    ARCHIVE_MEDICINE_FAILURE,
  } from "Pharmacy/redux/PharmacyRedux/types";
  
  const initialState = {
    archiveMedicineLoading: false,
    archivedMedicine: null,
  };
  
  export const archiveMedicineReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case ARCHIVE_MEDICINE_LOADING:
        return { ...state, archiveMedicineLoading: action.payload };
      case ARCHIVE_MEDICINE_SUCCESS:
        return {
          ...state,
          archivedMedicine: action.payload,
        };
      case ARCHIVE_MEDICINE_FAILURE:
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };
  