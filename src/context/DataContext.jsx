import { createContext, useState } from "react"

export const DataContext = createContext()

export default function DataContextProvider({ children }) {

  const [gastos, Setgastos] = useState([
    { numSemana: 1, dia: 1, diaSemana: 'lunes', cantidad: 125.34 },
    { numSemana: 1, dia: 2, diaSemana: 'martes', cantidad: 234.56 },
    { numSemana: 1, dia: 3, diaSemana: 'miercoles', cantidad: 456.65 },
    { numSemana: 1, dia: 4, diaSemana: 'jueves', cantidad: 345.98},
    { numSemana: 1, dia: 5, diaSemana: 'viernes', cantidad:578.65 },
    { numSemana: 1, dia: 6, diaSemana: 'sabado', cantidad: 634.50 },
    { numSemana: 1, dia: 7, diaSemana: 'domingo', cantidad: 159.25 },
    { numSemana: 2, dia: 8, diaSemana: 'lunes', cantidad: 456.40 },
    { numSemana: 2, dia: 9, diaSemana: 'martes', cantidad: 344.00 },
    { numSemana: 2, dia: 10, diaSemana: 'miercoles', cantidad: 676.10 },
    { numSemana: 2, dia: 11, diaSemana: 'jueves', cantidad: 565.15 },
    { numSemana: 2, dia: 12, diaSemana: 'viernes', cantidad:478.75 },
    { numSemana: 2, dia: 13, diaSemana: 'sabado', cantidad: 734.80 },
    { numSemana: 2, dia: 14, diaSemana: 'domingo', cantidad: 259.45 },
    { numSemana: 3, dia: 15, diaSemana: 'lunes', cantidad: 345.25 },
    { numSemana: 3, dia: 16, diaSemana: 'martes', cantidad: 234.50 },
    { numSemana: 3, dia: 17, diaSemana: 'miercoles', cantidad: 123.65 },
    { numSemana: 3, dia: 18, diaSemana: 'jueves', cantidad: 246.00 },
    { numSemana: 3, dia: 19, diaSemana: 'viernes', cantidad: 456.45 },
    { numSemana: 3, dia: 20, diaSemana: 'sabado', cantidad: 345.56 },
  ])
  
  const [semanaActual, setSemanaActual] = useState(gastos[gastos.length-1].numSemana)
  const [gastosDiaActual, setGastosDiaActual] = useState(gastos[gastos.length-1].cantidad)



    return (
        <DataContext.Provider value={{ 
          gastos, Setgastos,
          semanaActual, setSemanaActual,
          gastosDiaActual, setGastosDiaActual,

        }}>
          {children}
        </DataContext.Provider>
      )
}