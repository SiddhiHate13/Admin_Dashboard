"use client"
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js';

// Register the necessary components
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

interface RoadmapData {
  title: string;
  totalOccurrences: number;
}

const PopularityChart = () => {
  const [data, setData] = useState<RoadmapData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/roadmap.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        // Count occurrences of each roadmap title
        const titleCounts: { [key: string]: number } = {};
        jsonData.roadmaps.forEach((entry: any) => {
          const title = entry.entry.title;
          titleCounts[title] = (titleCounts[title] || 0) + 1;
        });

        // Convert titleCounts object to an array of RoadmapData
        const dataArray = Object.keys(titleCounts).map(title => ({
          title: title,
          totalOccurrences: titleCounts[title]
        }));

        // Sort data by total occurrences in descending order
        const sortedData = dataArray.sort((a, b) => b.totalOccurrences - a.totalOccurrences);

        setData(sortedData);
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

  const barData = {
    labels: data.map(item => item.title),
    datasets: [
      {
        label: 'Total Occurrences',
        data: data.map(item => item.totalOccurrences),
        backgroundColor: '#36A2EB'
      }
    ]
  };

  return (
    <div style={{ width: '650px', height: '250px', marginTop: '10'}}>
     <Bar data={barData} />
    </div>
  );
};

export default PopularityChart;
