import styles from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/DashboardScreen/DashboardScreen.module.css";
import { useNav } from "VirtualClinic/hooks/useNav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import JSZip from "jszip";
import { access } from "fs";
import { useFunctions } from "hooks/useFunctions";
import api from "VirtualClinic/api";
import { get } from "https";
import { motion } from "framer-motion";
import DoctorCard from "VirtualClinic/components/DoctorCard/DoctorCard";

const DashboardScreen = () => {
  const { userData } = useSelector((state: RootState) => state.userReducer);

  const [myDoctors, setMyDoctors] = useState<any[]>([]);

  const getMyDoctors = async () => {
    const res = await api.post("patient/getMyDoctors", {
      patientId: userData._id,
    });
    // setMyDoctors(res);
    console.log("MY DOCTORS");
    console.log(res.data);
    setMyDoctors(res.data);
  };

  useEffect(() => {
    getMyDoctors();
  }, []);

  const { handleDownload } = useFunctions();

  return (
    <div className={`w-full flex flex-col gap-6 items-start justify-center`}>
      {myDoctors?.map((doctor: any, idx: number) => {
        if (doctor?.status !== "ACCEPTED") return;

        return (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              // ease: "easeIn",
              ease: [0.38, 0.01, 0.39, 1.1],
              delay: idx * 0.1,
            }}
          >
            <DoctorCard doctor={doctor} sendMessage={true} />
          </motion.div>
        );
      })}
    </div>
  );
};

{
  /* <h1 className="pageHeading">Dashboard</h1>
<a onClick={() => handleDownload({ files: userData?.healthRecords })}>
  Download All Health Records
</a>
<a onClick={() => handleDownload({ file: userData?.healthRecords[1] })}>
  Download First Health Record
</a> */
}

export default DashboardScreen;
