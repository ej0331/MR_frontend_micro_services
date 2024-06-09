import React, { useState, useEffect } from "react";
import Button from "../../component/button/index";
import DeleteModal from "../../component/modal/delete";
import InsertModal from "../../component/modal/insert";
import UpdateModal from "../../component/modal/update";
import { students } from "../../api/account";
import { classes } from "../../api/class";

function Account() {
  const myStyles = {
    height: "85%",
  };
  const [name, setname] = useState(null);
  const [account, setAccount] = useState(null);
  const [studentData, setStudentData] = useState([]);
  // 測試
  const [classData, setClassData] = useState([]);
  const [classtypeIdList, setclassTypeIdList] = useState([]);
  const [classtypeIdListStr, setclassTypeIdListStr] = useState(null);
  const [classisOpen, classsetIsOpen] = useState(false);
  // modalData
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [Account, setModalAccount] = useState(null);
  const [Name, setModalName] = useState(null);
  const [Id, setModalId] = useState(null);
  const [Classid, setModalclassid] = useState(null);
  const [Classname, setModalclassname] = useState(null);
  const [isInsertModalVisible, setInsertModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const selectedclassCheckboxes = classData.filter(
    (checkbox) => checkbox.checked
  );
  const handleclassCheckboxChange = (id) => {
    setClassData((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );

    if (classtypeIdList.includes(id)) {
      let index = classtypeIdList.indexOf(id);
      classtypeIdList.splice(index, 1);
    } else {
      classtypeIdList.push(id);
    }

    let checked_list_str = classtypeIdList.join(",");
    setclassTypeIdListStr(checked_list_str);
  };
  const classtoggleDropdown = () => {
    classsetIsOpen(!classisOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await classes();
        setClassData(res);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const isClassChecked = classData.some((item) => !item.checked);
    if (!isClassChecked) {
      return;
    }
    fetchData();
  }, [classData, name, account]);

  const fetchData = async () => {
    try {
      const res = await students(classtypeIdListStr, name, account);
      setStudentData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlenameChange = (event) => {
    setname(event.target.value);
  };
  const handleaccountChange = (event) => {
    setAccount(event.target.value);
  };

  // 控制顯示或隱藏 Delete Modal
  const handleDeleteButtonClick = (id, account) => {
    setModalId(id);
    setModalAccount(account);
    setDeleteModalVisible(true);
  };

  // 控制顯示或隱藏 Insert Modal
  const handleInsertButtonClick = () => {
    setInsertModalVisible(true);
  };

  // 控制顯示或隱藏 Update Modal
  const handleUpdateButtonClick = (id, name, account, class_id, class_name) => {
    setModalId(id);
    setModalName(name);
    setModalAccount(account);
    setModalclassid(class_id);
    setModalclassname(class_name);
    setUpdateModalVisible(true);
  };

  // 關閉 Delete Modal 的回調函數
  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  // 關閉 Insert Modal 的回調函數
  const handleCloseInsertModal = () => {
    setInsertModalVisible(false);
  };

  // 關閉 Update Modal 的回調函數
  const handleCloseUpdateModal = () => {
    setUpdateModalVisible(false);
  };

  return (
    <div
      className=" flex flex-col h-full p-1 bg-backgroundcolor"
      style={{ width: `calc(100% - 160px)` }}
    >
      <div className="max-h-24 w-full flex justify-end">
        <form class="flex p-2">
          <div class="w-full flex flex-row justify-end items-end">
            <div className="mx-2">
              <label
                for="checkbox"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                班級：
              </label>
              <div className="border bg-white border-none p-2 text-sm text-gray w-32 rounded-md focus:outline-none relative">
                <div
                  onClick={classtoggleDropdown}
                  className="cursor-pointer w-full flex flex-row justify-between items-center"
                >
                  {selectedclassCheckboxes.length == 0
                    ? "請選擇"
                    : selectedclassCheckboxes.length}
                  {classisOpen ? (
                    <svg
                      class="w-5 h-5 text-gray dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m5 15 7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      class="w-5 h-5 text-gray dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 9-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
                {classisOpen && (
                  <div className="absolute top-11 left-0 bg-white p-2 w-full rounded z-10">
                    {classData.map((classData) => (
                      <div
                        key={classData.id}
                        className="mb-2 flex flex-row justify-around"
                      >
                        <input
                          type="checkbox"
                          id={`checkbox-${classData.id}`}
                          checked={classData.checked}
                          onChange={() =>
                            handleclassCheckboxChange(classData.id)
                          }
                        />
                        <label
                          className="min-w-16"
                          htmlFor={`checkbox-${classData.id}`}
                        >
                          {classData.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mx-2">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                姓名：
              </label>
              <input
                type="text"
                id="first_name"
                class="border border-none px-3 py-2 w-32 text-sm rounded-md focus:outline-none focus:border-blue-500"
                placeholder="王小明"
                onChange={handlenameChange}
              />
            </div>
            <div className="mx-2">
              <label
                for="account"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                帳號：
              </label>
              <input
                type="text"
                id="account"
                class="border border-none px-3 py-2 w-32 text-sm rounded-md focus:outline-none focus:border-blue-500"
                placeholder="123456"
                onChange={handleaccountChange}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="p-5 bg-containbackground" style={myStyles}>
        <div
          className="min-w-full h-full block justify-center items-center"
          // style={{ height: `calc(100% - 53px)` }}
        >
          <div class="mx-auto  max-w-screen-xl flex justify-end mb-4">
            <Button
              text="新增帳號"
              className="insert"
              onClick={handleInsertButtonClick}
            />
          </div>
          <div
            class="mx-auto max-w-screen-xl overflow-auto shadow-md sm:rounded-lg"
            style={{ maxHeight: `calc(100% - 90px)` }}
          >
            <table class="w-full text-sm text-left rtl:text-right text-textcolor dark:text-textcolor ">
              <thead
                class="text-xs text-white uppercase bg-secondcolor dark:text-white sticky top-0"
                style={{ height: `53px` }}
              >
                <tr className="relative">
                  <th
                    scope="col"
                    class="px-3 w-24 font-black text-base  bg-secondcolor "
                  >
                    編號
                  </th>
                  <th
                    scope="col"
                    class="px-3  w-24 font-black text-base  bg-secondcolor "
                  >
                    班級
                  </th>
                  <th
                    scope="col"
                    class="px-3 w-32 font-black text-base  bg-secondcolor "
                  >
                    姓名
                  </th>
                  <th scope="col" class="px-3 w-32 font-black text-base">
                    帳號
                  </th>
                  <th
                    scope="col"
                    class="px-3 min-w-12 font-black text-base max-w-64"
                  >
                    功能
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentData.length != 0 ? (
                  studentData.map((item, index) => (
                    <tr key={item.id} class="ring-1 ring-white">
                      <td
                        scope="row"
                        class="px-3 w-24 py-4 font-bold  text-textcolor whitespace-nowrap dark:text-textcolor  ring-1 ring-black "
                      >
                        {index + 1}
                      </td>
                      <td class="px-3 w-24 py-4 font-bold">{` ${item.class_.name}`}</td>
                      <td class="px-3 w-32 py-4 font-bold">{` ${item.name}`}</td>
                      <td class="px-3 w-32 py-4 font-bold">{` ${item.account}`}</td>
                      <td class="px-3 min-w-12 py-4 max-w-64">
                        <Button
                          text="修改資訊"
                          className="update mr-1 sm:mr-2 my-1 sm:my-0"
                          onClick={() =>
                            handleUpdateButtonClick(
                              item.id,
                              item.name,
                              item.account,
                              item.class_.id,
                              item.class_.name
                            )
                          }
                        />
                        <Button
                          text="刪除帳號"
                          className="delete ml-1 sm:ml-2 my-1 sm:my-0"
                          onClick={() =>
                            handleDeleteButtonClick(item.id, item.account)
                          }
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr class="font-bold text-lg text-center text-darkgray py-20">
                    <td class="p-8 bg-maincolor" colSpan={11}>
                      查無資料
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isDeleteModalVisible && (
        <DeleteModal
          onClose={handleCloseDeleteModal}
          id={Id}
          account={Account}
          fetchData={fetchData}
        />
      )}
      {isUpdateModalVisible && (
        <UpdateModal
          onClose={handleCloseUpdateModal}
          id={Id}
          name={Name}
          account={Account}
          class_id={Classid}
          class_name={Classname}
          fetchData={fetchData}
        />
      )}
      {isInsertModalVisible && (
        <InsertModal onClose={handleCloseInsertModal} fetchData={fetchData} />
      )}
    </div>
  );
}

export default Account;
