// components/InterestsBarGraph.tsx

"use client";

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getInterestsData } from '../utils/getInterestsData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InterestsBarGraph: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const interestsData = await getInterestsData();
      const labels = Object.keys(interestsData);
      const data = Object.values(interestsData);

      setChartData({
        labels,
        datasets: [
          {
            label: '% of Selection',
            data,
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
    };

    fetchData();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div style={{ width: '1000px', height: '400px', margin: 'auto' }}>
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
        width={800}
        height={600}
      />
    </div>
  );
};

export default InterestsBarGraph;
