import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DoctorDashboard from './components/DoctorDashboard';
import PatientPrescription from './components/PatientPrescription';


function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-400">  
      <div className="max-w-md rounded-lg shadow-md px-8 py-12">  
        <h1 className="text-3xl font-bold mb-4 text-white">Welcome to MedBuddy!</h1>  
        <p className="text-lg text-gray-200 mb-8">Your personalized healthcare companion. Sign up as a doctor to access advanced patient management tools.</p>
        <div className="space-x-4">
          <Link to="/dashboard" className="bg-white hover:bg-gray-100 text-blue-500 py-2 px-4 rounded shadow-md">
            Sign Up as a Doctor
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DoctorDashboard />} />
        <Route path="/patient/:id/:name/prescription" element={<PatientPrescription />} />
      </Routes>
    </Router>
  );
}

export default App;
