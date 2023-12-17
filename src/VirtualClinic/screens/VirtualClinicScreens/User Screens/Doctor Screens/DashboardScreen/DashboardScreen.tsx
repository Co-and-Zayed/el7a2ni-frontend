import styles from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Doctor Screens/DashboardScreen/DashboardScreen.module.css";
import { useNav } from "VirtualClinic/hooks/useNav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import React from "react";
import type { ColumnsType } from "antd/es/table";
import { listAllPatientsAction } from "VirtualClinic/redux/VirtualClinicRedux/ListAllPatients/listAllPatientsAction";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button, notification } from "antd";
import * as Routes from "VirtualClinic/Routes/VirtualClinicRoutes/paths";
import { useFunctions } from "hooks/useFunctions";
import ContractScreen from "../ContractScreen/ContractScreen";
import SubmitButton from "VirtualClinic/components/SubmitButton/SubmitButton";
//import { listAllUsersAction } from "redux/VirtualClinicRedux/ListAllUsers/listAllUsersAction";
import { listAllContractsAction } from "VirtualClinic/redux/VirtualClinicRedux/ListAllContracts/listAllContractsAction";
import { UPDATE_USER_DATA } from "VirtualClinic/redux/User/loginTypes";

const DashboardScreen = () => {
  const dispatch: any = useDispatch();

  const { patientsLoading, allPatients } = useSelector(
    (state: RootState) => state.listAllPatientsReducer
  );

  const { userData, accessToken } = useSelector(
    (state: RootState) => state.userReducer
  );

  const { allContracts } = useSelector(
    (state: RootState) => state.listAllContractsReducer
  );

  const { handleDownload } = useFunctions();

  useEffect(() => {
    dispatch(listAllContractsAction());
    console.log("USERDATA", userData);
  }, []);

  const generateExpandable = (record: any) => {
    return (
      <div>
        <p>
          <strong>Health Records:</strong> {record.healthRecords}
        </p>
        <p>
          <strong>Mobile Number:</strong> {record.mobileNumber}
        </p>
        <p>
          <strong>Emergency Contact Name:</strong> {record.emergencyContactName}
        </p>
        <p>
          <strong>Emergency Contact Number:</strong>{" "}
          {record.emergencyContactNumber}
        </p>
      </div>
    );
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedKeys, setSelectedKeys] = useState([]);
  const navigate = useNav();
  const [selectedRowKey, setSelectedRowKey] = useState<string>("");
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const handleExpand = (expanded: boolean, record: DataType) => {
    const key = record.key.toString();
    if (expanded) {
      setExpandedRowKeys([...expandedRowKeys, key]);
    } else {
      setExpandedRowKeys(expandedRowKeys.filter((k) => k !== key));
    }
  };

  const handleRowSelect = (record: DataType) => {
    const key = record.key.toString();
    setSelectedRowKey(key);
    handleExpand(true, record);
  };

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    setSearchText(
      selectedKeys[0] !== undefined ? selectedKeys[0].toString() : ""
    );
    setSearchedColumn(dataIndex);
    confirm();
  };

  const handleReset = (clearFilters: any) => {
    setSearchText("");
    setSearchedColumn("");
    clearFilters();
  };

  const handleResetSearch = () => {
    setSelectedKeys([]); // Clear the selected keys (search value)
    setSearchText(""); // Clear the search text
    setSearchedColumn(""); // Clear the searched column
  };

  const handleContractRequest = async (ID: any, values: any) => {
    const res: any = await fetch(
      `${process.env.REACT_APP_BACKEND_CLINIC}doctor/${values}Contract`,
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

    console.log("DOCTOR DATA", data.doctor);
    await dispatch({ type: UPDATE_USER_DATA, payload: data.doctor });
    window.location.reload();
    notification.success({
      message: "Contract Status Updated Successfully",
      placement: "topRight",
    });
  };

  interface DataType {
    key: React.Key;
    name: string;
    email: string;
    healthRecords: string;
    date_of_birth: Date;
    gender: string;
    mobileNumber: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
  }

  return userData?.status === "ACCEPTED" ? (
    <div>Welcome to El7a2ni</div>
  ) : userData?.status === "WAITING" ? (
    // <ContractScreen />
    <div className={`${styles.termsText}`}>
      <p className="pageHeading">Terms and Conditions</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to El7a2ni Virtual Clinic ("El7a2ni," "we," "our," or "us").
        These Terms and Conditions ("Terms") govern your access to and use of
        our virtual clinic platform as a registered doctor. By accepting these
        Terms, you acknowledge that you have read, understood, and agree to be
        bound by all the terms and conditions outlined herein.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        To register as a doctor on El7a2ni, you must hold a valid medical
        license, provide accurate and complete registration information, and
        comply with all applicable laws and regulations. El7a2ni reserves the
        right to verify your credentials and deny access if any information is
        found to be false or misleading.
      </p>

      <h2>3. Acceptance of Contract</h2>
      <p>
        Upon successful registration, you agree to enter into a contractual
        relationship with El7a2ni. This contractual agreement is subject to the
        terms and conditions outlined in this document. You have the right to
        review and either accept or reject this contract.
      </p>

      <h2>4. Employment Contract</h2>
      <p>
        As a registered doctor on El7a2ni, you acknowledge and agree to abide by
        the terms of the employment agreement. This agreement includes details
        about your hourly rate, affiliation with a hospital, and the markup
        applied by El7a2ni to ensure the clinic's profitability.
      </p>

      <h2>5. Document Submission</h2>
      <p>
        You are required to submit valid and up-to-date documents, including but
        not limited to your identification, medical licenses, and medical
        degree. Failure to provide accurate and complete documentation may
        result in the rejection of your registration or termination of your
        account.
      </p>

      <h2>6. Acceptance of Patients</h2>
      <p>
        El7a2ni reserves the right to review and approve the requests submitted
        by patients to register with you. You have the option to accept or
        reject patients based on your availability and professional discretion.
      </p>

      <h2>7. Availability</h2>
      <p>
        You agree to update your availability by adding time slots for
        appointments only after accepting the employment agreement and being
        approved by El7a2ni. This ensures accurate scheduling and availability
        for patients.
      </p>

      <h2>8. Confidentiality</h2>
      <p>
        As a registered doctor, you are expected to uphold patient
        confidentiality and adhere to all relevant privacy laws and regulations.
        Any violation of patient privacy will result in immediate termination of
        your account and legal action if necessary.
      </p>

      <h2>9. Responsibility of Health Records</h2>
      <p>
        You are solely responsible for maintaining and updating the health
        records of patients who have had at least one appointment with you.
        Patient health records must be accurate, up-to-date, and stored securely
        within the El7a2ni platform.
      </p>

      <h2>10. Acceptance of Appointments</h2>
      <p>
        By accepting the contractual agreement, you commit to accepting or
        rejecting appointment requests in a timely manner. Patients rely on your
        availability, and any unresponsiveness may negatively impact their
        experience with El7a2ni.
      </p>

      <h2>11. Follow-up Sessions</h2>
      <p>
        You may schedule follow-up sessions for patients as needed. Patients
        have the option to accept or revoke follow-up session requests. Mutual
        consent is essential for maintaining a positive doctor-patient
        relationship.
      </p>

      <h2>12. Termination</h2>
      <p>
        El7a2ni reserves the right to terminate your account if you violate any
        of the terms and conditions outlined in this document. Termination may
        occur with or without notice.
      </p>

      <h2>13. Modification of Terms</h2>
      <p>
        El7a2ni reserves the right to modify or update these Terms at any time.
        Registered doctors will be notified of any changes, and continued use of
        the platform constitutes acceptance of the revised Terms.
      </p>

      <h2>14. Contact Information</h2>
      <p>
        For any questions or concerns regarding these Terms and Conditions,
        please contact us at{" "}
        <a className={`${styles.mailLink}`} href="mailto:el7a2ni@gmail.com">
          el7a2ni@gmail.com
        </a>
        .
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
  ) : (
    <p>Unfortunately, your application has been rejected.</p>
  );
};

export default DashboardScreen;
