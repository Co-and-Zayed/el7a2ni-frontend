import { Dispatch } from "redux";
import api from "Pharmacy/api";
import { viewSalesReport } from "Pharmacy/api/PharmacyRedux/apiUrls"; // Import your api url here
import {
  VIEW_SALES_REPORTS_LOADING,
  VIEW_SALES_REPORTS_SUCCESS,
  VIEW_SALES_REPORTS_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types"; // Import your action types here

export const viewSalesReportsAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: VIEW_SALES_REPORTS_LOADING, payload: true });

      const response = await api.post(
        viewSalesReport(), // Your Endpoint
        // requestBody, // (for requests with a body)
      );

      dispatch({ type: VIEW_SALES_REPORTS_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: VIEW_SALES_REPORTS_FAILURE, payload: err });
    } finally {
      dispatch({ type: VIEW_SALES_REPORTS_LOADING, payload: false });
    }
  };
