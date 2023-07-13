import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Timeline } from './Timeline';
import { TimelineList } from './pages/timelinesListPage/TimelineList';

function App() {
  return (
    // equivalent to <Timeline></Timeline>
    <TimelineList/>
  );
}

export default App;
