import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const CalorieChart = ({ consumedRecipesStatistics }) => {
  const [chartData, setChartData] = useState({});
  const [haveData, setHaveData] = useState(false);

  useEffect(() => {
    const daysOfWeek = Object.keys(consumedRecipesStatistics);
    const caloriesConsumed = Object.values(consumedRecipesStatistics);

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
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
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
        <Line
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
