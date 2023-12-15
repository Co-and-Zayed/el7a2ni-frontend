export const listAllUsers = () => {
  return `userAPI/getUsers`;
};

// SHADY URLs
// Patient Get All Doctors
export const patientGetDoctors = () => {
  return `patient/getDoctors`;
};

// Patient Search for Doctors By Name and/or Speciality
export const patientSearchDoctors = () => {
  return `patient/getDoctorsByNameSpeciality`;
};

// Patient Search for Doctors By Name and/or Speciality
export const patientFilterDoctors = () => {
  return `patient/filterDoctors`;
};

// List All Specialities
export const allSpecialities = () => {
  return `dropdown/specialities`;
};

// ZEINA URLs
export const getDoctorInfo = () => {
  return `patient/getDoctordetails`;
};

//// NEVEEN URLs
export const listAllPatients = () => {
  return `doctor/getPatients`;
};

export const listPatientInfo = () => {
  return `doctor/getPatientInfo`;
};

export const listPatientByName = () => {
  return `doctor/getPatientByName/`;
};

export const listUpcomingAppointments = () => {
  return `doctor/getUpcomingAptmnts/`;
};

export const listPatientAppointments = (userType: any) => {
  return `patient/getAppointments/${userType}`;
};

export const viewSettings = () => {
  return `doctor/viewSettings`;
};

export const editSettings = () => {
  return `doctor/editSettings`;
};

//// MOSTAFA URLs
export const createAppointment = () => {
  return `patient/createAppointment`;
};
export const getAppointments = (type: any) => {
  return `${type.toLowerCase()}/getAppointments`;
};
export const deleteAppointment = (id: any) => {
  return `patient/deleteAppointment/${id}`;
};
export const updateAppointment = (id: any) => {
  return `patient/updateAppointment/${id}`;
};
export const addFamilyMember = () => {
  return "patient/addFamilyMember";
};
export const getFamilyMembers = () => {
  return "patient/getFamilyMembers";
};

// YOUSSEF URLs
export const listAllPrescriptions = () => {
  return "prescriptionAPI/getPrescriptions";
};

export const listSinglePrescription = (id: any) => {
  return `prescriptionAPI/getPrescription/${id}`;
};

export const listAllPatientHealthRecords = () => {
  return `patient/getHealthRecords`;
};

// SEIF URLs
export const listAllPackages = () => {
  return `getPackages`;
};

export const updatePackage = (id: any) => {
  return `admin/updatePackage/${id}`;
};

export const createPackage = () => {
  return `admin/createPackage`;
};

export const deletePackage = (id: any) => {
  return `admin/deletePackage/${id}`;
};

export const listAllAdmins = (id: any) => {
  return `admin/viewAllAdmins/${id}`;
};

export const createAdmin = () => {
  return `admin/createAdmin`;
};

export const deleteAdmin = () => {
  return `admin/deleteAdmin`;
};

export const viewDoctors = () => {
  return `admin/viewDoctors`;
};

export const viewPatients = () => {
  return `admin/viewPatients`;
};

export const deleteDoctor = () => {
  return `admin/deleteDoctor`;
};

export const deletePatient = () => {
  return `admin/deletePatient`;
};

export const acceptDoctor = () => {
  return `admin/acceptDoctor`;
};

export const rejectDoctor = () => {
  return `admin/rejectDoctor`;
};

export const viewAllContracts = () => {
  return `doctor/viewAllContracts`;
};

export const viewPackages = () => {
  return `patient/viewPackages`;
};
export const viewPackagePrice = () => {
  return `patient/viewPackagePrice`;
};
export const viewSubscribedPackageforFamilyMember = () => {
  return `patient/viewSubscribedPackageforFamilyMember`;
};
export const unsubscribeFromPackage = () => {
  return `patient/unsubscribeFromPackage`;
};
export const unsubscribeFromPackageForFamily = () => {
  return `patient/unsubscribeFromPackageForFamily`;
};

export const viewPrescriptionsDoctor = () => {
  return `doctor/getAllPrescriptions`;
};
export const getAvailableMedicines = () => {
  return `doctor/getAvailableMedicines`;
};
export const addMedicineToPrescription = () => {
  return `doctor/addMedicineToPrescription`;
};
export const deleteMedicineFromPrescription = () => {
  return `doctor/deleteMedicineFromPrescription`;
};
export const addPrescription = () => {
  return `doctor/addPrescription`;
};
export const updatePrescription = () => {
  return `doctor/updatePrescription`;
};
