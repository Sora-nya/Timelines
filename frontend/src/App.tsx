import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles';
import { TimelineList } from './pages/timelinesListPage/TimelineList';
import { NotesPage } from './pages/notesPage/NotesPage';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<TimelineList />} />
          <Route path="/timeline/:timelineId/notes" element={<NotesPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
