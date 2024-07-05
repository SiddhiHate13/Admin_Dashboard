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
      try {
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!chartData || !interestsData) return <p>Loading...</p>;

  return (
    <div style={{ display: 'flex', width: '100%', maxWidth: '1500px', height: '400px', margin: 'auto', paddingTop: '50px' }}>
      <div style={{ flex: '1', maxWidth: '400px', height: '100%', paddingRight: '20px', textAlign: 'left', paddingTop: '5px', marginLeft: '0px', marginRight: '10px', fontSize: '16px', borderRight: '2px solid #ccc' }}>
        <h2 style={{ marginBottom: '15px', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>Interests Overview</h2>
        <table style={{ width: '100%', borderSpacing: '0px' }}>
          <tbody>
            {chartData.labels.map((label: string, index: number) => (
              <tr key={label} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
                <td style={{ width: '30px', height: '30px', backgroundColor: chartData.datasets[0].backgroundColor[index], borderRadius: '50%', marginRight: '10px' }}></td>
                <td style={{ minWidth: '250px', fontSize: '20px', fontWeight: 'bold', color: '#333' }}>{label}</td>
                <td style={{ fontSize: '20px', fontWeight: 'bold', color: '#666' }}>{Number(interestsData[label]).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ flex: '2', marginLeft: '10px', marginRight:'20px', maxWidth: '1400px' }}>
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
