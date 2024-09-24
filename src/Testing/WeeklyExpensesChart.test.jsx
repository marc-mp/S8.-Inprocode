import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeeklyExpensesChart from '../components/WeeklyExpensesChart';
import { DataContext } from '../Context/DataContext';
import { describe, it, expect, beforeAll } from 'vitest';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';


global.ResizeObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Inicializa i18next para pruebas
beforeAll(() => {
  i18n
    .use(initReactI18next)
    .init({
      lng: 'es', 
      resources: {
        es: {
          translation: {
            "no_data": "No hay datos para mostrar esta semana.",
            "weekly_expenses_title": "Gastos Semanales",
            "days": {
              "lunes": "Lunes",
              "martes": "Martes",
              // Añade otros días según sea necesario
            },
          },
        },
      },
      fallbackLng: 'es',
      interpolation: {
        escapeValue: false, 
      },
    });
});

const renderWithContext = (gastos, semanaActual) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <DataContext.Provider value={{ gastos, semanaActual }}>
        <WeeklyExpensesChart />
      </DataContext.Provider>
    </I18nextProvider>
  );
};

describe('WeeklyExpensesChart Component', () => {
  it('muestra un mensaje cuando no hay datos para la semana actual', () => {
    const mockGastos = [];
    renderWithContext(mockGastos, 1);

    expect(screen.getByText('No hay datos para mostrar esta semana.')).toBeInTheDocument();
  });

  it('muestra el gráfico cuando hay datos disponibles', () => {
    const mockGastos = [
      { numSemana: 1, dia: 1, diaSemana: 'lunes', cantidad: 100 },
      { numSemana: 1, dia: 2, diaSemana: 'martes', cantidad: 150 },
    ];
    renderWithContext(mockGastos, 1);

    expect(screen.getByText('Gastos Semanales')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument(); // Verifica que el gráfico esté presente
  });

  it('no muestra el gráfico si no pertenece a la semana actual', () => {
    const mockGastos = [
      { numSemana: 2, dia: 1, diaSemana: 'lunes', cantidad: 200 },
    ];
    renderWithContext(mockGastos, 1);

    expect(screen.getByText('No hay datos para mostrar esta semana.')).toBeInTheDocument();
  });
});
