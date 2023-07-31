import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/styles';
import { TimelineList } from './pages/timelinesListPage/TimelineList';
import { NotesPage } from './pages/notesPage/NotesPage';
import GlobalStyle from './styles/GlobalStyle';


function App() {
  return (
    <ThemeProvider theme={theme}>
     <GlobalStyle />
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
