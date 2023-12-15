import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, DatePicker } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import moment from "moment";
import { text } from "stream/consumers";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";
import { viewPrescriptionsDoctorAction } from "VirtualClinic/redux/VirtualClinicRedux/ViewPrescriptionsDoctor/viewPrescriptionsDoctorAction";
import styles from "Pharmacy/screens/User Screens/Patient Screens/MedicineScreen/MedicineScreen.module.css";
import AddNewMedicineModal from "./AddNewMedicineModal";
import AddNewPrescriptionModal from "./AddNewPrescriptionModal";

const DoctorPrescriptionsScreen: React.FC = () => {
  const dispatch: any = useDispatch();

  const { viewPrescriptionsDoctorLoading, viewPrescriptionsDoctor } =
    useSelector((state: RootState) => state.viewPrescriptionsDoctorReducer);

  const { userData } = useSelector((state: RootState) => state.userReducer);
  const [openAddMedicineModal, setOpenAddMedicineModal] = useState(false);
  const [openAddPrescriptionModal, setOpenAddPrescriptionModal] =
    useState(false);

  const [selectedRecordKey, setSelectedRecordKey] = useState<string | null>(
    null
  );

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(
      viewPrescriptionsDoctorAction({
        username: userData?.username,
      })
    );
  }, []);

  interface DataType {
    key: string;
    doctor: string;
    date: string;
    filled: string;
  }

  type DataIndex = keyof DataType;

  const data: DataType[] = Array.isArray(viewPrescriptionsDoctor)
    ? viewPrescriptionsDoctor?.map((prescription: any) => {
        return {
          key: prescription?._id,
          doctor: prescription?.patientName,
          date: prescription?.date.toString().split("T")[0],
          filled: prescription?.filled ? "Filled" : "Unfilled",
        };
      })
    : [];

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, backgroundColor: "#1677ff", padding: 0 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [searchDate, setSearchDate] = useState("");
  const [searchedDateColumn, setSearchedDateColumn] = useState("");
  const searchDateInput = useRef<InputRef>(null);

  const handleDateSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchDate(selectedKeys[0]);
    setSearchedDateColumn(dataIndex);
  };

  const handleDateReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchDate("");
  };

  //column that search and filter on date
  const getDateSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          type="date"
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleDateSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, backgroundColor: "#1677ff", padding: 0 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              setSelectedKeys([]);
              clearFilters && handleDateReset(clearFilters);
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchDate((selectedKeys as string[])[0]);
              setSearchedDateColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      moment(record[dataIndex]).format("YYYY-MM-DD") === value,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchDateInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedDateColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchDate]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Patient",
      dataIndex: "doctor",
      key: "doctor",
      width: "20%",
      ...getColumnSearchProps("doctor"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "20%",
      ...getDateSearchProps("date"),
    },
    //add prop that filter for date

    {
      title: "Status",
      dataIndex: "filled",
      key: "filled",
      filters: [
        {
          text: "Filled",
          value: "Filled",
        },
        {
          text: "Unfilled",
          value: "Unfilled",
        },
      ],
      onFilter: (value, record) => {
        return record.filled === value;
      },
    },
    {
      title: "View",
      key: "action",
      render: (text: any, record: any) => (
        <Link
          to={`/clinic/viewSelectedPrescription/${record.key}`}
          type="primary"
          style={{
            backgroundColor: "#1677ff",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          View
        </Link>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <div
          className={`${styles.addButton}`}
          onClick={() => {
            setSelectedRecordKey(record.key);
            setOpenAddMedicineModal(true);
          }}
          style={{ marginLeft: "auto" }}
        >
          Add New Medicine
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="pageHeading">Prescriptions</h1>
      <div>
        {viewPrescriptionsDoctorLoading ? (
          <JellyLoader />
        ) : (
          <Table columns={columns} dataSource={data} />
        )}
        <Button
          type="primary"
          onClick={() => {
            setOpenAddPrescriptionModal(true);
          }}
          className={`${styles.addButton}`}
        >
          Add Prescription
        </Button>
      </div>

      {/* Add New Medicine Modal */}
      <AddNewMedicineModal
        visible={openAddMedicineModal}
        setVisible={setOpenAddMedicineModal}
        recordKey={selectedRecordKey ?? ""}
        handleAddMedicine={() => {
          setRefresh(!refresh);
        }}
      />
      <AddNewPrescriptionModal
        visible={openAddPrescriptionModal}
        setVisible={setOpenAddPrescriptionModal}
        recordKey={selectedRecordKey ?? ""}
        handleAddPrescription={() => {
          setRefresh(!refresh);
        }}
      />
    </div>
  );
};

export default DoctorPrescriptionsScreen;
