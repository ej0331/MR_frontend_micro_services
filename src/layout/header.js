import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Signout } from "../api/API";
import image from "../config/image";
import "./style.css";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

function HeaderComponent() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const logoutSuccess = await Signout();

      if (logoutSuccess) {
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
 

  return (
    <div id="header">
      <Disclosure as="nav" className="bg-maincolor">
        <div className="mx-auto max-w-9xl px-5 ">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <p className="font-black text-lg">MR分數訓練</p>
              </div>
            </div>
            <div className=" md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none">
                      <span className="absolute -inset-1.5" />
                      <img
                        className="h-10 w-10 rounded-full"
                        src={image.people}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1  ring-opacity-5 focus:outline-none cursor-pointer">
                      <Menu.Item>
                        <div
                          className="flex flex-row justify-center items-center"
                          onClick={handleLogout}
                        >
                          <p>登出</p>
                          <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1"
                              d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                            />
                          </svg>
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default HeaderComponent;
