import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard1 from './components/Dashboard1';
import Dashboard2 from './components/Dashboard2';
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard1 />} />
        <Route path="/comparison" element={<Dashboard2 />} />
      </Routes>
    </div>
  </Router>
);

export default App;
