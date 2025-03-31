import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './context/ThemeContext';

const AppContent = () => {
  const { colors } = useTheme();

  return (
    <div style={{
      backgroundColor: colors.background,
      color: colors.text,
      minHeight: '100vh',
      padding: '20px',
      transition: 'background-color 0.3s, color 0.3s',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <h1>Theme Switcher App</h1>
        <p>This app demonstrates the use of React Context API for state management.</p>
        <ThemeToggle />
        <div style={{
          marginTop: '20px',
          padding: '20px',
          border: `2px solid ${colors.primary}`,
          borderRadius: '8px',
        }}>
          <h2>Content Section</h2>
          <p>This section's border color changes with the theme to demonstrate the dynamic styling.</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
