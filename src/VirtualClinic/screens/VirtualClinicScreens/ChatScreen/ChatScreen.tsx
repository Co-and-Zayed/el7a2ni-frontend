import styles from "VirtualClinic/screens/VirtualClinicScreens/ChatScreen/ChatScreen.module.css";
import { useNav } from "VirtualClinic/hooks/useNav";
import { useEffect, useState } from "react";
import {
  navLinksDoctor,
  navLinksPatient,
} from "VirtualClinic/utils/navigationLinks";
import DoctorIcon from "VirtualClinic/assets/images/SvgComponents/DoctorIcon";
import { render } from "@testing-library/react";
import { Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

const ChatScreen = () => {
  const isLoggedIn = true;
  const navigate = useNav();

  const renderInboxItem = (data: { name: string; lastMessage: string }) => {
    return (
      <div className={`${styles.inboxItem} flex gap-4 items-center`}>
        <div className={`${styles.imageCircle}`}>
          <DoctorIcon color="var(--light-green)" style={{ width: "60%" }} />
        </div>
        <div className="flex flex-col gap-0">
          <p className={`${styles.doctorName}`}>{data.name}</p>
          <p className={`${styles.doctorSpecialty} oneLineEllipsis`}>
            {data.lastMessage}
          </p>
        </div>
      </div>
    );
  };

  const messages: any[] = [
    {
      sender: "me",
      message: "masa2 el 5eir",
    },
    {
      sender: "me",
      message: "3andy sodaaa3 sa3b gedddan",
    },
    {
      sender: "me",
      message: "sa3edny wennaby",
    },
    {
      sender: "him",
      message: "masaaa2 el 3asal",
    },
    {
      sender: "him",
      message: "mtkallmneesh tany law sm7t",
    },
    {
      sender: "me",
      message: "sa3edny wennaby",
    },
    {
      sender: "me",
      message: "sa3edny wennaby",
    },
    {
      sender: "him",
      message:
        "mashy y3am isa ba3d el resala dy htb2a a7san bkteer.\n pew pirpipew... pip pip pirew pip pip pirew",
    },
    {
      sender: "him",
      message: "mtkallmneesh baa law sm7t",
    },
  ];

  return (
    <div className="w-full flex gap-4 items-center justify-center pt-12">
      <div className={`${styles.inboxContainer}`}>
        {renderInboxItem({
          name: "Neveen Fahmy",
          lastMessage: "kfaya araf baa",
        })}
        {renderInboxItem({
          name: "Bodia",
          lastMessage: "karef",
        })}
      </div>
      <div
        className={`${styles.chatContainer} h-full flex flex-col items-center justify-end`}
      >
        <div className="w-full flex flex-col flex-grow justify-end mb-5">
          {
            // @ts-ignore
            messages.map((msg) => {
              return (
                <div
                  className={`relative ${styles.chatBox} ${
                    msg.sender === "me" ? styles.me : styles.him
                  }`}
                >
                  <p className={`absolute ${styles.time}`}>12:15 PM</p>
                  <p>{msg.message}</p>
                </div>
              );
            })
          }
        </div>
        <div className="flex justify-between w-full">
          <Input style={{ height: "3rem" }}></Input>
          <div
            className={`${styles.sendButton} flex items-center justify-center cursor-pointer`}
          >
            <SendOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
