import React from "react";
import ReactEcharts from "echarts-for-react";
import "./index.css";

const Modal = ({  onClose, chartData }) => {
  const handleCancel = () => {
    onClose();
  };
  const level1 = {
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      show: false,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ["耗時"],
    },
    xAxis: {
      type: "category",
      name: "日期",
      data: chartData.level1_finished_at_list,
    },
    yAxis: [
      {
        type: "value",
        name: "分鐘",
        min: 0,
        max: chartData.level1_time_list && Math.max(...chartData.level1_time_list),
        axisLabel: {
          formatter: "{value} ",
        },
      },
    ],
    series: [
      {
        lineStyle: {
          color: "#7392B7",
        },
        itemStyle: {
          color: "#7392B7",
        },
        name: "耗時",
        type: "line",

        tooltip: {
          valueFormatter: function (value) {
            return value + " 分鐘";
          },
        },
        data: chartData.level1_times,
      },
    ],
  };
  const level2 = {
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      show: false,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ["耗時"],
    },
    xAxis: {
      type: "category",
      name: "日期",
      data: chartData.level2_finished_at_list,
    },
    yAxis: [
      {
        type: "value",
        name: "分鐘",
        min: 0,
        max: chartData.level2_time_list && Math.max(...chartData.level2_time_list),
        axisLabel: {
          formatter: "{value} ",
        },
      },
    ],
    series: [
      {
        lineStyle: {
          color: "#7392B7",
        },
        itemStyle: {
          color: "#7392B7",
        },
        name: "耗時",
        type: "line",

        tooltip: {
          valueFormatter: function (value) {
            return value + " 分鐘";
          },
        },
        data: chartData.level2_times,
      },
    ],
  };
  const level3 = {
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      show: false,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ["耗時"],
    },
    xAxis: {
      type: "category",
      name: "日期",
      data: chartData.level3_finished_at_list,
    },
    yAxis: [
      {
        type: "value",
        name: "分鐘",
        min: 0,
        max: chartData.level3_time_list && Math.max(...chartData.level3_time_list),
        axisLabel: {
          formatter: "{value} ",
        },
      },
    ],
    series: [
      {
        lineStyle: {
          color: "#7392B7",
        },
        itemStyle: {
          color: "#7392B7",
        },
        name: "耗時",
        type: "line",

        tooltip: {
          valueFormatter: function (value) {
            return value + " 分鐘";
          },
        },
        data: chartData.level3_times,
      },
    ],
  };


  return (
    <div className="overlay row" onClick={handleCancel}>
      <div
        className="content flex flex-col items-center  w-3/4 rounded-xl relative p-5 bg-modalcolor"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="sticky top-0 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={handleCancel}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        <div className="flex flex-col modal bg-white rounded mb-4">
          <p className="h-1/6 text-textcolor text-left mb-4 p-4 font-black">
            第一關
          </p>
          <div className="h-5/6">
            <ReactEcharts option={level1}></ReactEcharts>
          </div>
        </div>
        <div className="flex flex-col modal bg-white rounded mb-4">
          <p className="h-1/6 text-textcolor text-left mb-4 p-4 font-black">
            第二關
          </p>
          <div className="h-5/6">
            <ReactEcharts option={level2}></ReactEcharts>
          </div>
        </div>
        <div className="flex flex-col modal bg-white rounded mb-4">
          <p className="h-1/6 text-textcolor text-left mb-4 p-4 font-black">
            第三關
          </p>
          <div className="h-5/6">
            <ReactEcharts option={level3}></ReactEcharts>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
