import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { listSinglePrescriptionAction } from "../../../../../redux/VirtualClinicRedux/ListSinglePrescription/listSinglePrescriptionAction";
import { useEffect, useState } from "react";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";
import { deleteMedicineFromPrescriptionAction } from "VirtualClinic/redux/VirtualClinicRedux/DeleteMedicineFromPrescription/deleteMedicineFromPrescriptionAction";
import { Button } from "antd";
const DoctorPrescriptionDetailsScreen = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: any = useDispatch();

  // Function to handle deleting a specific medicine from the prescription
  const handleDeleteMedicine = (prescriptionId: string, medicineId: string) => {
    dispatch(
      deleteMedicineFromPrescriptionAction({
        prescriptionID: prescriptionId,
        id: medicineId,
      })
    );
    window.location.reload();
  };
  const [refresh, setRefresh] = useState(false);

  const { prescriptionLoading, prescription } = useSelector(
    (state: RootState) => state.listSinglePrescriptionReducer
  );
  useEffect(() => {
    dispatch(listSinglePrescriptionAction(id));
  }, []);

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Prescriptions Details Screen</h1>
      {prescriptionLoading ? (
        <JellyLoader />
      ) : (
        <div className={`w-full flex flex-col items-start justify-center`}>
          <h3 className={`font-bold`}>Patient Name:</h3>
          <p className={`ml-1`}> {prescription?.patientName}</p>
          <h3 className={`font-bold`}>Doctor Name:</h3>
          <p className={`ml-1`}>{prescription?.doctorName}</p>
          <h3 className={`font-bold`}>Date:</h3>
          <p className={`ml-1`}>
            {prescription?.date.toString().split("T")[0]}
          </p>
          <h3 className={`font-bold`}>Status:</h3>
          <p className={`ml-1`}>
            {prescription?.filled ? "Filled" : "Unfilled"}
          </p>
          <h3 className={`font-bold`}>Medicines:</h3>
          <p>
            {prescription?.medicines?.map((medicine: any, index: any) => {
              return (
                <div>
                  <h1 className={`font-bold`}>Medicine Name:</h1>
                  <p className={`ml-1`}>{medicine.name}</p>
                  <h1 className={`font-bold`}>Dosage:</h1>
                  <p className={`ml-1`}>{medicine.dosage}</p>
                  <h1 className={`font-bold`}>Quantity:</h1>
                  <p className={`ml-1`}>{medicine.quantity}</p>
                  <h1 className={`font-bold`}>Duration:</h1>
                  <p className={`ml-1`}>{medicine.duration}</p>
                  <Button
                    type="primary"
                    onClick={() =>
                      handleDeleteMedicine(
                        prescription?._id,
                        medicine?.medicineID
                      )
                    }
                  >
                    Delete This Medicine
                  </Button>
                  <hr />
                </div>
              );
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorPrescriptionDetailsScreen;
