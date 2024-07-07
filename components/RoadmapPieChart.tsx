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
    '#FF6384', '#36A2EB', '#FF0000','#FFCE56', 
    '#4BC0C0','#FF9F40',  '#9966FF',
    '#FF6384', '#36A2EB', '#FF0000','#FFCE56', 
    '#4BC0C0','#FF9F40',  '#9966FF',
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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '20px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: slicedColors[index],
                marginRight: '8px'
              }}
            ></div>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      <div style={{ width: '250px', height: '250px' }}>
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
