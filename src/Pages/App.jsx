import TotalBalance from "../components/TotalBalance"
import WeeklyExpensesChart from "../components/WeeklyExpensesChart"
import LanguageSelector from "../components/LanguageSelector"


function App() {

  return (
    <>

      <LanguageSelector />
      <TotalBalance />
      <WeeklyExpensesChart />

    </>
  )
}

export default App
