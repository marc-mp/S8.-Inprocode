import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TotalBalance from '../components/TotalBalance';
import { DataContext } from '../Context/DataContext';
import { describe, it, expect, beforeEach } from 'vitest';

// Configuración inicial para el contexto de prueba
const mockGastos = [
  { numSemana: 1, dia: 1, diaSemana: 'lunes', cantidad: 125.34 },
  { numSemana: 1, dia: 2, diaSemana: 'martes', cantidad: 234.56 },
  { numSemana: 2, dia: 8, diaSemana: 'lunes', cantidad: 456.40 },
  { numSemana: 2, dia: 9, diaSemana: 'martes', cantidad: 344.00 },
];

const renderWithContext = (semanaActual, setSemanaActual) => {
  return render(
    <DataContext.Provider value={{ gastos: mockGastos, semanaActual, setSemanaActual }}>
      <TotalBalance />
    </DataContext.Provider>
  );
};

describe('TotalBalance Component', () => {
  let setSemanaActual;

  beforeEach(() => {
    setSemanaActual = vi.fn(); // Mock para cambiar la semana
  });

  it('debe calcular y mostrar el balance total de la semana actual', () => {
    renderWithContext(1, setSemanaActual);

    // Espera que el balance total sea la suma de la semana 1 (125.34 + 234.56)
    expect(screen.getByText('359.90 €')).toBeInTheDocument();
  });

  it('debe mostrar el botón "Next" si hay una semana siguiente', () => {
    renderWithContext(1, setSemanaActual);

    // Espera que el botón "Next" esté presente
    const nextButton = screen.getByLabelText('Next');
    expect(nextButton).toBeInTheDocument();
  });

  it('debe ocultar el botón "Prev" si es la primera semana', () => {
    renderWithContext(1, setSemanaActual);

    // Espera que el botón "Prev" no esté presente
    const prevButton = screen.queryByLabelText('Prev');
    expect(prevButton).not.toBeInTheDocument();
  });

  it('debe ocultar el botón "Next" si es la última semana', () => {
    renderWithContext(2, setSemanaActual);

    // Espera que el botón "Next" no esté presente
    const nextButton = screen.queryByLabelText('Next');
    expect(nextButton).not.toBeInTheDocument();
  });

  it('debe cambiar a la semana siguiente al hacer clic en "Next"', () => {
    renderWithContext(1, setSemanaActual);

    // Hacer clic en el botón "Next"
    const nextButton = screen.getByLabelText('Next');
    fireEvent.click(nextButton);

    // Espera que la función mock de cambiar semana sea llamada con 2
    expect(setSemanaActual).toHaveBeenCalledWith(2);
  });

  it('debe cambiar a la semana anterior al hacer clic en "Prev"', () => {
    renderWithContext(2, setSemanaActual);

    // Hacer clic en el botón "Prev"
    const prevButton = screen.getByLabelText('Prev');
    fireEvent.click(prevButton);

    // Espera que la función mock de cambiar semana sea llamada con 1
    expect(setSemanaActual).toHaveBeenCalledWith(1);
  });
});

