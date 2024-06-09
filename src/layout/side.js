import React, { useState, useEffect } from "react";
import { studentHealthCheck } from "../api/account";
import { classHealthCheck } from "../api/class";
import { Link, useLocation } from "react-router-dom";
import HeaderComponent from "./header";
import { Tooltip, Button } from "@material-tailwind/react";
import "./style.css";

const SideComponent = () => {
  const [healthDict, setHealthDict] = useState({
    "學生練習": false,
    "學生測驗": false,
    "學生帳號": false,
    "班級管理": false,
  })
  const location = useLocation();

  const checkisClassHealth = async () => {
    try {
      const status = await classHealthCheck();
      if (status === 200) {
        setHealthDict((prevHealthDict) => {
          return { ...prevHealthDict, "班級管理": true };
        })
      }
    } catch (error) {
      console.error("Error fetching class health check:", error);
    }
  };

  const checkStudentIsHealth = async () => {
    try {
      const status = await studentHealthCheck();
      if (status === 200) {
        setHealthDict((prevHealthDict) => {
          return { ...prevHealthDict, "學生帳號": true };
        })
      }
    } catch (error) {
      console.error("Error fetching student health check:", error);
    }
  };

  useEffect(() => {
    checkisClassHealth()
    checkStudentIsHealth()
  }, [])

  const menuItems = [
    {
      label: "學生練習",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
      ),
      path: "/home",
    },
    {
      label: "學生測驗",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>
      ),
      path: "/test",
    },
    {
      label: "學生帳號",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      ),
      path: "/account",
    },
    {
      label: "班級管理",
      icon: (
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.1 20A3.1 3.1 0 0 1 4 16.9v-12c0-.5.4-.9.9-.9h4.4c.5 0 1 .4 1 .9v12c0 1.7-1.5 3.1-3.2 3.1Zm0 0h12c.5 0 .9-.4.9-.9v-4.4c0-.5-.4-1-.9-1h-4.4l-.6.3-3.8 3.7-.1.2c-.9 1.4-1.6 1.8-3 2.1Zm0-3.6h0m8-10.9 3.1 3.2c.3.3.3.9 0 1.2l-8 8V9l3.6-3.6c.3-.3 1-.3 1.3 0Z"
          />
        </svg>
      ),
      path: "/class",
    },
    // Add more items as needed
  ];

  return (
    <div id="side" className="w-auto">
      <div className="bg-maincolor text-white h-full left-0">
        {/* Sidebar content goes here */}
        <div className="">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              if (!healthDict[item.label]) {
                return (
                  <Tooltip key={index} content={
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6 mr-1"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                      </svg>
                      維護中
                    </div>
                  } placement={"right"} className="bg-red px-3 py-2">
                    <li className={`px-6 py-2 w-40 rounded bg-lightgray`}>
                      <Link
                        className={`flex items-center font-black pointer-events-none bg-lightgray text-containbackground`}
                      >
                        <span className="mr-4">{item.icon}</span>
                        {item.label}
                      </Link>
                    </li>
                  </Tooltip>
                )
              }
              return (
                <li
                  key={index}
                  className={`px-6 py-2 w-40 rounded ${location.pathname === item.path ? "bg-secondcolor" : "bg-maincolor"
                    }`}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center font-black ${location.pathname === item.path ? "bg-secondcolor text-white" : "bg-maincolor text-textcolor"
                      }`}
                  >
                    <span className="mr-4">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideComponent;
