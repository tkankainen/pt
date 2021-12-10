import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Trainingcalendar from './components/Trainingcalendar';
import Statistics from './components/Statistics';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Personal trainer
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link color="white" to="/customers">Customers</Link>{' '} 
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/trainings">Trainings</Link>{' '} 
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/calendar">Calendar</Link>{' '} 
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/statistics">Statistics</Link>{' '} 
            </Typography>
          </Toolbar>
       </AppBar>
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/calendar" element={<Trainingcalendar />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
    </BrowserRouter>     
    </div>
  );
}

export default App;
