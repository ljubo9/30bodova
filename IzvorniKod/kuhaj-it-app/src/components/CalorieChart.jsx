import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const CalorieChart = ({ consumedRecipesStatistics }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const daysOfWeek = Object.keys(consumedRecipesStatistics);
    const caloriesConsumed = Object.values(consumedRecipesStatistics);

    setChartData({
      labels: daysOfWeek,
      datasets: [
        {
          label: 'Potrošene kalorije',
          data: caloriesConsumed,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2,
        },
      ],
    });
  }, [consumedRecipesStatistics]);

  return (
    <div>
      <h2>Graf potrošenih kalorija u zadnjih 7 dana</h2>
      <Line
        data={chartData}
        options={{
          scales: {
            x: {
              type: 'category',
              labels: chartData.labels,
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default CalorieChart;
