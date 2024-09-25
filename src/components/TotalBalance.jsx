import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { useTranslation } from "react-i18next"


export default function TotalBalance() {
  const { gastos, semanaActual, setSemanaActual } = useContext(DataContext)
  const { t } = useTranslation()

  const gastosSemanaSeleccionada = gastos.filter(gasto => gasto.numSemana === semanaActual)
  const totalGastosSemana = gastosSemanaSeleccionada.reduce((acc, gasto) => acc + gasto.cantidad, 0)

  const handlePrevWeek = () => {
    if (semanaActual > 1) {
      setSemanaActual(semanaActual - 1)
    }
  }

  const handleNextWeek = () => {
    if (semanaActual < gastos[gastos.length - 1].numSemana) {
      setSemanaActual(semanaActual + 1)
    }
  }

  return (
    <div className="grid grid-cols-2 w-full sm:w-2/3 lg:w-1/2  bg-red-400 mt-5 mx-auto p-5 rounded-3xl shadow-xl">
      <div>
        <h2 className="text-md sm:text-lg font-semibold text-white mb-2">{t('balance_total')}</h2>
        <p className="text-3xl font-bold text-white">{totalGastosSemana.toFixed(2)} €</p>
      </div>
      <div className="flex justify-end">
        {semanaActual > 1 && (
          <button 
            aria-label="Prev" 
            className="text-white text-4xl sm:text-5xl me-5"
            onClick={handlePrevWeek}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 sm:w-12 sm:h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12l7.5-7.5M3 12h18" />
            </svg>
          </button>
        )}
        {gastos.some(gasto => gasto.numSemana > semanaActual) && (
          <button 
            aria-label="Next" 
            className="text-white me-5"
            onClick={handleNextWeek}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 sm:w-12 sm:h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
