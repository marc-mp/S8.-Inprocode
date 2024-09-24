import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: 'jsdom',
    // setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    setupFiles: './src/setupTests.js',
    // css: true,
  },
})



