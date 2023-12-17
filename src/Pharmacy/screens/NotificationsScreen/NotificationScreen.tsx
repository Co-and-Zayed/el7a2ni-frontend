import axios from "axios";
import { useEffect, useState } from "react";

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<any>();

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_PHARMACY}pharmacist/viewAllNotifications`
    );
    setNotifications(response.data?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-4">
      {notifications?.map((item: any, idx: any) => {
        return (
          <div className="flex flex-row items-start justify-start gap-x-2">
            <p className="font-[700]">{idx + 1}.</p>
            <div className="flex flex-col items-start">
              <p className="font-[700]">{item.title}</p>
              <p>{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationsScreen;
