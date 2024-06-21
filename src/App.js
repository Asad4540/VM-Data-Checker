import React from 'react';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashComp from './Components/DashComp';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashcomp" element={<DashComp />} />

        </Routes>
      </Router>
    </>

  );
}

export default App;
