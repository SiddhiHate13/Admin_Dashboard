// components/AgeChart.tsx

import { Line } from 'react-chartjs-2';

interface AgeChartProps {
    ageGroups: { below18: number; between18And30: number; above30: number };
}

const AgeChart: React.FC<AgeChartProps> = ({ ageGroups }) => {
    const chartData = {
        labels: ['Below 18', '18-30', 'Above 30'],
        datasets: [
            {
                label: 'Users by Age Group',
                data: [ageGroups.below18, ageGroups.between18And30, ageGroups.above30],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div >
            <Line data={chartData} />
        </div>
    );
};

export default AgeChart;
