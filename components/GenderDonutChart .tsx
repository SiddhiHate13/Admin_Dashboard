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
  <div className="flex-1 flex flex-col items-start mt-2 ml-16">
  <h1 className='text-3xl text-gray-900 font-bold pb-16 mt-1tr'>Gender Distribution</h1> {/* Added heading */}

    <table className="table-auto">
      
      <thead>
        
        <tr>
          <th className="px-4 py-2 text-xl mr-3">Gender</th>
          <th className="px-4 py-2 text-xl mr-7">Percentage</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="flex items-center px-4 py-2">
              <span
                className="inline-block w-7 h-7 mr-7 mt-2"
                style={{
                  backgroundColor:
                    item.label === 'male'
                      ? '#00b4d8'
                      : item.label === 'female'
                      ? '#ff928b'
                      : item.label === 'others'
                      ? '#ffcc66'
                      : '#ccc', // Fallback color
                  borderRadius: '50%',
                }}
              ></span>
              <span className="text-xl font-semibold text-gray-700">{item.label}</span>
            </td>
            <td className="px-4 py-2 text-xl text-gray-500 font-bold">
              {((item.value / data.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(2)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="flex-1">
    <canvas ref={chartRef} style={{ height: '400px', width: '400px', marginLeft: '5px' }} /> {/* Reduced margin-left */}
  </div>
</div>
  )
};

export default GenderDonutChart;
