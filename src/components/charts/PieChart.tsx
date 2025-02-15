import { Pie } from 'react-chartjs-2'

const PieChart = ({ data }: any) => {

    const label: any = data.map((element: any) => element.gender)
    const count: any = data.map((element: any) => element.count)

    return (
        <Pie
            data={{
                labels: label,
                datasets: [
                    {
                        data: count,
                        borderColor: "#B6A5F4",
                        borderWidth: 1,
                        backgroundColor: ["#4527ab", "#b5a4f3"]
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

export default PieChart