import { Form, Input, Modal, Select, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { useFunctions } from "hooks/useFunctions";
import { set } from "mongoose";
import { useDispatch } from "react-redux";
import { getAvailableMedicinesAction } from "VirtualClinic/redux/VirtualClinicRedux/GetAvailableMedicines/getAvailableMedicinesAction";
import inputStyles from "VirtualClinic/components/InputField/InputField.module.css";
import { addMedicineToPrescriptionAction } from "VirtualClinic/redux/VirtualClinicRedux/AddMedicinetoPrescription/addMedicineToPrescriptionAction";
import { listAllPatientsAction } from "VirtualClinic/redux/VirtualClinicRedux/ListAllPatients/listAllPatientsAction";
import flex from "antd/es/flex";
import { addPrescriptionAction } from "VirtualClinic/redux/VirtualClinicRedux/AddPrescription/addPrescriptionAction";
interface AddNewPrescriptionModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddPrescription: () => void;
  recordKey: string; // Add this line to include recordKey property
}
interface Medicine {
  medicineID: string | null; // Add medicineID to the Medicine interface
  name: string;
  duration: string;
  dosage: string;
  quantity: string;
}
const AddNewPrescriptionModal: FC<AddNewPrescriptionModalProps> = ({
  visible,
  setVisible,
  recordKey,
  handleAddPrescription,
}) => {
  const { userType, userData } = useSelector(
    (state: RootState) => state.userReducer
  );

  const dispatch: any = useDispatch();

  const { getAvailableMedicines, getAvailableMedicinesLoading } = useSelector(
    (state: RootState) => state.getAvailableMedicinesReducer
  );
  const { addMedicineToPrescription, addMedicineToPrescriptionLoading } =
    useSelector((state: RootState) => state.addMedicineToPrescriptionReducer);
  useEffect(() => {
    dispatch(
      getAvailableMedicinesAction({
        username: userData?.username,
      })
    );
  }, []);
  const { handleUpload } = useFunctions();

  // States for all the input fields
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [dosage, setDosage] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [searchAvailableMedicines, setSearchAvailableMedicines] =
    useState(null);
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedMedicineIdArray, setSelectedMedicineIdArray] = useState<
    string[]
  >([]);

  const [loadingAdd, setLoadingAdd] = useState(false);
  const { allPatients, patientsLoading } = useSelector(
    (state: RootState) => state.listAllPatientsReducer
  );

  useEffect(() => {
    dispatch(
      listAllPatientsAction({
        username: userData?.username,
      })
    );
  }, []);
  function resetFields() {
    setName("");
    setDuration("");
    setDosage("");
    setQuantity("");
  }
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  async function handleAddNewMedicine() {
    setLoadingAdd(true);

    try {
      const medicineData: Medicine = {
        medicineID: selectedMedicineId, // Set medicineID
        name,
        duration,
        dosage,
        quantity,
      };

      // Add the medicine to the array
      setMedicines([...medicines, medicineData]);
      setSelectedMedicineIdArray([
        ...selectedMedicineIdArray,
        selectedMedicineId!,
      ]);

      setLoadingAdd(false);
      resetFields();
    } catch (err) {
      setLoadingAdd(false);
      notification.error({
        message: "Failed to add medicine!",
      });
    }
  }

  return (
    <Modal
      title="Add New Prescription"
      open={visible}
      onOk={() => {
        dispatch(
          addPrescriptionAction({
            patientUsername: selectedPatientId,
            doctorUsername: userData?.username,
            doctorName: userData?.name,
            medicines: medicines,
          })
        );
        setVisible(false);
        window.location.reload();
      }}
      onCancel={() => {
        resetFields();
        setVisible(false);
      }}
      okType="default"
      okText="Save"
      okButtonProps={{ loading: loadingAdd }}
      cancelText="Cancel"
    >
      {/* Input fields with all the attributes of the medicice */}
      <div className={`flex flex-col gap-y-4`}>
        {/*  DROPDOWN FOR PATIENTS */}
        <div className={`flex text-base gap-x-2 items-center`}>
          <label htmlFor="patient" className={`text-lg`}>
            Choose Patient
          </label>
          <Select
            placeholder="Select a Patient"
            showSearch
            allowClear
            onClear={() => {
              setSelectedPatientId(null);
            }}
            value={selectedPatientId}
            onSelect={(value) => {
              setSelectedPatientId(value);
            }}
            optionFilterProp="children"
            options={allPatients?.map((patient: any) => ({
              value: patient.username,
              label: patient.name,
            }))} // Map directly from getAvailableMedicines
            filterOption={(input, option: any) =>
              option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            className={`${inputStyles.lightInputField}`}
            style={{
              paddingInline: "0",
              width: "12rem",
            }}
            dropdownStyle={{
              fontFamily: "Century Gothic",
              fontWeight: "normal",
            }}
          />
        </div>
        {/* DROPDOWN FOR medicine */}
        <div className={`flex text-base gap-x-2 items-center`}>
          <label htmlFor="medicine" className={`text-lg`}>
            Choose Medicine
          </label>
          <Select
            placeholder="Select a Medicine"
            showSearch
            allowClear
            onClear={() => {
              setSelectedMedicineId(null);
            }}
            value={selectedMedicineId}
            onSelect={(value) => {
              setSelectedMedicineId(value);
            }}
            optionFilterProp="children"
            options={getAvailableMedicines?.map((medicine: any) => ({
              value: medicine._id,
              label: medicine.name,
            }))} // Map directly from getAvailableMedicines
            filterOption={(input, option: any) =>
              option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            className={`${inputStyles.lightInputField}`}
            style={{
              paddingInline: "0",
              width: "12rem",
            }}
            dropdownStyle={{
              fontFamily: "Century Gothic",
              fontWeight: "normal",
            }}
          />
        </div>
        {/* Duration */}
        <div className={`flex flex-col gap-y-1`}>
          <label htmlFor="description" className={`text-lg`}>
            Duration
          </label>
          <Input
            id="description"
            placeholder="Duration"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
        </div>
        {/* Dosage */}
        <div className={`flex flex-col gap-y-1`}>
          <label htmlFor="price" className={`text-lg`}>
            Dosage
          </label>
          <Input
            id="price"
            placeholder="Dosage"
            value={dosage}
            onChange={(e) => {
              setDosage(e.target.value);
            }}
          />
        </div>
        {/* Available Quantity */}
        <div className={`flex flex-col gap-y-1`}>
          <label htmlFor="availableQuantity" className={`text-lg`}>
            Quantity
          </label>
          <Input
            id="availableQuantity"
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              if (!isNaN(newValue) && newValue >= 1) {
                setQuantity(newValue.toString());
              }
            }}
          />
        </div>
        {/* Render input fields for each medicine in the array */}
        {medicines.map((medicine, index) => (
          <div key={index} className={`flex flex-col gap-y-4`}>
            {/* DROPDOWN FOR medicine */}
            <div className={`flex text-base gap-x-2 items-center`}>
              <label htmlFor="medicine" className={`text-lg`}>
                Choose Medicine
              </label>
              <Select
                placeholder="Select a Medicine"
                showSearch
                allowClear
                onClear={() => {
                  const newSelectedMedicineIdArray = [
                    ...selectedMedicineIdArray,
                  ];
                  newSelectedMedicineIdArray[index] = null!;
                  setSelectedMedicineIdArray(newSelectedMedicineIdArray);
                }}
                value={selectedMedicineIdArray[index]}
                onSelect={(value) => {
                  const newSelectedMedicineIdArray = [
                    ...selectedMedicineIdArray,
                  ];
                  newSelectedMedicineIdArray[index] = value;
                  setSelectedMedicineIdArray(newSelectedMedicineIdArray);
                }}
                optionFilterProp="children"
                options={getAvailableMedicines?.map((medicine: any) => ({
                  value: medicine._id,
                  label: medicine.name,
                }))} // Map directly from getAvailableMedicines
                filterOption={(input, option: any) =>
                  option?.children
                    ?.toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                className={`${inputStyles.lightInputField}`}
                style={{
                  paddingInline: "0",
                  width: "12rem",
                }}
                dropdownStyle={{
                  fontFamily: "Century Gothic",
                  fontWeight: "normal",
                }}
              />
            </div>
            {/* Duration */}
            <div className={`flex flex-col gap-y-1`}>
              <label htmlFor="description" className={`text-lg`}>
                Duration
              </label>
              <Input
                id="description"
                placeholder="Duration"
                value={medicine.duration}
                onChange={(e) => {
                  const newMedicines = [...medicines];
                  newMedicines[index].duration = e.target.value;
                  setMedicines(newMedicines);
                }}
              />
            </div>
            {/* Dosage */}
            <div className={`flex flex-col gap-y-1`}>
              <label htmlFor="price" className={`text-lg`}>
                Dosage
              </label>
              <Input
                id="price"
                placeholder="Dosage"
                value={medicine.dosage}
                onChange={(e) => {
                  const newMedicines = [...medicines];
                  newMedicines[index].dosage = e.target.value;
                  setMedicines(newMedicines);
                }}
              />
            </div>

            {/* Available Quantity */}
            <div className={`flex flex-col gap-y-1`}>
              <label htmlFor="availableQuantity" className={`text-lg`}>
                Quantity
              </label>
              <Input
                id="availableQuantity"
                type="number"
                placeholder="Quantity"
                value={medicine.quantity}
                onChange={(e) => {
                  const newMedicines = [...medicines];
                  newMedicines[index].quantity = e.target.value;
                  setMedicines(newMedicines);
                }}
              />
            </div>
          </div>
        ))}
        <Button type="primary" onClick={handleAddNewMedicine}>
          Add Another Medicine
        </Button>
        {/* Status
              <div className={`flex flex-col gap-y-1`}>
                <label htmlFor="status" className={`text-lg`}>
                  Status
                </label>
                <Input
                  id="status"
                  placeholder="Status"
                  defaultValue={medicine?.status}
                />  
              </div> */}
      </div>
    </Modal>
  );
};

export default AddNewPrescriptionModal;
