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
interface AddNewMedicineModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddMedicine: () => void;
  recordKey: string; // Add this line to include recordKey property
}

const AddNewMedicineModal: FC<AddNewMedicineModalProps> = ({
  visible,
  setVisible,
  recordKey,
  handleAddMedicine,
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

  const [loadingAdd, setLoadingAdd] = useState(false);

  function resetFields() {
    setName("");
    setDuration("");
    setDosage("");
    setQuantity("");
  }

  async function handleAddNewMedicine() {
    // Check if all fields are filled

    if (name === "" || duration === "" || dosage === "" || quantity === "") {
      notification.error({
        message: "Please fill all the fields!",
      });
      return;
    }

    setLoadingAdd(true);

    try {
      const data = {
        name,
        duration,
        dosage,
        quantity,
        createdAt: new Date(),
      };

      setLoadingAdd(false);
      setVisible(false);
      notification.success({
        message: "Medicine added successfully!",
      });
      handleAddMedicine();
    } catch (err) {
      setLoadingAdd(false);
      notification.error({
        message: "Failed to add medicine!",
      });
    }
  }

  return (
    <Modal
      title="Add New Medicine To Prescription"
      open={visible}
      onOk={() => {
        dispatch(
          addMedicineToPrescriptionAction({
            duration: duration,
            quantity: quantity,
            dosage: dosage,
            id: selectedMedicineId,
            prescriptionID: recordKey,
          })
        );
        setVisible(false);
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
        {/*  DROPDOWN FOR FamilyMembers */}
        <div className={`flex text-base gap-x-2 items-center`}>
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

export default AddNewMedicineModal;
