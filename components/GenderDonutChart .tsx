"use client"; // This marks the file as a client component


import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { DoughnutController } from 'chart.js';

interface GenderDonutChartProps {
  data: { label: string; value: number }[];
}

const GenderDonutChart: React.FC<GenderDonutChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    Chart.register(...registerables, DoughnutController);

    const chartData = {
      labels: data.map(d => d.label),
      datasets: [
        {
          label: 'Gender Distribution',
          data: data.map(d => d.value),
          backgroundColor: data.map(d => {
            if (d.label === 'male') return '#00b4d8';
            if (d.label === 'female') return '#ff928b';
            if (d.label === 'others') return '#ffd639';
            return '#ccc'; // Fallback color
          }),
        },
      ],
    };

    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'doughnut',
        data: chartData,
        options: {
          plugins: {
            legend: {
              position: 'top',
            },
          },
          aspectRatio: 1, // Aspect ratio of 1 makes the chart circular
          responsive: true,
          maintainAspectRatio: false, // Allows the chart to adjust to its container size
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="flex w-full">
      <div className="flex-1 flex flex-col items-start mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <span
              className="inline-block w-3 h-3 mr-2"
              style={{
                backgroundColor:
                  item.label === 'male'
                    ? '#00b4d8'
                    : item.label === 'female'
                    ? '#ff928b'
                    : item.label === 'others'
                    ? '#ffd639'
                    : '#ccc', // Fallback color
                borderRadius: '50%',
              }}
            ></span>
            <span className="text-sm font-semibold text-gray-700">{item.label}</span>
            <span className="ml-2 text-xs text-gray-500">
              {((item.value / data.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      <div className="flex-1">
        <canvas ref={chartRef} style={{ height: '400px', width: '400px' }} />
      </div>
    </div>
  );
};

export default GenderDonutChart;
