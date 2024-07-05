// components/InterestsBarGraph.tsx

"use client";

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getInterestsData } from '../utils/getInterestsData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InterestsBarGraph: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [interestsData, setInterestsData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInterestsData();
      const labels = Object.keys(data);
      const values = Object.values(data);

      setChartData({
        labels,
        datasets: [
          {
            label: '% of Selection',
            data: values,
            backgroundColor: [
              '#9bc2ff', // Blue for Coding
              '#d3e5ab', // Brown for Product
              '#f29d94', // Red for Design
              '#c7acd5', // Purple for Marketing
              '#9ce1cf', // Light Blue for Soft Skills
            ],
          },
        ],
      });

      setInterestsData(data);
    };

    fetchData();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div style={{ display: 'flex', width: '1500px', height: '400px', margin: 'auto', paddingTop: '50px' }}>
      <div style={{ flex: '1', paddingRight: '20px', textAlign: 'left', paddingTop: '20px', marginLeft: '40px' }}>
        <h3>Interests Overview</h3>
        <ul>
          {chartData.labels.map((label: string, index: number) => (
            <li key={label} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                  marginRight: '10px',
                }}
              ></span>
              <span>{label}: {Number(interestsData[label]).toFixed(2)}%</span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: '2' }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: '% of Selection',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Interests',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default InterestsBarGraph;
