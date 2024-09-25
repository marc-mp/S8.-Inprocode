import { useContext } from 'react'
import { Bar } from 'react-chartjs-2'
import { DataContext } from '../context/DataContext'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js'
import TodayExpenses from "../components/TodayExpenses"
import { useTranslation } from "react-i18next"


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const WeeklyExpensesChart = () => {
  
  const { gastos, semanaActual } = useContext(DataContext)
  const { t } = useTranslation()

  const weeklyData = gastos.filter(gasto => gasto.numSemana === semanaActual)
  const labels = weeklyData.map(gasto => t(`days.${gasto.diaSemana}`))
  const data = weeklyData.map(gasto => gasto.cantidad)
  const lastIndex = data.length - 1

  const backgroundBarChart = data.map((_, index) => 
     index === lastIndex && semanaActual === gastos[gastos.length-1].numSemana ? 'rgb(59, 130, 246)' : 'rgb(248, 113, 113)'
  )

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Gastos día',
        data,
        backgroundColor: backgroundBarChart,
        borderColor: backgroundBarChart,
        borderWidth: 1,
        borderRadius: 6,
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} €`
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            family: "sans-serif",
          },
        },
      },
      y: {
        title: {
          display: false,
        },
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            family: "sans-serif",
          },
        },
      },
    },
  }

  return (
    <div className='flex flex-col justify-center bg-white w-full sm:w-2/3 lg:w-1/2 border-2 my-5 mx-auto p-5 rounded-3xl shadow-xl'>
      <h2 className='text-2xl sm:text-3xl font-bold text-center mb-5'>{t("weekly_expenses_title")}</h2>
      {weeklyData.length > 0 ? (
        <div className='w-full'>
          <Bar data={chartData} options={options} className='mx-auto w-full' />
        </div>
      ) : (
        <p className="text-center">{t("no_data")}</p>
      )}
      <div className='mt-3'>
        <TodayExpenses />
      </div>
    </div>
  )
}

export default WeeklyExpensesChart
