"use client"
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const StackedBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/roadmap.json');
        const data = await response.json();
        console.log('Fetched data:', data); // Debug: Log fetched data to console
        if (Array.isArray(data.roadmaps)) {
          formatChartData(data.roadmaps);
        } else {
          console.error('Data.roadmaps is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatChartData = (roadmaps: any[]) => {
    try {
      const datasets = {
        reading: [],
        video: [],
        quiz: [],
      };

      roadmaps.forEach((roadmap) => {
        const stats = roadmap.entry.roadmap_statistics;
        datasets.reading.push(stats.reading.completed_units);
        datasets.video.push(stats.video.completed_units);
        datasets.quiz.push(stats.quiz.completed_units);
      });

      const labels = roadmaps.map((roadmap) => roadmap.entry.title);

      const formattedData = {
        labels: labels,
        datasets: [
          {
            label: 'Reading',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            data: datasets.reading,
          },
          {
            label: 'Video',
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            data: datasets.video,
          },
          {
            label: 'Quiz',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            data: datasets.quiz,
          },
        ],
      };

      setChartData(formattedData);
    } catch (error) {
      console.error('Error formatting chart data:', error);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '1000px', height: '350px', marginTop: '10'}}>
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default StackedBarChart;
