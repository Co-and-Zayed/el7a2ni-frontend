import styles from "Pharmacy/screens/User Screens/Pharmacist Screens/DashboardScreen/DashboardScreen.module.css";
import { useNav } from "Pharmacy/hooks/useNav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import React from "react";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button, notification } from "antd";
import * as Routes from "Pharmacy/Routes/PharmacyRoutes/paths";
import ContractScreen from "../ContractScreen/ContractScreen";
import { listAllContractsAction } from "Pharmacy/redux/PharmacyRedux/ListAllContracts/listAllContractsAction";
import { UPDATE_USER_DATA } from "Pharmacy/redux/User/loginTypes";
//import { listAllUsersAction } from "Pharmacy/redux/PharmacyRedux/ListAllUsers/listAllUsersAction";

const DashboardScreen = () => {
  const dispatch: any = useDispatch();

  const { userData, accessToken } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { allContracts } = useSelector(
    (state: RootState) => state.listAllContractsReducer
  );

  useEffect(() => {
    dispatch(listAllContractsAction());
    console.log("USERDATA", userData);
  }, []);

  const handleContractRequest = async (ID: any, values: any) => {
    const res: any = await fetch(
      `${process.env.REACT_APP_BACKEND_PHARMACY}pharmacist/${values}Contract`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          _id: ID,
        }),
      }
    );

    await dispatch(listAllContractsAction());
    const data = await res.json();

    console.log("PHARMACIST DATA", data.pharmacist);
    await dispatch({ type: UPDATE_USER_DATA, payload: data.pharmacist });
    window.location.reload();
    notification.success({
      message: "Contract Status Updated Successfully",
      placement: "topRight",
    });
  };

  return userData?.status === "ACCEPTED" ? (
    <div>Welcome to El7a2ni</div>
  ) : userData?.status === "WAITING" ? (
    // <ContractScreen />
    <div className={`${styles.termsText}`}>
      <p className="pageHeading">Terms and Conditions</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to the El7a2ni's Pharmacy Platform ("El7a2ni," "we," "our," or "us").
        These Terms and Conditions ("Terms") govern your access to and use of
        our pharmacy platform as a registered pharmacist. By accepting these
        Terms, you acknowledge that you have read, understood, and agree to be
        bound by all the terms and conditions outlined herein.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        To register as a pharmacist on the Pharmacy Platform, you must hold a
        valid pharmacy degree, provide accurate and complete registration
        information, and comply with all applicable laws and regulations. The
        Platform reserves the right to verify your credentials and deny access
        if any information is found to be false or misleading.
      </p>

      <h2>3. Acceptance of Registration</h2>
      <p>
        Upon successful registration, you agree to adhere to the terms and
        conditions outlined in this document. You have the responsibility to
        review and either accept or reject the registration terms and
        conditions.
      </p>

      <h2>4. Document Submission</h2>
      <p>
        Pharmacists are required to submit valid and up-to-date documents,
        including but not limited to identification, pharmacy degree, and
        working licenses. Failure to provide accurate and complete documentation
        may result in the rejection of your registration or termination of your
        account.
      </p>

      <h2>5. Account Management</h2>
      <p>
        Pharmacists, patients, and administrators have the ability to log in and
        log out using their respective usernames and passwords. Passwords must
        adhere to specific validation criteria, including the use of at least
        one capital letter and one number.
      </p>

      <h2>6. Password Recovery</h2>
      <p>
        In the event of a forgotten password, users can reset their password
        through a one-time password (OTP) sent to their registered email
        address.
      </p>

      <h2>7. View Medicines Information</h2>
      <p>
        Pharmacists, patients, and administrators can view a list of all
        available medicines, including details such as pictures, prices, and
        descriptions.
      </p>

      <h2>8. Search and Filter Medicines</h2>
      <p>
        Users can search for medicines by name and filter medicines based on
        medicinal use. Pharmacists can upload medicine images.
      </p>

      <h2>9. View Medicine Sales</h2>
      <p>
        Pharmacists can view the available quantity and sales of each medicine.
        Administrators and pharmacists can generate a total sales report based
        on a chosen month.
      </p>

      <h2>10. Cart Management</h2>
      <p>
        Patients can add prescription and over-the-counter medicines to their
        cart based on prescriptions. They can view, remove, change the amount of
        items, and checkout orders.
      </p>

      <h2>11. Order and Delivery</h2>
      <p>
        Patients can view current and past orders, add new delivery addresses,
        choose a delivery address, and select payment methods (wallet, credit
        card using Stripe, or cash on delivery).
      </p>

      <h2>12. Communication</h2>
      <p>
        Patients can chat with pharmacists, view order details and status, and
        cancel orders. Pharmacists can chat with doctors and receive
        notifications when a medicine is out of stock.
      </p>

      <h2>13. Wallet and Sales Reports</h2>
      <p>
        Patients and pharmacists can view the amount in their wallet.
        Pharmacists can archive/unarchive medicines and filter sales reports
        based on a medicine and date.
      </p>

      <h2>14. Contact Information</h2>
      <p>
        For any questions or concerns regarding these Terms and Conditions,
        please contact us at{" "}
        <a href="mailto:el7a2ni@gmail.com">el7a2ni@gmail.com</a>.
      </p>

      <p>
        By accepting these Terms and Conditions, you acknowledge that you have
        read, understood, and agreed to be bound by all the terms outlined
        herein.
      </p>

      <div className="w-full flex items-center justify-center">
        <div
          className={`${styles.customButton} mr-2`}
          onClick={() => handleContractRequest(allContracts[0]._id, "accept")}
        >
          Accept
        </div>
        <div
          className={`${styles.customButton} mr-2`}
          onClick={() => handleContractRequest(allContracts[0]._id, "reject")}
        >
          Reject
        </div>
      </div>
    </div>
  ) : userData?.status === "PENDING" ? (
    <p>Your documents are being reviewed</p>
  ) : userData?.status === "PENDING" ? (
    <p>Your documents are being reviewed</p>
  ) : (
    <p>Error 404</p>
  );
};

export default DashboardScreen;
