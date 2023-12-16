import {
    VIEW_SALES_REPORTS_LOADING,
    VIEW_SALES_REPORTS_SUCCESS,
    VIEW_SALES_REPORTS_FAILURE,
  } from "Pharmacy/redux/PharmacyRedux/types";
  
  const initialState = {
    viewSalesReportsLoading: false,
    viewSalesReports: null,
  };
  
  export const viewSalesReportsReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case VIEW_SALES_REPORTS_LOADING:
        return { ...state, viewSalesReportsLoading: action.payload };
      case VIEW_SALES_REPORTS_SUCCESS:
        return {
          ...state,
          viewSalesReports: action.payload,
        };
      case VIEW_SALES_REPORTS_FAILURE:
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };
  