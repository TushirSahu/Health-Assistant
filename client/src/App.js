import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorDashboard from './components/DoctorDashboard';
import PatientPrescription from './components/PatientPrescription';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorDashboard />} />
        <Route path="/patient/:id/:name/prescription" element={<PatientPrescription />} />
      </Routes>
    </Router>
  );
}

export default App;
