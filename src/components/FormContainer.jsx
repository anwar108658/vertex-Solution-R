import {
  faCircleDown,
  faCircleUp,
  faExpand,
  faEye,
  faFileExcel,
  faPlus,
  faPrint,
  faRepeat,
  faShare,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextBox, Tooltip } from "devextreme-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
const baseurl = import.meta.env.VITE_BASE_URL;
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "./Grid";
import PiovetGrid from "./PiovetGrid";

const FormContainer = ({ item }) => {
  const userdata = JSON.parse(sessionStorage.getItem("userData"));

  const location = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();

  const [inputElemShow, setInputElemShow] = useState(true);
  const [gridElemShow,setGridElemShow] = useState(true)
  const [gridShow, setGridShow] = useState();

  const [reportData, setReportData] = useState();
  //
  const getReportData = async () => {
    try {
      const response = await fetch(
        `${baseurl}report/LoadReport/${item?.reportId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userdata?.authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const text = await response.text(); // Get response as text

      const data = JSON.parse(text); // Convert to JSON
      setReportData(data?.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
  useEffect(() => {
    getReportData();
  }, []);

  //  for Menu Icon
  const formIcon = [
    { icon: <FontAwesomeIcon icon={faSpinner} />, text: "Load" },
    { icon: <FontAwesomeIcon icon={faFileExcel} />, text: "Load_to_Excel" },
    { icon: <FontAwesomeIcon icon={faDownload} />, text: "Download" },
    { icon: <FontAwesomeIcon icon={faShare} />, text: "Share" },
    { icon: <FontAwesomeIcon icon={faPlus} />, text: "Add" },
    { icon: <FontAwesomeIcon icon={faXmark} />, text: "Close" },
    { icon: <FontAwesomeIcon icon={faRepeat} />, text: "Reload" },
    { icon: <FontAwesomeIcon icon={faEye} />, text: "ReportView" },
  ];
  const formIconRefs = {};
  const formIconHandler = (val) => {
    switch (val) {
      case "Close":
        navigate(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div className={location === "form" ? "block" : "hidden"}>
      {/* for view bar icon/FormIcon */}
      <div className="flex text-blue-500 text-[.8rem] py-1 px-3 border-b-1 border-gray-400">
        {formIcon.map((item) => {
          if (!formIconRefs[item.text]) {
            formIconRefs[item.text] = useRef(null); // Create a ref for each button dynamically
          }
          return (
            <div key={item.text} className="relative">
              <button
                ref={formIconRefs[item.text]}
                onClick={() => formIconHandler(item.text)}
                className="flex items-center hover:bg-blue-200 cursor-pointer rounded-sm py-[4px] px-1"
              >
                {item.icon}
              </button>

              {/* Tooltip tied to the correct button */}
              <Tooltip
                target={formIconRefs[item.text].current}
                showEvent="mouseenter"
                hideEvent="mouseleave"
                hideOnOutsideClick={false}
              >
                <div className="text-[.5rem]">{item.text}</div>
              </Tooltip>
            </div>
          );
        })}
      </div>

      {/* If it is Criteria/reportParam Exist then show*/}
      {item?.reportParams?.length > 0 && (
        <div>
          <div className="flex justify-between items-center px-2 py-1 text-blue-600 text-[.8rem] border-b-1 border-blue-500">
            <p
              className="hover:cursor-pointer"
              onClick={() => setInputElemShow(!inputElemShow)}
            >
              Criteria
            </p>
            <button
              className="hover:cursor-pointer"
              onClick={() => setInputElemShow(!inputElemShow)}
            >
              <FontAwesomeIcon
                icon={inputElemShow ? faCircleUp : faCircleDown}
              />
            </button>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className={`${inputElemShow ? "block" : "hidden"}`}
          >
            {item?.reportParams?.length > 0 &&
              item.reportParams.map((item,index) => (
                <TextBox
                  key={index}
                  stylingMode="underlined"
                  hoverStateEnabled={false}
                  mode={item.fieldName}
                  spellCheck={true}
                  showClearButton={true}
                  // className="!px-2"
                  width={350}
                  inputAttr={{ style: "font-size: 13px;height:14px" }}
                  onValueChange={(e) => handleChange("userName", e)}
                />
              ))}
          </form>
        </div>
      )}

      {/* GridForm */}
      <div>
        <div className="flex justify-between items-center px-2 py-1 text-blue-600 text-[.8rem] border-b-1 border-blue-500">
          <p
            className="hover:cursor-pointer"
            onClick={() => setGridElemShow(!gridElemShow)}
          >
            {item.reportName}
          </p>
          <div className="flex gap-2">
            <div>
              <button className="hover:cursor-pointer">
                <FontAwesomeIcon icon={faExpand} />
              </button>
            </div>
            <button
              className="hover:cursor-pointer"
              onClick={() => setGridElemShow(!gridElemShow)}
            >
              <FontAwesomeIcon
                icon={gridElemShow ? faCircleUp : faCircleDown}
              />
            </button>
          </div>
        </div>
        <div className={`${gridElemShow ? "block" : "hidden"}`}>
          {item?.reportType === "G" ? <Grid data={reportData} /> : <PiovetGrid />}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
