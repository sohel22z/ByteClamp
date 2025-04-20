import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ClampCalculator from './components/ClampCalculator';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
          <Header />

          <main className="flex-1 container mx-auto p-4">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CSS Clamp Calculator</h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A Responsive CSS Clamp() Generator
              </p>
            </div>

            <ClampCalculator />
          </main>

          <Footer />
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;