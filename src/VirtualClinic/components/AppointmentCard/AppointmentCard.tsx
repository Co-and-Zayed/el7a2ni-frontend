import { Dropdown, Input, Modal, TimePicker, notification } from "antd";
import styles from "VirtualClinic/components/AppointmentCard/AppointmentCard.module.css";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNav } from "VirtualClinic/hooks/useNav";
import { getDoctorInfoAction } from "VirtualClinic/redux/VirtualClinicRedux/GetDoctorInfo/getDoctorInfoAction";
import DoctorIcon from "VirtualClinic/assets/images/SvgComponents/DoctorIcon";
import {
  DollarIcon,
  Dots,
  EducationIcon,
  HospitalIcon,
  RightArrowIcon,
} from "VirtualClinic/assets/IconComponents";
import moment from "moment";
import { getAppointmentsAction } from "VirtualClinic/redux/VirtualClinicRedux/GetAppointments/getAppoinmentsAction";
import dayjs, { Dayjs } from "dayjs";
import { updateAppointmentAction } from "VirtualClinic/redux/VirtualClinicRedux/UpdateAppointment/updateAppointmentAction";
import { createAppointmentAction } from "VirtualClinic/redux/VirtualClinicRedux/CreateAppointment/createAppoinmentAction";
import { RootState } from "VirtualClinic/redux/rootReducer";

interface AppointmentCardProps {
  appointment: any;
  isForMe?: boolean;
  refresh?: any;
}

