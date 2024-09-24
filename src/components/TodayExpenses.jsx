import { useContext } from 'react'
import { DataContext } from '../Context/DataContext'
import { useTranslation } from "react-i18next"


const TodayExpenses = () => {
  const { gastos, gastosDiaActual } = useContext(DataContext)
  const { t } = useTranslation()

  if (!gastos || gastos.length === 0) {
    return <p>No hay gastos disponibles.</p>
  }

  const gastosDeAyer = (gastos.length >= 2) ? gastos[gastos.length - 2].cantidad : 0
  const variation = gastosDeAyer === 0 ? 0 : ((gastosDiaActual - gastosDeAyer) / gastosDeAyer) * 100

  return (
    <div className=' grid grid-cols-2  p-5 '>
        <div className=' grid justify-start'>
            <p className='text-xl font-bold text-neutral-400 mb-2'>{t("expenses_today")}</p>
            <p className='text-5xl font-bold '>{gastosDiaActual} €</p>

        </div>
        <div className=' grid justify-end text-right'>
            <p className={`text-xl font-bold mt-2  ${variation >= 0 ? 'text-zinc-800' : 'text-red-500'}`}>
                {variation > 0 && ('+') }
                {variation.toFixed(2)}%
            </p>
            <p className='text-xl font-bold text-zinc-800'>{t("compared_yesterday")}</p>
        </div>
    </div>
  )
}

export default TodayExpenses
