import { Doughnut } from 'react-chartjs-2'

const DoughnutChart = ({ data }: any) => {

    const label: any = data.map((element: any) => element.device)
    const count: any = data.map((element: any) => element.count)

    return (
        <Doughnut
            data={{
                labels: label,
                datasets: [
                    {
                        data: count,
                        borderColor: "#B6A5F4",
                        borderWidth: 1,
                        backgroundColor: ["#4527ab", "#ffffff", "#b6a5f4"]
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

export default DoughnutChart