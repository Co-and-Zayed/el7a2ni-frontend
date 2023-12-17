import * as Routes from "Pharmacy/Routes/PharmacyRoutes/paths";
import {
  AppointmentsIcon,
  DashboardIcon,
  DoctorsIcon,
  FamilyIcon,
  HealthIcon,
  LockIcon,
  PrescriptionsIcon,
  ProfileIcon,
} from "Pharmacy/assets/IconComponents";

import PatientPasswordScreen from "Pharmacy/screens/User Screens/Patient Screens/SettingsScreen/PasswordScreen/PasswordScreen";
import PatientProfileScreen from "Pharmacy/screens/User Screens/Patient Screens/SettingsScreen/ProfileScreen/ProfileScreen";
import { ChatIcon } from "VirtualClinic/assets/IconComponents";

export const navLinksPatient = [
  {
    name: "Dashboard",
    route: Routes.DASHBOARD_PATH,
    icon: <DashboardIcon />,
  },
  {
    name: "Medicine",
    route: Routes.MEDICINE_PATH,
    icon: <PrescriptionsIcon />,
  },
  {
    name: "Order",
    route: Routes.ORDER_PATH,
    icon: <AppointmentsIcon />,
  },
  {
    name: "Customer Support",
    route: Routes.CHAT_PATH,
    icon: <ChatIcon />,
  },
];

export const settingsPatient = [
  {
    name: "Profile",
    route: Routes.SETTINGS_PATH + Routes.PROFILE_PATH,
    sub_page: <PatientProfileScreen />,
    icon: <ProfileIcon />,
  },
  {
    name: "Password",
    route: Routes.SETTINGS_PATH + Routes.PASSWORD_PATH,
    sub_page: <PatientPasswordScreen />,
    icon: <LockIcon />,
  },
];

export const settingsPharmacist = [
  {
    name: "Profile",
    route: Routes.SETTINGS_PATH + Routes.PROFILE_PATH,
    sub_page: <PatientProfileScreen />,
    icon: <ProfileIcon />,
  },
  {
    name: "Password",
    route: Routes.SETTINGS_PATH + Routes.PASSWORD_PATH,
    sub_page: <PatientPasswordScreen />,
    icon: <LockIcon />,
  },
];

export const settingsAdmin = [
  {
    name: "Profile",
    route: Routes.SETTINGS_PATH + Routes.PROFILE_PATH,
    sub_page: <PatientProfileScreen />,
    icon: <ProfileIcon />,
  },
  {
    name: "Password",
    route: Routes.SETTINGS_PATH + Routes.PASSWORD_PATH,
    sub_page: <PatientPasswordScreen />,
    icon: <LockIcon />,
  },
];

export const navLinksPharmacist = [
  {
    name: "Dashboard",
    route: Routes.DASHBOARD_PATH,
    icon: <DashboardIcon />,
  },
  {
    name: "Medicine",
    route: Routes.MEDICINE_PATH,
    icon: <PrescriptionsIcon />,
  },
  {
    name: "Sales Reports",
    route: Routes.VIEW_SALES_REPORT_PATH,
    icon: <PrescriptionsIcon />,
  },
  {
    name: "Customer Support",
    route: Routes.CHAT_PATH,
    icon: <ChatIcon />,
  },
];

export const navLinksAdmin = [
  {
    name: "Admins",
    route: Routes.ADMINS_PATH,
  },
  {
    name: "Pharmacists",
    route: Routes.VIEW_PHARMACISTS_PATH,
  },
  {
    name: "Patients",
    route: Routes.VIEW_PATIENTS_PATH,
  },
  {
    name: "Sales Reports",
    route: Routes.VIEW_SALES_REPORT_PATH,
    icon: <PrescriptionsIcon />,
  },
];

export const pendingNavLinksPharmacist = [
  {
    name: "Dashboard",
    route: Routes.DASHBOARD_PATH,
    icon: <DashboardIcon />,
  },
];
