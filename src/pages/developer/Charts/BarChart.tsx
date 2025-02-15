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

const BarChart = () => {
    const data = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [40, 60, 80, 20, 50, 90, 30],
                backgroundColor: '#000',
                barThickness: 30,
            },
            {
                label: 'Dataset 2',
                data: [50, 70, 60, 30, 60, 100, 40],
                backgroundColor: '#007bff',
                barThickness: 30,
            },
            {
                label: 'Dataset 3',
                data: [70, 90, 50, 40, 70, 110, 50],
                backgroundColor: '#fff',
                borderSkipped: false,
                borderRadius: {
                    topLeft: 50,
                    topRight: 50
                },
                barThickness: 30,
            },
        ],
        max: 350
    };

    const options: any = {
        responsive: true,
        scales: {
            x: {
                stacked: true,
                grid: {
                    color: '#444',
                },
                ticks: {
                    color: '#fff',
                },
            },
            y: {
                stacked: true,
                beginAtZero: true,
                grid: {
                    color: '#444',
                },
                ticks: {
                    color: '#fff',
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#fff',
                },
            },
            title: {
                display: false,
                text: 'Weekly Performance',
                color: '#fff',
                font: {
                    size: 18,
                },
            },
        },
    };

    return (
        <div className="p-4">
            <Bar data={data} options={options} height={150} />
        </div>
    );
};

export default BarChart;
