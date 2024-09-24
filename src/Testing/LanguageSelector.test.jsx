import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LanguageSelector from '../components/LanguageSelector'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'

describe('LanguageSelector Component', () => {
  // Mock de i18n para evitar cambiar el idioma real durante los tests
  const mockChangeLanguage = vi.spyOn(i18n, 'changeLanguage');

  // Antes de cada test, limpiamos los mocks
  beforeEach(() => {
    localStorage.clear();
    mockChangeLanguage.mockClear();
  });

  it('should render the language flags correctly', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );

    // Verificar que se renderizan las imágenes de las banderas
    const spanishFlag = screen.getByAltText('es');
    const englishFlag = screen.getByAltText('en');
    const catalanFlag = screen.getByAltText('ca');

    expect(spanishFlag).toBeInTheDocument();
    expect(englishFlag).toBeInTheDocument();
    expect(catalanFlag).toBeInTheDocument();
  });

  it('should change language on flag click', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );

    // Simular click en la bandera de inglés
    const englishFlag = screen.getByAltText('en');
    fireEvent.click(englishFlag);

    // Verificar que se llamó a changeLanguage con 'en'
    expect(mockChangeLanguage).toHaveBeenCalledWith('en');

    // Verificar que el idioma se guardó en localStorage
    expect(localStorage.getItem('i18nextLng')).toBe('en');
  });

  it('should apply border when the current language is selected', () => {
    // Simulamos que el idioma actual es 'es'
    i18n.changeLanguage('es');

    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );

    const spanishFlag = screen.getByAltText('es');

    // Verificar que la bandera española tiene la clase 'border'
    expect(spanishFlag).toHaveClass('border border-black border-opacity-50');
  })
})

