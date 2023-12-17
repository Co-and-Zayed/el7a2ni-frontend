import styles from "./ChatScreen.module.css";
import { useNav } from "VirtualClinic/hooks/useNav";
import { useEffect, useRef, useState } from "react";
import {
  navLinksDoctor,
  navLinksPatient,
} from "VirtualClinic/utils/navigationLinks";
import DoctorIcon from "VirtualClinic/assets/images/SvgComponents/DoctorIcon";
import { render } from "@testing-library/react";
import { Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { initializeApp } from "firebase/app";
import * as Firestore from "firebase/firestore";
import firebaseConfig from "firebaseConfig";
import { app, firestore } from "my-firebase";
import { createClient } from "@supabase/supabase-js";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { motion } from "framer-motion";
import { useFunctions } from "hooks/useFunctions";
import { useTimeFormat } from "hooks/useTimeFormat";
import { useParams } from "react-router";
import api from "VirtualClinic/api";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";
import { listAllPatientsAction } from "VirtualClinic/redux/VirtualClinicRedux/ListAllPatients/listAllPatientsAction";

const SUPABASE_URL: string = process.env.REACT_APP_SUPABASE_URL ?? "";
const SUPABASE_KEY: string = process.env.REACT_APP_SUPABASE_KEY ?? "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const ChatScreen = () => {
  const isLoggedIn = true;
  const navigate = useNav();
  const dispatch: any = useDispatch();
  const [currentChat, setCurrentChat] = useState<any>(null);

  // get recepient user id from search params using useParams

  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>("");
  const [messagesLoading, setMessagesLoading] = useState<boolean>(false);
  const chatContainerRef = useRef(null);

  const { userData, accessToken, userType } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { getTimeFromDate } = useFunctions();
  const { formatDate } = useTimeFormat();
  const { recepientId } = useParams<any>();

  const { patientsLoading, allPatients } = useSelector(
    (state: RootState) => state.listAllPatientsReducer
  );

  const pharmacistId = "657e31a185571a5bd22afe2a"; // 657e31a185571a5bd22afe2a
  const [isSupport, setIsSupport] = useState<boolean>(false);
  useEffect(() => {
    if (window.location.pathname.includes(":recepientId")) {
      window.location.pathname = `/clinic/chats/${pharmacistId}`;
    }
    setIsSupport(
      window.location.pathname.includes(":recepientId") ||
        window.location.pathname.includes(pharmacistId)
    );
  }, [window.location.pathname]);

  useEffect(() => {
    console.log("recepient id: ", recepientId);
    updateMessages();
  }, [recepientId]);

  useEffect(() => {
    dispatch(listAllPatientsAction({ doctorUsername: userData?.username })); // sending the request, and update the states
  }, []);

  const addToConversations = async () => {
    try {
      // Insert the message into the "messages" table
      // Check if a record with user1_id already exists
      const { data: existingConversation, error: existingError } =
        await supabase
          .from("conversations")
          .select("*")
          .eq("user1_id", userData?._id);

      if (existingError) {
        // Handle error
        console.error("Error checking existing conversation:", existingError);
      } else if (!existingConversation || existingConversation.length === 0) {
        // If no existing conversation found, proceed with the insertion
        const { data, error } = await supabase.from("conversations").insert([
          {
            user1_id: userData?._id,
            user1_name: userData?.name,
            user1_type: userType,
            user2_id: pharmacistId,
          },
        ]);

        if (error) {
          // Handle insertion error
          console.error("Error inserting conversation:", error);
        } else {
          // Insertion successful
          console.log("Conversation inserted successfully:", data);
        }
      } else {
        // Conversation with user1_id already exists, handle accordingly
        console.log(
          "Conversation with user1_id already exists:",
          existingConversation
        );
      }
    } catch (error: any) {
      console.error("Error sending message:", error.message);
    }
  };

  // Create a function to handle inserts
  const handleInserts = (payload: any) => {
    console.log("Change received!", payload);
    updateMessages();
  };

  // Listen to inserts
  supabase
    .channel("messages_changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages" },
      handleInserts
    )
    .subscribe();

  const updateMessages = async () => {
    console.log("CALLING UPDATE MESSAGES");
    setMessagesLoading(true);
    try {
      console.log("UPDATE MESSAGES 1");
      console.log("USER DATA: ", userData);
      // Fetch updated messages for the current user and the other user
      const { data: updatedMessages, error } = await supabase
        .from("messages")
        .select("*")
        .in("sender_id", [userData?._id, recepientId])
        .in("receiver_id", [userData?._id, recepientId]);
      // .order("timestamp", { ascending: true });

      console.log("UPDATE MESSAGES 2");
      if (error) {
        console.error("Error fetching updated messages:", error.message);
      } else {
        console.log("Updated messages fetched successfully:");
        console.log(updatedMessages);
        // Update the messages state with the new data
        setMessages(updatedMessages || []);
      }
    } catch (error: any) {
      console.log("UPDATE MESSAGES 3");
      console.error("Error handling inserts:", error.message);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleEnterPress = (e: any) => {
    console.log(e.key);
    if (e.key === "Enter") {
      // Trigger click event on .sendButton div
      document.getElementById(`${styles.sendButton}`)?.click();
    }
  };

  const handleSendMessage = async (input: {
    sender_id: string;
    receiver_id: string;
    message_text: string;
  }) => {
    console.log("SENDING MESSAGE");
    console.log(input.sender_id);
    console.log(input.receiver_id);
    console.log(input.message_text);

    if (!input.message_text || input.message_text?.length === 0) return;

    try {
      // Insert the message into the "messages" table
      const { data, error } = await supabase.from("messages").insert([
        {
          sender_id: input.sender_id,
          receiver_id: input.receiver_id,
          message_text: input.message_text,
        },
      ]);

      if (error) {
        console.error("Error inserting message:", error.message);
        // Revert the optimistic update if there's an error
        setMessages((prevMessages: any) =>
          prevMessages?.slice(0, prevMessages?.length - 1)
        );
      } else {
        console.log("Message sent successfully:", data);
        addToConversations();
      }
    } catch (error: any) {
      console.error("Error sending message:", error.message);
    }

    setNewMessage(null);
  };

  const renderInboxItem = (data: {
    id: string;
    name: string;
    username: string;
  }) => {
    return (
      <div
        key={data?.id}
        className={`${data?.id === recepientId && styles.activeChat} ${
          styles.inboxItem
        } flex gap-4 items-center cursor-pointer`}
        onClick={() => {
          navigate(`/chats/${data?.id}`);
          setMessages(null);
          setCurrentChat(data?.id);
        }}
      >
        <div className={`${styles.imageCircle}`}>
          <DoctorIcon color="var(--light-green)" style={{ width: "60%" }} />
        </div>
        <div className="flex flex-col gap-0">
          <p className={`${styles.doctorName}`}>{data.name}</p>
          <p className={`${styles.doctorSpecialty} oneLineEllipsis`}>
            {data.username}
          </p>
        </div>
      </div>
    );
  };

  const getMyDoctors = async () => {
    // const res = await api.post("patient/getMyDoctors", {
    //   patientId: userData?._id,
    // });

    if (userData) {
      // const res = await fetch(
      //   `${process.env.REACT_APP_BACKEND_CLINIC}patient/getMyDoctors`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //     body: JSON.stringify({
      //       patientId: userData?._id,
      //     }),
      //   }
      // );
      // setMyDoctors(res);
      console.log("MY DOCTORS");
      // console.log(await res?.json());
      // setMyDoctors(await res?.json());
    } else {
      console.log("WTF");
      console.log(userData);
    }
  };

  return (
    <div className="w-full flex gap-4 items-center justify-center pt-12">
      {!isSupport && (
        <div className={`${styles.inboxContainer}`}>
          {allPatients?.map((patient: any, idx: number) => {
            return renderInboxItem({
              id: patient?._id,
              name: patient?.name,
              username: patient?.username,
            });
          })}
        </div>
      )}
      <div
        className={`${styles.chatContainer} chatContainer h-full flex flex-col items-center justify-end`}
      >
        <div
          className="w-full chatOverflow flex flex-col-reverse"
          style={{ overflow: "auto", scrollBehavior: "smooth" }}
        >
          <div className="w-full flex flex-col flex-grow justify-end mb-5">
            {messagesLoading ? (
              <div className="w-full flex items-center justify-center p-5">
                <JellyLoader />
              </div>
            ) : messages?.length > 0 ? (
              // @ts-ignore
              messages.map((msg: any, idx: any) => {
                const isMe = msg.sender_id === userData?._id;

                // Check if the current message's date is different from the previous one
                const showDate =
                  idx === 0 ||
                  new Date(msg.created_at).toDateString() !==
                    new Date(messages[idx - 1].created_at).toDateString();

                const animationDelay = (messages.length - idx) * 0.05;
                const animationDuration = 0.5;
                // const easeBezier = [0.38, 0.01, 0.39, 1.1];
                const easeBezier = [0.26, 0.41, 0.32, 0.99];
                //cubic-bezier()
                //x: 50 * (isMe ? 1 : -1)
                // console.log("MESSAGES: ", messages);
                return (
                  <>
                    {showDate && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{
                          duration: animationDuration,
                          ease: easeBezier,
                          delay: animationDelay,
                        }}
                        exit={{ opacity: 0 }}
                        className="w-full flex items-center justify-between gap-x-3 mt-12 mb-8"
                      >
                        <div className="w-full h-[0.5px] bg-zinc-800" />
                        <p className={`text-center ${styles.dateContainer}`}>
                          {formatDate(msg?.created_at)}
                        </p>
                        <div className="w-full h-[0.5px] bg-zinc-800" />
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: animationDuration,
                        ease: easeBezier,
                        delay: animationDelay,
                      }}
                      className={`relative ${styles.chatBox} ${
                        isMe ? styles.me : styles.him
                      }`}
                    >
                      <p className={`absolute ${styles.time}`}>
                        {getTimeFromDate(msg.created_at)}
                      </p>
                      <p>{msg.message_text}</p>
                    </motion.div>
                  </>
                );
              })
            ) : (
              <p className="w-full text-center opacity-30">
                - You have no messages yet -
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between w-full mt-3">
          <Input
            value={newMessage}
            placeholder="Send a message"
            style={{ height: "3rem" }}
            onChange={(e: any) => setNewMessage(e.target.value)}
            onKeyPress={handleEnterPress}
          ></Input>
          <div
            id={`${styles.sendButton}`}
            className={`${styles.sendButton} flex items-center justify-center cursor-pointer`}
            onClick={async () => {
              await handleSendMessage({
                sender_id: userData?._id,
                receiver_id: recepientId ?? "",
                message_text: newMessage,
              });
            }}
          >
            <SendOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
