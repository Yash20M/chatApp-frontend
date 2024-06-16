import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  Tooltip,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Legend,
} from "chart.js";
import { purple, purpleLight } from "../../constants/color";
import { getLast7Days } from "../../lib/Features";

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

Chartjs.register(
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Legend
);

const LineChart = ({ valueArray = [] }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: valueArray,
        label: "Message",
        fill: true,
        backgroundColor: purpleLight,
        borderColor: purple,
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartsOptions = {
  responsive: true,
  pulgins: {
    legend: false,
  },
  cutout: 110,
};

const DoughnutChart = ({ valueArray = [], labels = [] }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: valueArray,
        backgroundColor: [purpleLight, "rgba(220,97,122,0.6)"],
        hoverBackgroundColor: [purple, "crimson"],
        borderColor: [purple, "crimson"],
        offset: 25,
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      options={doughnutChartsOptions}
      style={{ zIndex: 10 }}
    />
  );
};

export { LineChart, DoughnutChart };
