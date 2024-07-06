import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Importing 'chart.js/auto' ensures Chart.js is imported properly for module systems

interface EdCoinsPieChartProps {
  interestData: {
    interest: string;
    edcoinsData: { level: string; edcoins: number }[];
  };
}

const EdCoinsPieChart: React.FC<EdCoinsPieChartProps> = ({ interestData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current || !interestData) return;

    const { interest, edcoinsData } = interestData;

    const labels = edcoinsData.map(item => item.level);
    const data = edcoinsData.map(item => item.edcoins);
    const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#9575CD'];

    const ctx = chartRef.current.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: `EdCoins Earned by ${interest}`,
            data: data,
            backgroundColor: backgroundColors,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
              }
            }
          }
        }
      });
    }
  }, [interestData]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default EdCoinsPieChart;
