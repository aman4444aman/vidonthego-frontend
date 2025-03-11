import React from 'react';
import TaskManager from './components/TaskManager';
import { ThemeProvider } from './ThemeContext'; // Import ThemeProvider

const App = () => {
  return (
    <ThemeProvider>
      <TaskManager />
    </ThemeProvider>
  );
};

export default App;
