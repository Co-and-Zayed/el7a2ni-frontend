import { useNav } from "Pharmacy/hooks/useNav";
import { useEffect, useState } from "react";

// import PatientSettingsScreen from "Pharmacy/screens/PharmacyScreens/User Screens/Patient Screens/SettingsScreen/SettingsScreen";
// import PharmacistSettingsScreen from "Pharmacy/screens/PharmacyScreens/User Screens/Pharmacist Screens/SettingsScreen/SettingsScreen";
import { useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import DoctorChatScreen from "components/DoctorChatScreen/ChatScreen";
import PatientChatScreen from "components/ChatScreen/ChatScreen";
import PharmChatScreen from "components/PharmChatScreen/ChatScreen";

const CommonChatScreen = () => {
  const { loginLoading, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  return userType === "PATIENT" ? (
    <PatientChatScreen />
  ) : userType === "DOCTOR" ? (
    <DoctorChatScreen />
  ) : (
    <PharmChatScreen />
  );
};

export default CommonChatScreen;
