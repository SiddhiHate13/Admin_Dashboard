// chartjs-setup.ts
import { Chart, ArcElement, LineElement, PointElement, BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale, DoughnutController, LineController } from 'chart.js';

// Register the necessary components
Chart.register(
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  DoughnutController,
  LineController
);
