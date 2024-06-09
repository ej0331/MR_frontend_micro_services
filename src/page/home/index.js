import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import QuestionTab from "./question";
import TimeTab from "./time";
import { getQuantityLimitedPracticeList } from "../../api/quantityLimitedPractice";
import { getTimeLimitedPracticetList } from "../../api/timeLimitedPractice";
import {
  formatDate,
  formatDateTime,
  secondsToMinutes,
} from "../../utilities/timeFormater";
import { classes } from "../../api/class";

function Home() {
  // tab
  const questionTab = "question";
  const [activeTab, setActiveTab] = useState("question");
  // class
  const [classData, setClassData] = useState([]);
  const [classtypeIdList, setclassTypeIdList] = useState([]);
  const [classtypeIdListStr, setclassTypeIdListStr] = useState(null);
  const [classisOpen, classsetIsOpen] = useState(false);
  // classCheckboxData
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "真分數", checked: false },
    { id: 2, label: "假分數", checked: false },
    { id: 3, label: "帶分數", checked: false },
  ]);
  // tableData
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [typeIdList, setTypeIdList] = useState([]);
  const [typeIdListStr, setTypeIdListStr] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formattedStartDate, setFormattedStartDate] = useState(null);
  const [formattedEndDate, setFormattedEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); //頁數參數
  const [pageSize, setPageSize] = useState(10); // 筆數參數
  const [tableData, setTableData] = useState([]);
  const [maxPage, setMaxPage] = useState(null);
  const [itemFrom, setItemFrom] = useState(null);
  const [itemTo, setItemTo] = useState(null);
  const [itemTotal, setItemTotal] = useState(null);
  const myStyles = {
    height: "85%",
  };
  const selectedclassCheckboxes = classData.filter(
    (checkbox) => checkbox.checked
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await classes();
        const updatedClassData = res.map((classItem) => ({
          ...classItem,
          checked: false,
        }));
        setClassData(updatedClassData);
        // setClassData(res);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const isClassChecked = classData.some((item) => !item.checked);
    const isQuesChecked = checkboxes.some((item) => !item.checked);

    if ( !isQuesChecked || !isClassChecked || activeTab == null ){
      return
    }
    fetchAndSetData();
  }, [
    activeTab,
    classData,
    userName,
    formattedStartDate,
    formattedEndDate,
    checkboxes,
    pageSize,
    currentPage,
  ]);

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

  const selectedCheckboxes = checkboxes.filter((checkbox) => checkbox.checked);

  //每頁最大值更改
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  //當前頁數更改
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchAndSetData = async () => {
    let modifiedData = [];
    try {
      const res =
        activeTab === questionTab
          ? await getQuantityLimitedPracticeList(
              classtypeIdListStr,
              userName,
              typeIdListStr,
              formattedStartDate,
              formattedEndDate,
              currentPage, //頁數參數
              pageSize // 筆數參數
            )
          : await getTimeLimitedPracticetList(
              classtypeIdListStr,
              userName,
              typeIdListStr,
              formattedStartDate,
              formattedEndDate,
              currentPage, //頁數參數
              pageSize // 筆數參數
            );

      if (activeTab === questionTab) {
        modifiedData = res.data.data.map((item, index) => {
          return {
            ...item,
            serialNumber: index + 1,
            level1_time: secondsToMinutes(item.level1_time),
            level2_time: secondsToMinutes(item.level2_time),
            level3_time: secondsToMinutes(item.level3_time),
            finished_at: formatDateTime(new Date(item.finished_at)),
          };
        });
      } else {
        modifiedData = res.data.data.map((item, index) => {
          return {
            ...item,
            serialNumber: index + 1,
            level1_time: secondsToMinutes(item.level1_time),
            level1_time_limit: secondsToMinutes(item.level1_time_limit),
            level2_time: secondsToMinutes(item.level2_time),
            level2_time_limit: secondsToMinutes(item.level2_time_limit),
            level3_time: secondsToMinutes(item.level3_time),
            level3_time_limit: secondsToMinutes(item.level3_time_limit),
            finished_at: formatDateTime(new Date(item.finished_at)),
          };
        });
      }

      setMaxPage(res.data.max_page);
      setItemFrom(res.data.from);
      setItemTo(res.data.to);
      setItemTotal(res.data.total);
      setTableData(modifiedData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleStartDateChange = (date) => {
    if (date == null) setStartDate(null);
    let formattedDate = formatDate(date);
    setStartDate(date);
    setFormattedStartDate(formattedDate);
  };

  const handleEndDateChange = (date) => {
    if (date == null) setEndDate(null);
    let formattedDate = formatDate(date);
    setEndDate(date);
    setFormattedEndDate(formattedDate);
  };

  const handleTabChange = (tab) => {
    setCurrentPage(1);
    setActiveTab(tab);
  };

  const handleCheckboxChange = (id) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );

    if (typeIdList.includes(id)) {
      let index = typeIdList.indexOf(id);
      typeIdList.splice(index, 1);
    } else {
      typeIdList.push(id);
    }

    let checked_list_str = typeIdList.join(",");
    setTypeIdListStr(checked_list_str);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className=" flex flex-col h-full p-1 bg-backgroundcolor"
      style={{ width: `calc(100% - 160px)` }}
    >
      <div className="flex flex-row justify-between max-h-24">
        <div className="flex items-end">
          <div
            className={`cursor-pointer px-4 py-2 rounded-t-lg h-10 w-24 font-bold text-center flex flex-row ${
              activeTab === "question"
                ? "bg-secondcolor text-white"
                : "bg-containbackground text-textcolor"
            }`}
            onClick={() => handleTabChange("question")}
          >
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
                stroke-width="2"
                d="M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z"
              />
            </svg>
            限題
          </div>
          <div
            className={`cursor-pointer px-4 py-2 rounded-t-lg h-10 w-24 font-bold text-center flex flex-row ${
              activeTab === "time"
                ? "bg-secondcolor text-white"
                : "bg-containbackground text-textcolor"
            }`}
            onClick={() => handleTabChange("time")}
          >
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
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            限時
          </div>
        </div>
        <form class="flex w-4/5 p-2">
          <div class="w-full flex flex-row justify-end items-end">
            <div className="mx-2">
              <label
                for="checkbox"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                班級：
              </label>
              <div className="border bg-white text-sm text-gray border-none p-2 w-32 rounded-md focus:outline-none relative">
                <div
                  onClick={classtoggleDropdown}
                  className="cursor-pointer w-full flex flex-row justify-between items-center"
                >
                  {selectedclassCheckboxes.length == 0
                    ? "請選擇"
                    : selectedclassCheckboxes.length}
                  {classisOpen ? (
                    <svg
                      class="w-5 h-5 text-gray"
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
                      class="w-5 h-5 text-gray"
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
                          id={`class-checkbox-${classData.id}`}
                          checked={classData.checked}
                          onChange={() =>
                            handleclassCheckboxChange(classData.id)
                          }
                        />
                        <label
                          className="min-w-16"
                          htmlFor={`class-checkbox-${classData.id}`}
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
                onChange={handleNameChange}
              />
            </div>
            <div className="mx-2">
              <label
                for="checkbox"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                題型：
              </label>
              <div className="border bg-white text-gray border-none p-2 w-32 rounded-md focus:outline-none relative">
                <div
                  onClick={toggleDropdown}
                  className="cursor-pointer w-full flex flex-row text-sm justify-between items-center"
                >
                  {selectedCheckboxes.length == 0
                    ? "請選擇"
                    : selectedCheckboxes.length}
                  {isOpen ? (
                    <svg
                      class="w-5 h-5 text-gray"
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
                      class="w-5 h-5 text-gray"
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
                {isOpen && (
                  <div className="absolute top-11 text-sm left-0 bg-white p-2 w-full rounded z-10">
                    {checkboxes.map((checkbox) => (
                      <div
                        key={checkbox.id}
                        className="mb-2 flex flex-row justify-around"
                      >
                        <input
                          type="checkbox"
                          id={`checkbox-${checkbox.id}`}
                          checked={checkbox.checked}
                          onChange={() => handleCheckboxChange(checkbox.id)}
                        />

                        <label
                          htmlFor={`checkbox-${checkbox.id}`}
                          className="min-w-16"
                        >
                          {checkbox.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mx-2">
              <label
                for="company"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                搜尋時間區間：
              </label>
              <div class="flex flex-row">
                <DatePicker
                  className="border bg-white border-none text-sm p-2 rounded-md focus:outline-none w-32"
                  placeholderText="開始日期"
                  selected={startDate}
                  onChange={(date) => handleStartDateChange(date)}
                  selectsStart
                  dateFormat="yyyy/MM/dd"
                  isClearable
                />
                <p className="mx-2 text-xl text-gray font-medium flex items-center">
                  ~
                </p>
                <DatePicker
                  className="border bg-white border-none text-sm p-2 rounded-md focus:outline-none w-32"
                  placeholderText="結束日期"
                  selected={endDate}
                  onChange={(date) => handleEndDateChange(date)}
                  selectsEnd
                  dateFormat="yyyy/MM/dd"
                  isClearable
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className=" p-5 bg-containbackground" style={myStyles}>
        {activeTab == questionTab ? (
          <QuestionTab
            tableData={tableData}
            formattedStartDate={formattedStartDate}
            formattedEndDate={formattedEndDate}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            currentPage={currentPage}
            maxPage={maxPage}
            onPageChange={handlePageChange}
            itemFrom={itemFrom}
            itemTo={itemTo}
            itemTotal={itemTotal}
          />
        ) : (
          <TimeTab
            tableData={tableData}
            formattedStartDate={formattedStartDate}
            formattedEndDate={formattedEndDate}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            currentPage={currentPage}
            maxPage={maxPage}
            onPageChange={handlePageChange}
            itemFrom={itemFrom}
            itemTo={itemTo}
            itemTotal={itemTotal}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
