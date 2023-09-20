import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({ todo, ongoing, completed }) {
  return (
    <Doughnut
      data={{
        datasets: [
          {
            label: `${["todo", "ongoing", "completed"].map((task) => task)}`,
            data: [todo, ongoing, completed],
            backgroundColor: ["#3D5AF1", "#FE6B0F", " #12B76A"],
            borderColor: ["#ddd", "#ddd", "#ddd"],
            borderWidth: 0,
          },
        ],
      }}
    />
  );
}
