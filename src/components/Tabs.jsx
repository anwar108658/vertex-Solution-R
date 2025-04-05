import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { activeTab, removeTab } from "../store/subMenuData/subMenuSlice";

const Tabs = () => {
  const { subMenu } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/")[1];
  return (
    <div
      tabIndex={0}
      className={`flex gap-3 px-2 ${location === "form" ? "block" : "hidden"}`}
    >
      {subMenu?.tabs?.length > 0
        ? subMenu?.tabs.map((item,index) => (
            <div key={index} className="flex items-center gap-2">
              <button
                onClick={() => dispatch(activeTab(item?.id))}
                className={`relative flex gap-2 items-center text-[.8rem] py-1 hover:bg-blue-50 text-gray-700 cursor-pointer 
                  after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] 
                  after:bg-blue-500 after:transition-all after:duration-300 after:ease-in-out 
                ${item.id === subMenu?.activeTab ? "after:w-full" : "after:w-0"}`}
              >
                <p>{item.reportName}</p>
              </button>
              <button
                onClick={() => {
                  dispatch(removeTab(item.id)); // Remove the tab

                  // Find the next available tab to activate
                  const remainingTabs = subMenu?.tabs.filter(
                    (tab) => tab.id !== item.id
                  );
                  dispatch(
                    activeTab(
                      remainingTabs.length > 0 ? remainingTabs[0].id : null
                    )
                  );
                }}
                className="cursor-pointer"
              >
                <FontAwesomeIcon color="red" icon={faClose} />
              </button>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Tabs;
