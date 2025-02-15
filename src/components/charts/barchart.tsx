import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
  // Set the height of the chart
  maintainAspectRatio: false,
  aspectRatio: 2, // Adjust the aspect ratio as needed
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1000, 100, 200, 400],
      barThickness: 20,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    // {
    //   label: 'Dataset 2',
    //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} />;
}

export default BarChart;
