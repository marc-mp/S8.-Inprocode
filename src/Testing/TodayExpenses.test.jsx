import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodayExpenses from '../components/TodayExpenses';
import { DataContext } from '../Context/DataContext';
import { describe, it, expect } from 'vitest';

// Función de ayuda para renderizar el componente con el contexto adecuado
const renderWithContext = (gastos, gastosDiaActual) => {
  return render(
    <DataContext.Provider value={{ gastos, gastosDiaActual }}>
      <TodayExpenses />
    </DataContext.Provider>
  );
};

describe('TodayExpenses Component', () => {
  it('muestra las despesas actuales correctamente', () => {
    const mockGastos = [
      { numSemana: 1, dia: 1, diaSemana: 'lunes', cantidad: 100 },
      { numSemana: 1, dia: 2, diaSemana: 'martes', cantidad: 150 },
    ];
    renderWithContext(mockGastos, 150);

    // Cambiar "Despeses avui" por la clave de traducción "expenses_today"
    expect(screen.getByText('expenses_today')).toBeInTheDocument();
    expect(screen.getByText('150 €')).toBeInTheDocument();
  });

  it('calcula la variación respecto a ayer', () => {
    const mockGastos = [
      { numSemana: 1, dia: 1, diaSemana: 'lunes', cantidad: 100 },
      { numSemana: 1, dia: 2, diaSemana: 'martes', cantidad: 150 },
    ];
    renderWithContext(mockGastos, 200);

    expect(screen.getByText((content, element) =>
      element.tagName.toLowerCase() === 'p' && content.includes('+') && content.includes('%')
    )).toBeInTheDocument();
  });

  it('muestra 0% si no hay gastos de ayer', () => {
    const mockGastos = [{ numSemana: 1, dia: 1, diaSemana: 'lunes', cantidad: 200 }];
    renderWithContext(mockGastos, 150);

    expect(screen.getByText('0.00%')).toBeInTheDocument();
  });

  it('maneja el caso de solo un día de gastos', () => {
    const mockGastos = [{ numSemana: 1, dia: 1, diaSemana: 'lunes', cantidad: 150 }];
    renderWithContext(mockGastos, 150);

    expect(screen.getByText('0.00%')).toBeInTheDocument();
  });

  it('muestra una variación negativa si los gastos disminuyen', () => {
    const mockGastos = [
      { numSemana: 1, dia: 1, diaSemana: 'lunes', cantidad: 200 },
      { numSemana: 1, dia: 2, diaSemana: 'martes', cantidad: 150 },
    ];
    renderWithContext(mockGastos, 100);

    expect(screen.getByText((content, element) =>
      element.tagName.toLowerCase() === 'p' && content.includes('-') && content.includes('%')
    )).toBeInTheDocument();
  })
})
