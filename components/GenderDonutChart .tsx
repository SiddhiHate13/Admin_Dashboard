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
    // Register necessary components before creating chart instance
    Chart.register(...registerables, DoughnutController);

    const chartData = {
      labels: data.map(d => d.label),
      datasets: [
        {
          label: 'Gender Distribution',
          data: data.map(d => d.value),
          backgroundColor: data.map(d => {
            if (d.label === 'male') return '#3498db'; // Blue
            if (d.label === 'female') return '#e91e63'; // Pink
            return '#f39c12'; // Yellow for others
          }),
        },
      ],
    };

    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create new chart instance
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'doughnut',
        data: chartData,
        options: {
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    }

    // Cleanup function to destroy chart on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default GenderDonutChart;
