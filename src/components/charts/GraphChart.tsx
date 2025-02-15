import { Bar } from 'react-chartjs-2'

const GraphChart = ({ data }: any) => {

    const label: any = data.map((element: any) => element.label)
    const count: any = data.map((element: any) => element.count)

    return (
        <Bar
            data={{
                labels: label,
                datasets: [
                    {
                        data: count,
                        borderColor: "#B6A5F4",
                        borderWidth: 1,
                        backgroundColor: "#B6A5F4",
                        borderRadius: 6
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

export default GraphChart