import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const CalorieChart = ({ consumedRecipesStatistics }) => {
  //const daysOfWeek = Object.keys({"22.01.":35, "23.01.": 45, "24.01.": 60, "25.01.": 43, "26.01.": 55, "27.01.": 20, "28.01.": 100});
  //const caloriesConsumed = Object.values({"22.01.":35, "23.01.": 45, "24.01.": 60, "25.01.": 43, "26.01.": 55, "27.01.": 20, "28.01.": 100});
  const [daysOfWeek, setDaysOfWeek] = useState(null);
  const [caloriesConsumed, setCaloriesConsumated] = useState(null);

  console.log(daysOfWeek);
  console.log(caloriesConsumed);
  useEffect(() => {
    const daysOfWeek = Object.keys(consumedRecipesStatistics);
    const caloriesConsumed = Object.values(consumedRecipesStatistics);
    setCaloriesConsumated(caloriesConsumed);
    setDaysOfWeek(daysOfWeek);
  }, [consumedRecipesStatistics]);

  return (
    <div>
      <Bar
        data={{
          labels: daysOfWeek,
          datasets: [
            {
              label: 'Potrošene kalorije',
              data: caloriesConsumed,
              backgroundColor: 'rgba(75,192,192,0.6)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ],
        }}
        style={{ height: '400px', width: '400px' }}
        options={{
          scales: {
            x: {
              barThickness: 50,
              grid: {
                color: 'rgba(0, 0, 0, 0)',
              },
              ticks: {
                font: {
                  size: 15,
                },
                autoSkip: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0)',
              },
              ticks: {
                font: {
                  size: 15,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              font: {
                size: 15,
              },
            },
            title: {
              display: true,
              text: 'Potrošene kalorije u zadnjih 7 dana',
              font: {
                size: 25,
              },
            },
          },
        }}
      />

    </div>
  );
};

export default CalorieChart;