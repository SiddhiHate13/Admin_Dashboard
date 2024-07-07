"use client";
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components
Chart.register(ArcElement, Tooltip, Legend);

interface RoadmapData {
  title: string;
  totalMinutes: number;
}

const RoadmapPieChart: React.FC = () => {
  const [data, setData] = useState<RoadmapData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/roadmap.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        // Assuming jsonData is an array of roadmaps
        const dataArray: RoadmapData[] = jsonData.roadmaps.map((entry: any) => ({
          title: entry.entry.title,
          totalMinutes: entry.entry.modules_progress.reduce((sum: number, module: any) => {
            return sum + module.units_progress.reduce((unitSum: number, unit: any) => unitSum + unit.total_minutes, 0);
          }, 0)
        }));

        // Remove duplicates based on the title
        const uniqueDataArray = dataArray.filter((item, index, self) =>
          index === self.findIndex((t) => t.title === item.title)
        );

        console.log('Processed data:', uniqueDataArray);
        setData(uniqueDataArray);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  // Define an array of different colors
  const colors: string[] = [
    '#ffb1c1', '#4bc0c0', '#ed2d2d', '#ffce56',
    '#36a2eb', '#fa9332', '#d6c2ff',
    '#ffb1c1', '#4bc0c0', '#ed2d2d', '#ffce56',
    '#36a2eb', '#fa9332', '#d6c2ff',
  ];

  // Slice colors array to match data length (in case more colors are defined than needed)
  const slicedColors: string[] = colors.slice(0, data.length);

  const pieData = {
    labels: data.map(item => item.title),
    datasets: [
      {
        data: data.map(item => item.totalMinutes),
        backgroundColor: slicedColors,
        hoverBackgroundColor: slicedColors
      }
    ]
  };

  return (
    <div style={{ display: 'flex', alignItems: 'start' }}>
      <table style={{ marginRight: '40px', borderCollapse: 'collapse', marginLeft: '0', textAlign: 'left' }}>
        <thead style={{ textAlign: 'left' }}>
          <tr>
            <th style={{ padding: '8px', width: '300px', fontSize: '20px', color: '#333', fontWeight: 'bold' }}>Roadmaps</th>
            <th style={{ padding: '8px', fontSize: '20px', color: '#333', fontWeight: 'bold' }}>Total Minutes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: '8px', display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#333', fontSize: '18px' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: slicedColors[index],
                    marginRight: '8px'
                  }}
                ></div>
                {item.title}
              </td>
              <td style={{ padding: '8px', fontSize: '18px', color: '#666', fontWeight: 'bold', marginLeft: '30px' }}>{item.totalMinutes} mins</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ width: '340px', height: '340px', marginLeft: '-80px' }}>
        <Pie
          data={pieData}
          options={{
            plugins: {
              legend: {
                display: false // Hides the default legend
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default RoadmapPieChart;