const AppointmentCard: FC<AppointmentCardProps> = ({
  appointment,
  isForMe,
  refresh,
}) => {
  const dispatch: any = useDispatch();

  const { userData, userType, accessToken } = useSelector(
    (state: RootState) => state.userReducer
  );

  const { statusCode, response_message } = useSelector(
    (state: RootState) => state.createAppointmentReducer
  );

  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);
  const [followUpModalVisible, setFollowUpModalVisible] = useState(false);
  // const [selectedAppointment, setSelectedAppointment] = useState<string>();

  const [chosenDate, setChosenDate] = useState<Dayjs | null>(null);
  const [chosenTime, setChosenTime] = useState<Dayjs | null>(null);

  const [loadingReschedule, setLoadingReschedule] = useState(false);
  const [loadingFollowUp, setLoadingFollowUp] = useState(false);

  var items =
    appointment.status === "CANCELLED" ||
    appointment.status === "RESCHEDULED" ||
    appointment.status === "REJECTED" ||
    appointment.status === "COMPLETED"
      ? []
      : [
          { key: "CANCELLED", label: "Cancel" },
          { key: "RESCHEDULED", label: "Reschedule" },
          // { key: "UPCOMING", label: "Mark as Upcoming" },
        ];

  // useEffect(() => {
  items = items.filter((item) => item.key !== appointment.status);

  // if completed add a "Schedule a follow up" button
  if (appointment.status === "COMPLETED") {
    items.push({ key: "FOLLOW_UP", label: "Schedule a Follow Up" });
  }
  // }, []);

  const onClick = async (item: any) => {
    // If it is reschedule, make an antd modal with a date and time picker
    if (item.key === "RESCHEDULED") {
      // setSelectedAppointment(id);
      setRescheduleModalVisible(true);
      return;
    }

    // If it is follow up, make an antd modal with a date and time picker
    if (item.key === "FOLLOW_UP") {
      // setSelectedAppointment(id);
      setFollowUpModalVisible(true);
      return;
    }

    if (item.key === "CANCELLED") {
      // use fetch api to cancel appointment
      var res = await fetch(
        `${process.env.REACT_APP_BACKEND_CLINIC}patient/cancelAppointment`,
        {
          method: "PUT",
          body: JSON.stringify({
            _id: appointment._id,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      var data = await res.json();

      console.log("CANCEL RESPONSE: ", data);
    }

    await dispatch(
      updateAppointmentAction({
        id: appointment._id,
        status: item.key,
      })
    );
    notification.open({
      message: "Appointment Status Changed",
      description: `Appointment status changed to ${item.key}`,
      onClick: () => {},
      // placement: "bottomRight",
    });

    // refresh the appointments
    refresh();

    // dispatch(
    //   getAppointmentsAction({
    //     id: userData?._id,
    //     type: userType,
    //   })
    // );
  };

  return (
    <div id="appointmentCard" className={`${styles.appointmentCard}`}>
      {/* IMAGE, NAME, SPECIALTY */}
      <div className={`${styles.cardItem}`}>
        {/* IMAGE */}
        <div className={`${styles.imageCircle}`}>
          <DoctorIcon color="var(--light-green)" size={45} />
        </div>
        <div
          className={`w-full h-full flex flex-col justify-between items-start`}
        >
          <div>
            <h1
              className={`text-2xl font-bold mt-1`}
              style={{ lineHeight: "1.2" }}
            >
              {/* <span className="text-lg" style={{ fontWeight: 600 }}>
                  Doctor{" "}
                </span> */}

              {appointment.doctor?.name}
            </h1>
            <p className="text-sm">{appointment.doctor?.specialty}</p>
            <p className="text-sm">
              Patient: {appointment.patient?.name}{" "}
              {!isForMe &&
                "(" +
                  appointment.patient?.relation?.toString().toLowerCase() +
                  ")"}
            </p>
          </div>
          <div className="w-full flex items-end justify-between">
            <p className="text-xs centuryGothic">{appointment.doctor?.email}</p>
            {/* <p className="text-xs centuryGothic">{appointment?.patientType}</p> */}

            {/* time text-2xl */}
            <p className="text-2xl font-semibold" style={{ lineHeight: "1" }}>
              {moment(appointment.date).format("h:mm A")}
            </p>
          </div>
        </div>
      </div>
      <p
        style={{
          position: "absolute",
          top: "0.8rem",
          right: "2.5rem",
          textAlign: "right",
          textTransform: "capitalize",
        }}
      >
        {appointment?.status}
      </p>
      {/* Three dots at top right */}
      <Dropdown menu={{ items, onClick: (item) => onClick(item) }}>
        <div
          className={`${styles.threeDots}`}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "1rem",
            right: "0.8rem",
          }}
        >
          <Dots fontSize={16} />
        </div>
      </Dropdown>

      {/* MODALS */}
      {/* RESCHEDULE */}
      <Modal
        title="Reschedule Appointment"
        open={rescheduleModalVisible}
        onOk={async () => {
          setLoadingReschedule(true);

          // check if the date and time are valid and in the future
          if (!chosenDate || !chosenTime || chosenDate?.isBefore(dayjs())) {
            notification.warning({
              message: "Invalid Date and Time",
              description: `Please choose a valid date and time`,
              onClick: () => {},
              // placement: "bottomRight",
            });
            setLoadingReschedule(false);
            return;
          }

          // create another appointment with the same patient and doctor but with the new date and time

          var finalDate = chosenDate?.toDate();
          finalDate.setHours(chosenTime?.hour() || 0);
          finalDate?.setMinutes(0);
          finalDate?.setSeconds(0);
          finalDate?.setMilliseconds(0);

          var res = await fetch(
            `${process.env.REACT_APP_BACKEND_CLINIC}patient/rescheduleAppointment`,
            {
              method: "PUT",
              body: JSON.stringify({
                _id: appointment._id,
                doctorId: appointment?.doctor?._id,
                patientId: appointment?.patient._id,
                date: finalDate,
                patientType: appointment?.patientType,
              }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          var data = await res.json();

          // Check status code
          if (res.status !== 200) {
            notification.error({
              message: "Error Rescheduling Appointment",
              description: `There was an error rescheduling the appointment ${data?.message}`,
              onClick: () => {},
              // placement: "bottomRight",
            });
            setLoadingReschedule(false);
            return;
          }

          // refresh
          refresh();

          notification.success({
            message: "Appointment Rescheduled",
            description: `Appointment rescheduled successfully to ${moment(
              finalDate
            ).format("dddd, MMMM D, yyyy")} at ${moment(finalDate).format(
              "h:mm a"
            )}`,
            onClick: () => {},
            // placement: "bottomRight",
          });

          setLoadingReschedule(false);
          setRescheduleModalVisible(false);
        }}
        confirmLoading={loadingReschedule}
        onCancel={() => setRescheduleModalVisible(false)}
      >
        {/* DATE AND TIME PICKER */}
        <p>Choose a date and time for your appointment</p>
        <div className="flex items-center justify-between gap-x-2">
          <Input
            type="date"
            allowClear
            onChange={(e) => {
              setChosenDate(dayjs(e.target.value));
            }}
          />
          {/* only every 30 minutes */}
          <TimePicker
            showMinute={false}
            showSecond={false}
            format={"h a"}
            showNow={false}
            allowClear
            onChange={(time, timeString) => {
              setChosenTime(time);
            }}
          />
        </div>
      </Modal>

      {/* SCHEDULE A FOLLOW UP */}
      <Modal
        title="Follow Up Appointment"
        open={followUpModalVisible}
        onOk={async () => {
          setLoadingFollowUp(true);

          // check if the date and time are valid and in the future
          if (!chosenDate || !chosenTime || chosenDate?.isBefore(dayjs())) {
            notification.warning({
              message: "Invalid Date and Time",
              description: `Please choose a valid date and time`,
              onClick: () => {},
              // placement: "bottomRight",
            });
            setLoadingFollowUp(false);
            return;
          }

          // create another appointment with the same patient and doctor but with the new date and time

          var finalDate = chosenDate?.toDate();
          finalDate.setHours(chosenTime?.hour() || 0);
          finalDate?.setMinutes(0);
          finalDate?.setSeconds(0);
          finalDate?.setMilliseconds(0);

          var res = await fetch(
            `${process.env.REACT_APP_BACKEND_CLINIC}patient/followUpAppointment`,
            {
              method: "POST",
              body: JSON.stringify({
                // _id: appointment._id,
                doctorId: appointment?.doctor?._id,
                patientId: appointment?.patient._id,
                date: finalDate,
                patientType: appointment?.patientType,
              }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          var data = await res.json();

          // Check status code
          if (res.status !== 200) {
            notification.error({
              message: "Error Booking Follow-Up Appointment",
              description: `There was an error booking a follow-up appointment: ${data?.message}`,
              onClick: () => {},
              // placement: "bottomRight",
            });
            setLoadingReschedule(false);
            return;
          }

          // // update the old appointment to be rescheduled
          // await dispatch(
          //   updateAppointmentAction({
          //     id: selectedAppointment,
          //     status: "RESCHEDULED",
          //   })
          // );

          // refresh
          refresh();

          notification.success({
            message: "Follow Up Appointment Scheduled",
            description: `for ${appointment?.patient?.name}  on ${moment(
              finalDate
            ).format("dddd, MMMM D, yyyy")} at ${moment(finalDate).format(
              "h:mm a"
            )}`,
            onClick: () => {},
            // placement: "bottomRight",
          });

          setLoadingFollowUp(false);
          setFollowUpModalVisible(false);
        }}
        confirmLoading={loadingReschedule}
        onCancel={() => setFollowUpModalVisible(false)}
      >
        {/* DATE AND TIME PICKER */}
        <p>Choose a date and time for your appointment</p>
        <div className="flex items-center justify-between gap-x-2">
          <Input
            type="date"
            allowClear
            onChange={(e) => {
              setChosenDate(dayjs(e.target.value));
            }}
          />
          {/* only every 30 minutes */}
          <TimePicker
            showMinute={false}
            showSecond={false}
            format={"h a"}
            showNow={false}
            allowClear
            onChange={(time, timeString) => {
              setChosenTime(time);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentCard;
