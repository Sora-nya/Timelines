import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Timeline } from './Timeline';
import { ThemeProvider } from 'styled-components';
import { TimelineList } from './pages/timelinesListPage/TimelineList';
import theme from './styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TimelineList/>
    </ThemeProvider>
    // equivalent to <Timeline></Timeline>
  );
}

export default App;
