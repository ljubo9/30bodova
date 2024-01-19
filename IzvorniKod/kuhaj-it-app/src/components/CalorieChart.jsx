import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const CalorieChart = ({ consumedRecipesStatistics }) => {
  const [chartData, setChartData] = useState({});
  const [haveData, setHaveData] = useState(false);

  useEffect(() => {
    //const daysOfWeek = Object.keys(consumedRecipesStatistics);
    //const caloriesConsumed = Object.values(consumedRecipesStatistics);
    const daysOfWeek = Object.keys({"22.01.":35, "23.01.": 45, "24.01.": 60, "25.01.": 43, "26.01.": 55, "27.01.": 20, "28.01.": 100});
    const caloriesConsumed = Object.values({"22.01.":35, "23.01.": 45, "24.01.": 60, "25.01.": 43, "26.01.": 55, "27.01.": 20, "28.01.": 100});

    const fetchData = async () => {
      try {
        const res = await fetch('/data');
        const data = await res.json();
        setChartData({
          labels: daysOfWeek,
          datasets: [
            {
              label: 'Potrošene kalorije',
              data: caloriesConsumed,
              backgroundColor: 'rgba(75,192,192,0.2)', // Bar color
              borderColor: 'rgba(75,192,192,1)', // Border color
              borderWidth: 2,
            },
          ],
        });
        setHaveData(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setHaveData(false);
      }
    };
    fetchData();
  }, [consumedRecipesStatistics]);

  return (
    <div>
      <h2>Graf potrošenih kalorija u zadnjih 7 dana</h2>
      {haveData ? (
        <Bar
          data={chartData}
          options={{
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
                title: {
                  display: true,
                  text: 'Days of the Week',
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p>Error loading data</p>
      )}
    </div>
  );
};

export default CalorieChart;
