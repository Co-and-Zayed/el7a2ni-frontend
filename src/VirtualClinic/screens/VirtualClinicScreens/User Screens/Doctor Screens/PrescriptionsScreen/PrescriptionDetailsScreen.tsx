import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { listSinglePrescriptionAction } from "../../../../../redux/VirtualClinicRedux/ListSinglePrescription/listSinglePrescriptionAction";
import { useEffect, useState } from "react";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";
import { deleteMedicineFromPrescriptionAction } from "VirtualClinic/redux/VirtualClinicRedux/DeleteMedicineFromPrescription/deleteMedicineFromPrescriptionAction";
import { updatePrescriptionAction } from "VirtualClinic/redux/VirtualClinicRedux/UpdatePrescription/updatePrescriptionAction";
import { Button, Input } from "antd";

const DoctorPrescriptionDetailsScreen = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: any = useDispatch();

  const [editableMedicineId, setEditableMedicineId] = useState<string | null>(
    null
  );
  const [editedDosage, setEditedDosage] = useState<string>("");
  const [editedQuantity, setEditedQuantity] = useState<string>("");
  const [editedDuration, setEditedDuration] = useState<string>("");
  const handleDeleteMedicine = (prescriptionId: string, medicineId: string) => {
    dispatch(
      deleteMedicineFromPrescriptionAction({
        prescriptionID: prescriptionId,
        id: medicineId,
      })
    );
    window.location.reload();
  };
  const handleEditChange = (value: string, field: string) => {
    switch (field) {
      case "dosage":
        setEditedDosage(value);
        break;
      case "quantity":
        setEditedQuantity(value);
        break;
      case "duration":
        setEditedDuration(value);
        break;
      default:
        break;
    }
  };

  const handleEditMedicine = (medicineId: string) => {
    setEditableMedicineId(medicineId);
  };

  const handleSaveEdit = (prescriptionId: string, medicineId: string) => {
    dispatch(
      updatePrescriptionAction({
        prescriptionID: prescriptionId,
        medicineID: medicineId,
        dosage: editedDosage,
        quantity: editedQuantity,
        duration: editedDuration,
      })
    );
    window.location.reload();

    setEditableMedicineId(null);
    setEditedDosage("");
    setEditedQuantity("");
    setEditedDuration("");
  };

  const { prescriptionLoading, prescription } = useSelector(
    (state: RootState) => state.listSinglePrescriptionReducer
  );

  useEffect(() => {
    dispatch(listSinglePrescriptionAction(id));
  }, [dispatch, id]);

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
          </p>{" "}
          <h3 className={`font-bold`}>Medicines:</h3>
          {prescription?.medicines?.map((medicine: any, index: any) => (
            <div key={index}>
              <h1 className={`font-bold`}>Medicine Name:</h1>
              <p className={`ml-1`}>{medicine.name}</p>
              <h1 className={`font-bold`}>Dosage:</h1>
              {editableMedicineId === medicine.medicineID ? (
                <Input
                  placeholder="Edit Dosage"
                  value={editedDosage}
                  onChange={(e) => handleEditChange(e.target.value, "dosage")}
                />
              ) : (
                <p className={`ml-1`}>{medicine.dosage}</p>
              )}
              <h1 className={`font-bold`}>Quantity:</h1>
              {editableMedicineId === medicine.medicineID ? (
                <Input
                  placeholder="Edit Quantity"
                  value={editedQuantity}
                  onChange={(e) => handleEditChange(e.target.value, "quantity")}
                />
              ) : (
                <p className={`ml-1`}>{medicine.quantity}</p>
              )}
              <h1 className={`font-bold`}>Duration:</h1>
              {editableMedicineId === medicine.medicineID ? (
                <Input
                  placeholder="Edit Duration"
                  value={editedDuration}
                  onChange={(e) => handleEditChange(e.target.value, "duration")}
                />
              ) : (
                <p className={`ml-1`}>{medicine.duration}</p>
              )}
              {editableMedicineId === medicine.medicineID ? (
                <Button
                  type="primary"
                  onClick={() =>
                    handleSaveEdit(prescription?._id, medicine.medicineID)
                  }
                >
                  Save Changes
                </Button>
              ) : (
                <div>
                  <Button
                    type="primary"
                    onClick={() => handleEditMedicine(medicine.medicineID)}
                  >
                    Edit This Medicine
                  </Button>
                  <Button
                    type="primary"
                    onClick={() =>
                      handleDeleteMedicine(
                        prescription?._id,
                        medicine.medicineID
                      )
                    }
                  >
                    Delete This Medicine
                  </Button>
                </div>
              )}
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorPrescriptionDetailsScreen;
