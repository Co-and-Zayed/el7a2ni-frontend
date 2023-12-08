import { useSelector } from "react-redux";
import { CSSProperties } from "react";
import { RootState } from "VirtualClinic/redux/rootReducer";
import JSZip from "jszip";
import axios from "axios";
import store from "VirtualClinic/redux/store";

export const useFunctions = () => {
  const handleUpload = async (form: {
    files: any;
    endpoint: any;
    data: {
      createdAt: Date;
      [key: string]: any;
    };
  }) => {
    const formData = new FormData();

    if (form.data) {
      Object.keys(form.data).forEach((key) => {
        formData.append(key, form.data[key]);
      });
    }

    if (form.files) {
      for (let i = 0; i < Array.from(form.files).length; i++) {
        formData.append(`files`, form.files[i]);
      }
    }

    const token = store.getState()?.userReducer?.accessToken;
    // const baseURL = (window.location.pathname.includes("clinic") ? process.env.REACT_APP_BACKEND_CLINIC) : process.env.REACT_APP_BACKEND_PHARMACY;
    return await axios.post(
      `${
        window.location.pathname.includes("/pharmacy/")
          ? process.env.REACT_APP_BACKEND_PHARMACY
          : process.env.REACT_APP_BACKEND_CLINIC
      }${form.endpoint}`,
      formData,
      {
        headers: {
          Authorization: token && token != "" ? `Bearer ${token}` : "",
        },
      }
    );
  };

  // {files: any} for multiple files -> downloads them as a zip file
  // {file: any} for a single file -> downloads it as a single file
  // both expect the url of the each file in the bucket
  const handleDownload = async (download: { files: any } | { file: any }) => {
    if ("files" in download) {
      const zip = new JSZip();

      // Fetch each file and add it to the zip
      await Promise.all(
        download.files.map(async (file: any, index: any) => {
          const response = await fetch(
            `${process.env.REACT_APP_BUCKET_URL}${file}`,
            {
              mode: `cors`,
            }
          );
          const blob = await response.blob();
          zip.file(`${index + 1}- ${file}`, blob);
        })
      );

      // Generate the zip file
      zip.generateAsync({ type: "blob" }).then((blob) => {
        // Create a temporary anchor element
        const link = document.createElement("a");

        // Set the download attribute with a unique name
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getFullYear()}@${currentDate.getHours()}h${currentDate.getMinutes()}m`;

        link.download = `El7a2ni--health_records--${formattedDate}.zip`;

        // Create a URL for the blob and set it as the href
        link.href = URL.createObjectURL(blob);

        // Append the anchor element to the document
        document.body.appendChild(link);

        // Trigger a click event to initiate the download
        link.click();

        // Remove the anchor element from the document
        document.body.removeChild(link);
      });
    } else if ("file" in download) {
      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = `${process.env.REACT_APP_BUCKET_URL}${download.file}`;
      link.download = download.file;

      // For image files, add the download attribute to force download
      if (download.file.match(/\.(jpeg|jpg|gif|png)$/)) {
        link.setAttribute("target", "blank");
      }

      // Append the anchor element to the document
      document.body.appendChild(link);

      // Trigger a click event to initiate the download
      link.click();

      // Remove the anchor element from the document
      document.body.removeChild(link);
    }
  };

  function toDecimalPlaces(value: any, decimalPlaces: number) {
    return value?.toLocaleString(undefined, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
  }

  const getTimeFromDate = (dateStr: string) => {
    // covert string to date
    var date = new Date(dateStr);
    // convert to 12 hour time format
    var datetime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return datetime;
  };

  const getTimeAgo = (dateStr: string) => {
    return dateStr.split("T")[0];
  };

  return {
    handleDownload,
    handleUpload,
    toDecimalPlaces,
    getTimeFromDate,
    getTimeAgo,
  };
};
