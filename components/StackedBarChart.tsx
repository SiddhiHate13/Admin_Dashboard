"use client";
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const StackedBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/roadmap.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debug: Log fetched data to console
        if (Array.isArray(data.roadmaps)) {
          formatChartData(data.roadmaps);
        } else {
          console.error('Data.roadmaps is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching or formatting data:', error);
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
        if (stats && typeof stats === 'object') {
          datasets.reading.push(stats.reading?.completed_units || 0);
          datasets.video.push(stats.video?.completed_units || 0);
          datasets.quiz.push(stats.quiz?.completed_units || 0);
        } else {
          console.error('Invalid roadmap statistics format:', stats);
        }
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
        position: 'right',
        labels: {
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.datasets.length) {
              return data.datasets.map((dataset, i) => ({
                text: `${dataset.label} (units)`,
                fillStyle: dataset.backgroundColor,
              }));
            }
            return [];
          },
        },
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
    <div style={{ width: '2000px', height: '420px', marginTop: '10px', marginLeft: '20px' }}>
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default StackedBarChart;
