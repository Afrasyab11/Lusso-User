import { Line } from 'react-chartjs-2'

const LineChart = ({ data }: any) => {

    const label: any = data.map((element: any) => element.label)
    const count: any = data.map((element: any) => element.count)

    return (
        <Line
            data={{
                labels: label,
                datasets: [
                    {
                        data: count,
                        borderColor: "#B6A5F4",
                        borderWidth: 1,
                        tension: .3,
                    }
                ]
            }}
            options={{
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }}
        />
    )
}

export default LineChart