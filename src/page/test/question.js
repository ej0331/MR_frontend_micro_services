import React, { useState, useEffect } from "react";
import Button from "../../component/button/index";
import Modal from "../../component/chart/testquestion";
import "./table.css";
import ExcelJS from "exceljs";
import { getQuantityLimitedTestChartData } from "../../api/quantityLimitedTest";
import { QuantityLimitedTestlist } from "../../api/excel";
import { formatDateTime, secondsToMinutes } from "../../utilities/timeFormater";
import Pagination from "../../component/pagination";

const QuestionTab = ({
  tableData,
  formattedStartDate,
  formattedEndDate,
  onPageSizeChange,
  pageSize,
  currentPage,
  maxPage,
  onPageChange,
  itemFrom,
  itemTo,
  itemTotal,
}) => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [clickedUserId, setClickedUserId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchChartData = async (id) => {
    try {
      const res = await getQuantityLimitedTestChartData(id, startDate, endDate);
      res.data.data.level1_finished_at_list =
        res.data.data.level1_finished_at_list
          .map((item) => formatDateTime(new Date(item)))
          .reverse();
      res.data.data.level2_finished_at_list =
        res.data.data.level2_finished_at_list
          .map((item) => formatDateTime(new Date(item)))
          .reverse();
      res.data.data.level3_finished_at_list =
        res.data.data.level3_finished_at_list
          .map((item) => formatDateTime(new Date(item)))
          .reverse();
      setChartData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  useEffect(() => {
    setStartDate(formattedStartDate);
  }, [formattedStartDate]);

  useEffect(() => {
    setEndDate(formattedEndDate);
  }, [formattedEndDate]);

  //每頁最大值更改
  const handlePageSizeChange = (e) => {
    onPageSizeChange(e.target.value);
  };

  //當前頁數更改
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  useEffect(() => {
    if (!isModalVisible) return;
    fetchChartData(clickedUserId);
  }, [isModalVisible]);

  const handleInsertButtonClick = (id) => {
    setModalVisible(!isModalVisible);
    setClickedUserId(id);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDownload = async () => {
    try {
      const res = await QuantityLimitedTestlist();
      // 創建一個新的工作簿
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("分頁一");

      // 添加表頭
      const headerRow = worksheet.addRow([
        "編號",
        "班級",
        "姓名",
        "題型",
        "第一關-對",
        "第一關-錯",
        "第一關-總",
        "第一關-耗時",
        "第二關-對",
        "第二關-錯",
        "第二關-總",
        "第二關-耗時",
        "第三關-對",
        "第三關-錯",
        "第三關-總",
        "第三關-耗時",
        "完成日期",
      ]);

      // 設置表頭樣式
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF3498DB" },
        };
      });

      // 表格內容
      res &&
        res.length > 0 &&
        res.forEach((item, index) => {
          const rowData = [
            index + 1,
            item.class_.name,
            item.user.name,
            item.type.name,
            item.level1_correct_quantity,
            item.level1_incorrect_quantity,
            item.level1_total_quantity,
            secondsToMinutes(item.level1_time),
            item.level2_correct_quantity,
            item.level2_incorrect_quantity,
            item.level2_total_quantity,
            secondsToMinutes(item.level2_time),
            item.level3_correct_quantity,
            item.level3_incorrect_quantity,
            item.level3_total_quantity,
            secondsToMinutes(item.level3_time),
            formatDateTime(new Date(item.finished_at)),
          ];
          worksheet.addRow(rowData);
        });

      // 生成 Excel 檔案
      const buffer = await workbook.xlsx.writeBuffer();

      // 創建 Blob
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // 下載連結
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "學生測驗-限題.xlsx";

      // 點擊連結
      a.click();

      // 釋放 URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  const QuestionTable = (
    <div className="h-full ">
      <div class="mx-auto  max-w-screen-xl flex justify-end mb-4">
        <Button text="下載表格" className="download" onClick={handleDownload} />
      </div>
      <div
        class="mx-auto max-w-screen-xl relative overflow-auto shadow-md sm:rounded-lg"
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
                class="px-3 min-w-24 font-black text-base  bg-secondcolor sticky left-0"
              >
                編號
              </th>
              <th
                scope="col"
                class="px-3 min-w-24 font-black text-base  bg-secondcolor sticky"
                style={{ left: `96px` }}
              >
                班級
              </th>
              <th
                scope="col"
                class="px-3  min-w-32 font-black text-base  bg-secondcolor sticky"
                style={{ left: `192px` }}
              >
                姓名
              </th>
              <th
                scope="col"
                class="px-3 min-w-32 font-black text-base  bg-secondcolor sticky"
                style={{ left: `320px` }}
              >
                題型
              </th>
              <th scope="col" class="px-3 min-w-36 font-black text-base">
                第一關-對
              </th>
              <th scope="col" class="px-3 min-w-36 font-black text-base">
                第一關-錯
              </th>
              <th scope="col" class="px-3 min-w-36 font-black text-base">
                第一關-總
              </th>
              <th scope="col" class="px-3 min-w-36 font-black text-base">
                第一關-耗時
              </th>
              <th scope="col" class="px-3 min-w-36 font-black text-base">
                第二關-對
              </th>
              <th scope="col" class="px-3 min-w-36 font-black text-base">
                第二關-錯
              </th>
              <th scope="col" class="px-3 min-w-36 font-black text-base">
                第二關-總
              </th>
              <th scope="col" class="px-3 min-w-36 font-black text-base">
                第二關-耗時
              </th>
              <th scope="col" class="px-3 min-w-36 font-black text-base">
                第三關-對
              </th>
              <th scope="col" class="px-3 min-w-36 font-black text-base">
                第三關-錯
              </th>
              <th scope="col" class="px-3 min-w-36 font-black text-base">
                第三關-總
              </th>
              <th scope="col" class="px-3 min-w-36 font-black text-base">
                第三關-耗時
              </th>
              <th scope="col" class="px-3 min-w-36 font-black text-base">
                完成日期
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length != 0 ? (
              data.map((item) => (
                <tr key={item.serialNumber} class=" ring-1 ring-white">
                  <td
                    scope="row"
                    class="px-3 max-w-32 py-4 font-bold text-textcolor whitespace-nowrap dark:text-textcolor  ring-1 ring-black sticky"
                    style={{ top: `53px`, left: `0px` }}
                  >
                    {` ${item.serialNumber + (currentPage - 1) * pageSize}`}
                  </td>
                  <td
                    scope="row"
                    class="px-3 max-w-32 py-4 font-bold text-textcolor whitespace-nowrap dark:text-textcolor  ring-1 ring-black sticky"
                    style={{ top: `53px`, left: `96px` }}
                  >
                    {` ${item.class_.name}`}
                  </td>
                  <td
                    class="px-3 min-w-32 py-4 font-bold  sticky cursor-pointer"
                    style={{ top: `53px`, left: `192px` }}
                    onClick={() => handleInsertButtonClick(item.user.id)}
                  >
                    {` ${item.user.name}`}
                  </td>
                  <td
                    class="px-3 min-w-32 py-4 font-bold  sticky"
                    style={{ top: `53px`, left: `320px` }}
                  >
                    {item.type.name}
                  </td>
                  <td class="px-3 min-w-32 py-4 font-bold">
                    {item.level1_correct_quantity}
                  </td>
                  <td class="px-3 min-w-32 py-4 font-bold">
                    {item.level1_incorrect_quantity}
                  </td>
                  <td class="px-3 min-w-32 py-4 font-bold">
                    {item.level1_total_quantity}
                  </td>
                  <td class="px-3 min-w-32 py-4 font-bold">
                    {item.level1_time}
                  </td>
                  <td class="px-3 min-w-32 py-4 font-bold">
                    {item.level2_correct_quantity}
                  </td>
                  <td class="px-3 min-w-32 py-4 font-bold">
                    {item.level2_incorrect_quantity}
                  </td>
                  <td class="px-3 min-w-32 py-4 font-bold">
                    {item.level2_total_quantity}
                  </td>
                  <td class="px-3 min-w-32 py-4 font-bold">
                    {item.level2_time}
                  </td>
                  <td class="px-3 min-w-32 py-4 font-bold">
                    {item.level3_correct_quantity}
                  </td>
                  <td class="px-3 min-w-32 py-4 font-bold">
                    {item.level3_incorrect_quantity}
                  </td>
                  <td class="px-3 min-w-32 py-4 font-bold">
                    {item.level3_total_quantity}
                  </td>
                  <td class="px-3 min-w-32 py-4 font-bold">
                    {item.level3_time}
                  </td>
                  <td class="px-3 min-w-56 py-4 font-bold">
                    {item.finished_at}
                  </td>
                </tr>
              ))
            ) : (
              <tr class="font-bold text-lg text-center text-darkgray py-20">
                <td class="p-8 bg-maincolor" colSpan={17}>
                  查無資料
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <nav
        class="max-w-screen-xl flex items-center flex-row justify-between pt-2 px-5 mx-auto"
        aria-label="Table navigation"
        style={{ height: `45px` }}
      >
        <span class="text-sm font-bold text-gray mb-4 md:mb-0 block md:inline md:w-auto">
          顯示第{" "}
          <span class="font-semibold text-darkblue">
            {itemFrom}-{itemTo}，
          </span>{" "}
          共<span class="font-semibold text-darkblue">{itemTotal}</span>筆
        </span>
        <Pagination
          currentPage={currentPage}
          maxPage={maxPage}
          onPageChange={handlePageChange}
        />
        <div className="relative">
          <select
            id="countries"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="w-20 h-8 bg-white text-gray text-sm rounded-lg block appearance-none px-2 pr-8 cursor-pointer focus:outline-none"
          >
            <option value="10" selected>
              10
            </option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5 text-gray"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </nav>
      {isModalVisible && (
        <Modal onClose={handleCloseModal} chartData={chartData} />
      )}
    </div>
  );

  return <div className="h-full">{QuestionTable}</div>;
};

export default QuestionTab;
