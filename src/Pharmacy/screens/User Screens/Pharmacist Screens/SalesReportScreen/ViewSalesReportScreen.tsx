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
import { viewSalesReportsAction } from "Pharmacy/redux/PharmacyRedux/ViewSalesReport/viewSalesReportsAction"; 
import styles from "Pharmacy/screens/User Screens/Patient Screens/MedicineScreen/MedicineScreen.module.css";
import { viewSalesReport } from "Pharmacy/api/PharmacyRedux/apiUrls";
import SideBar from "Pharmacy/components/SideBar/SideBar";

const ViewSalesReportScreen: React.FC = () => {
  const dispatch: any = useDispatch();

  const { viewSalesReportsLoading, viewSalesReports } =
    useSelector((state: RootState) => state.viewSalesReportsReducer);

  const { userData } = useSelector((state: RootState) => state.userReducer);
  

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(
      viewSalesReportsAction({})
    );
  }, []);

  interface DataType {
    key: string;
    medicine: string;
    date: string;
    quantity: string;
    patient: string;
    month: string;
  }

  type DataIndex = keyof DataType;

  const data: DataType[] = Array.isArray(viewSalesReports)
    ? viewSalesReports?.map((report: any) => {
      const date = report?.date.toString().split("T")[0];
      const month = moment(date).format("MMMM"); // Extract month from
        return {
          key: report?._id,
          medicine: report?.medicineName,
          date: report?.date.toString().split("T")[0],
          quantity: report?.quantity,
          patient: report?.patientUsername,
          month,
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
      title: "Medicine",
      dataIndex: "medicine",
      key: "medicine",
      width: "20%",
      ...getColumnSearchProps("medicine"),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "20%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "20%",
      ...getDateSearchProps("date"),
    },
    {
      title: "Patient",
      dataIndex: "patient",
      key: "patient",
      width: "20%",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      width: "20%",
      ...getColumnSearchProps("month"),
    },
    //add prop that filter for date
  ];

  return (
     
    <div>
      <h1 className="pageHeading">Sales Reports</h1>
      <div>
      
        {viewSalesReportsLoading ? (
          <JellyLoader />
        ) : (
          <Table columns={columns} dataSource={data} />
        )}
        
      </div>
    </div>
  );
};

export default ViewSalesReportScreen;
