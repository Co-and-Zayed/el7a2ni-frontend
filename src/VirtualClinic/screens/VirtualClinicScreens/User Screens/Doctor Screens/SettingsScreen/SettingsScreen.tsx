import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { listDoctorSettingsAction } from "VirtualClinic/redux/VirtualClinicRedux/ListDoctorSettings/listDoctorSettingsAction";
import { editSettingsAction } from "VirtualClinic/redux/VirtualClinicRedux/EditSettings/editSettingsAction";
import styles from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Doctor Screens/SettingsScreen/SettingsScreen.module.css";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";
import PasswordScreen from "./PasswordScreen";
import CoolCalendar from "../../../../../components/CoolCalendar/CoolCalendar";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker, notification } from "antd";
import RoundedButton from "VirtualClinic/components/RoundedButton/RoundedButton";
import { transform } from "typescript";

const SettingsScreen = () => {
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);

  const dispatch: any = useDispatch();

  const { userData, accessToken } = useSelector(
    (state: RootState) => state.userReducer
  );

  var { docinfo } = useSelector(
    (state: RootState) => state.getDoctorInfoReducer
  );

  const isFutureDate = (date: any) => {
    const now = new Date();
    const resettedNow = new Date(0); // Reset to the Unix epoch (midnight, January 1, 1970)

    // Reset the time components of the dates to 00:00:00
    resettedNow.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
    resettedNow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return date >= resettedNow;
  };

  const isFutureTime = (timeString: string): boolean => {
    const now = new Date();
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":").map(Number);

    // Adjust hours for PM times
    const adjustedHours = period === "PM" ? hours + 12 : hours;

    const futureTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      adjustedHours,
      minutes
    );

    return futureTime >= now;
  };

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const { doctorSettingsLoading, doctorSettings } = useSelector(
    (state: RootState) => state.listDoctorSettingsReducer
  );

  const { editSettingsLoading, editSettings } = useSelector(
    (state: RootState) => state.editSettingsReducer
  );

  async function chooseSlots() {
    // dateTime with selected date and start time
    var startDateJs = dayjs(
      `${selectedDate?.format("YYYY-MM-DD")} ${startTime?.format("HH:mm")}`
    );
    const startDateTime = startDateJs.toDate();

    // dateTime with selected date and end time
    var endDateJs = dayjs(
      `${selectedDate?.format("YYYY-MM-DD")} ${endTime?.format("HH:mm")}`
    );
    const endDateTime = endDateJs.toDate();

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_CLINIC}doctor/chooseSlots`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          //to be changed
          doctorId: userData?._id,
          startTime: startDateTime,
          endTime: endDateTime,
          date: selectedDate,
        }),
      }
    );

    const data = await res.json();

    console.log("Choose slots res", res);
    console.log("Choose slots", data);

    if (res.status !== 200) {
      notification.error({
        message: "Error",
        description: data,
      });
    } else {
      notification.success({
        message: "Success",
        description: data,
      });
    }
  }

  const [daysToHighlight, setDaysToHighlight] = useState<Dayjs[] | null>(null);

  useEffect(() => {
    updateDaysToHighlight();
  }, [docinfo?.slots]);

  function updateDaysToHighlight() {
    if (docinfo?.slots) {
      var uniqueDays: dayjs.Dayjs[] = [];
      docinfo?.slots.forEach((slot: any) => {
        const date = dayjs(slot.date);
        if (!uniqueDays.includes(date)) {
          // if (slot.date >= dayjs().toISOString())
          uniqueDays.push(date);
        }
      });
      setDaysToHighlight(uniqueDays);
    }
  }

  useEffect(() => {
    if (docinfo) {
    }
  }, [docinfo]);

  useEffect(() => {
    dispatch(listDoctorSettingsAction({ _id: userData?._id }));
  }, []);

  useEffect(() => {
    // Re-fetch the data from the database
    dispatch(listDoctorSettingsAction({ _id: userData?._id }));
  }, [editSettings]); //
  const [affiliation, setAffiliation] = useState(
    doctorSettings?.affiliation || " "
  );
  const [hourlyRate, setHourlyRate] = useState(
    doctorSettings?.hourlyRate || " "
  );
  const [email, setEmail] = useState(doctorSettings?.email || " ");

  const handleUpdate = (key: any, value: any) => {
    const updateData = {
      _id: userData?._id, // Assuming you always update the same doctor
      [key]: value,
    };
    dispatch(editSettingsAction(updateData));
  };

  function handleCalnderClick(): void {
    // If no date is selected, show error
    if (!selectedDate) {
      // show error
      notification.error({
        message: "Error",
        description: "Please select a date",
      });
      return;
    }

    // If date is in the past, show error
    if (!isFutureDate(selectedDate.toDate())) {
      // show error
      notification.error({
        message: "Error",
        description: "Please select a future date",
      });
      return;
    }
  }

  return (
    <div className="w-full flex flex-col items-start justify-center">
      <h1>Doctor Settings Screen</h1>

      <div>
        <p>Choose Your Working Slots.</p>
        <br></br>
        <div
          style={{
            transform: "scale(1.2)",
          }}
        >
          <CoolCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            daysToHighlight={daysToHighlight ?? []}
          />
        </div>
        <br></br>
        <p>Choose suitable time.</p>
        <br></br>
        <div style={{ transform: "scale(1.2)" }}>
          <TimePicker.RangePicker
            use12Hours
            format="h:00 a"
            value={[startTime, endTime]}
            onClick={handleCalnderClick}
            onChange={(value) => {
              if (value) {
                const [start, end] = value;
                const [startString, endString] = value.map((date) =>
                  date?.format("h:mm a")
                );

                // If start time is after end time, show error
                if (start?.isAfter(end)) {
                  // show error
                  notification.error({
                    message: "Error",
                    description: "Start time cannot be after end time",
                  });
                  return;
                }

                setStartTime(start);
                setEndTime(end);
              } else {
                setStartTime(null);
                setEndTime(null);
              }
            }}
          />
          <br></br>
          <br></br>
          <RoundedButton text="Submit" onClick={chooseSlots} />
        </div>
        <br></br>
      </div>

      {doctorSettingsLoading ? (
        <JellyLoader />
      ) : doctorSettings !== null && typeof doctorSettings === "object" ? (
        Object.keys(doctorSettings)?.map((key: string) => {
          const keysToSkip = ["_id", "password", "__v"];

          if (keysToSkip.includes(key)) {
            return null;
          }

          const placeholders: { [key: string]: string } = {
            affiliation: "Enter updated value",
            hourlyRate: "Enter updated value",
            email: "Enter updated value",
          };
          if (key === "slots") {
            console.log("slots");
            console.log(doctorSettings[key]);
          }
          return (
            <div key={key} className="m-5">
              <h1>{key}</h1>
              <p>
                {key !== "slots"
                  ? doctorSettings[key].toString()
                  : doctorSettings[key][0]?.time.toString()}
              </p>
              {["affiliation", "hourlyRate", "email"].includes(key) && (
                <>
                  <input
                    type="text"
                    placeholder={placeholders[key]}
                    onChange={(e) => {
                      if (key === "affiliation") {
                        setAffiliation(e.target.value);
                      } else if (key === "hourlyRate") {
                        setHourlyRate(e.target.value);
                      } else if (key === "email") {
                        setEmail(e.target.value);
                      }
                    }}
                  />

                  <button
                    className={`${styles.customButton}`}
                    onClick={() =>
                      handleUpdate(
                        key,
                        key === "affiliation"
                          ? affiliation
                          : key === "hourlyRate"
                          ? hourlyRate
                          : email
                      )
                    }
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          );
        })
      ) : (
        <p>No doctor settings data available.</p>
      )}
      <PasswordScreen />
    </div>
  );
};

export default SettingsScreen;
