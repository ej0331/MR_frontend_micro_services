import React from "react";
import ReactEcharts from "echarts-for-react";
import "./index.css";
import { ToMinutes, secondsToMinutes } from "../../utilities/timeFormater";

const findGCD = (n1, n2) => {
  if (!n1 && !n2) return;
  let a = n1;
  let b = n2;
  let counter = 0;

  while (b !== 0 && counter < 5) {
    const temp = b;
    b = a % b;
    a = temp;
    counter += 1;
  }

  return parseInt(a);
};
const Modal = ({ onClose, chartData }) => {
  const handleCancel = () => {
    onClose();
  };

  // leve1
  const level1rawData = [
    chartData.level1_correct_quantity_list || [],
    chartData.level1_incorrect_quantity_list || [],
  ];
  const level1totalData = [];
  for (let i = 0; i < level1rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < level1rawData.length; ++j) {
      sum += level1rawData[j][i];
    }
    level1totalData.push(sum);
  }

  const level1percentSeries = ["對", "錯"].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "percent",
      barWidth: "40%",
      label: {
        show: true,
        align: "center",
        verticalAlign: "middle",
        position: "inside",
        textStyle: {
          fontSize: "14",
          fontWeight: "bolder",
        },
        formatter: (params) => Math.round(params.value * 10) / 10 + "%",
      },
      tooltip: {
        valueFormatter: function (value) {
          return value + " %";
        },
      },
      itemStyle: {
        color: name === "對" ? "#01B468" : "#EA0000",
      },
      data: level1rawData[sid].map((d, did) =>
        level1totalData[did] <= 0 ? 0 : (d / level1totalData[did]) * 100
      ),
    };
  });

  const level1timeSeries = {
    name: "耗時",
    type: "line",
    lineStyle: {
      color: "#C3D0DB",
    },
    itemStyle: {
      color: "#C3D0DB",
    },
    tooltip: {
      valueFormatter: function (value) {
        return ToMinutes(value) + " 分鐘";
      },
    },
    yAxisIndex: 1,
    data: chartData.level1_time_list,
  };

  const level1 = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      selectedMode: false,
      textStyle: {
        fontSize: "13",
        fontWeight: "bolder",
      },
    },
    yAxis: [
      {
        type: "value",
        name: "百分比",
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: "{value} ",
        },
      },
      {
        type: "value",
        name: "分鐘",
        min: 0,
        max:
          chartData.level1_time_limit_list &&
          Math.ceil(Math.max(...chartData.level1_time_limit_list)),
        interval:
          chartData.level1_time_limit_list &&
          Math.ceil(Math.max(...chartData.level1_time_limit_list)) /
            findGCD(
              Math.max(...chartData.level1_total_quantity_list),
              Math.ceil(Math.max(...chartData.level1_time_limit_list)) * 60
            ),
        axisLabel: {
          formatter: function (value) {
            return ToMinutes(parseInt(value));
          },
        },
      },
    ],
    xAxis: {
      type: "category",
      data: chartData.level1_finished_at_list,
    },
    series: [...level1percentSeries, level1timeSeries],
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10,
      }
    ]
  };

  // leve2
  const level2rawData = [
    chartData.level2_correct_quantity_list || [],
    chartData.level2_incorrect_quantity_list || [],
  ];
  const level2totalData = [];
  for (let i = 0; i < level2rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < level2rawData.length; ++j) {
      sum += level2rawData[j][i];
    }
    level2totalData.push(sum);
  }

  const level2percentSeries = ["對", "錯"].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "percent",
      barWidth: "40%",
      label: {
        show: true,
        align: "center",
        verticalAlign: "middle",
        position: "inside",
        textStyle: {
          fontSize: "14",
          fontWeight: "bolder",
        },
        formatter: (params) => Math.round(params.value * 10) / 10 + "%",
      },
      tooltip: {
        valueFormatter: function (value) {
          return value + " %";
        },
      },
      itemStyle: {
        color: name === "對" ? "#01B468" : "#EA0000",
      },
      data: level2rawData[sid].map((d, did) =>
        level2totalData[did] <= 0 ? 0 : (d / level2totalData[did]) * 100
      ),
    };
  });

  const level2timeSeries = {
    name: "耗時",
    type: "line",
    lineStyle: {
      color: "#C3D0DB",
    },
    itemStyle: {
      color: "#C3D0DB",
    },
    tooltip: {
      valueFormatter: function (value) {
        return ToMinutes(value) + " 分鐘";
      },
    },
    yAxisIndex: 1,
    data: chartData.level2_time_list,
  };

  const level2 = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      selectedMode: false,
      textStyle: {
        fontSize: "13",
        fontWeight: "bolder",
      },
    },
    yAxis: [
      {
        type: "value",
        name: "百分比",
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: "{value} ",
        },
      },
      {
        type: "value",
        name: "分鐘",
        min: 0,
        max:
          chartData.level2_time_limit_list &&
          Math.ceil(Math.max(...chartData.level2_time_limit_list)),
        interval:
          chartData.level2_time_limit_list &&
          Math.ceil(Math.max(...chartData.level2_time_limit_list)) /
            findGCD(
              Math.max(...chartData.level2_total_quantity_list),
              Math.ceil(Math.max(...chartData.level2_time_limit_list)) * 60
            ),
        axisLabel: {
          formatter: function (value) {
            return ToMinutes(parseInt(value));
          },
        },
      },
    ],
    xAxis: {
      type: "category",
      data: chartData.level2_finished_at_list,
    },
    series: [...level2percentSeries, level2timeSeries],
  };
  // leve3
  const level3rawData = [
    chartData.level3_correct_quantity_list || [],
    chartData.level3_incorrect_quantity_list || [],
  ];
  const level3totalData = [];
  for (let i = 0; i < level3rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < level3rawData.length; ++j) {
      sum += level3rawData[j][i];
    }
    level3totalData.push(sum);
  }

  const level3percentSeries = ["對", "錯"].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "percent",
      barWidth: "40%",
      label: {
        show: true,
        align: "center",
        verticalAlign: "middle",
        position: "inside",
        textStyle: {
          fontSize: "14",
          fontWeight: "bolder",
        },
        formatter: (params) => Math.round(params.value * 10) / 10 + "%",
      },
      tooltip: {
        valueFormatter: function (value) {
          return value + " %";
        },
      },
      itemStyle: {
        color: name === "對" ? "#01B468" : "#EA0000",
      },
      data: level3rawData[sid].map((d, did) =>
        level3totalData[did] <= 0 ? 0 : (d / level3totalData[did]) * 100
      ),
    };
  });

  const level3timeSeries = {
    name: "耗時",
    type: "line",
    lineStyle: {
      color: "#C3D0DB",
    },
    itemStyle: {
      color: "#C3D0DB",
    },
    tooltip: {
      valueFormatter: function (value) {
        return  ToMinutes(value) + " 分鐘";
      },
    },
    yAxisIndex: 1,
    data: chartData.level3_time_list,
  };

  const level3 = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      selectedMode: false,
      textStyle: {
        fontSize: "13",
        fontWeight: "bolder",
      },
    },
    yAxis: [
      {
        type: "value",
        name: "百分比",
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: "{value} ",
        },
      },
      {
        type: "value",
        name: "分鐘",
        min: 0,
        max:
          chartData.level3_time_limit_list &&
          Math.ceil(Math.max(...chartData.level3_time_limit_list)),
        interval:
          chartData.level3_time_limit_list &&
          Math.ceil(Math.max(...chartData.level3_time_limit_list)) /
            findGCD(
              Math.max(...chartData.level3_total_quantity_list),
              Math.ceil(Math.max(...chartData.level3_time_limit_list)) * 60
            ),
        axisLabel: {
          formatter: function (value) {
            return ToMinutes(parseInt(value));
          },
        },
      },
    ],
    xAxis: {
      type: "category",
      data: chartData.level3_finished_at_list,
    },
    series: [...level3percentSeries, level3timeSeries],
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
