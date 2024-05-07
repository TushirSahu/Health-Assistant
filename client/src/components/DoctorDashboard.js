import React from 'react';
import { Link } from 'react-router-dom';

class DoctorDashboard extends React.Component {
  render() {
    const patients = [
      { id: 1, name: 'Tushir Sahu' },
      { id: 2, name: 'Varun Sandeep Singh' },
      { id: 3, name: 'Siddharth Tandon' },
      { id: 4, name: 'Samyak Bhargava' },
    ];

    return (
      <div className="bg-gradient-to-r from-teal-100 to-cyan-200 min-h-screen px-4 py-8">
        <div className="container mx-auto rounded-lg shadow-md bg-white px-8 py-6">
          <header className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-blue-500">Doctor's Dashboard</h1>
          </header>

          <div className="mt-6">
            <p className="text-lg text-gray-600 mb-2">List of Patients</p>
            <ul className="list-none space-y-4">
              {patients.map((patient) => (
                <li key={patient.id} className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-blue-500">
                      {patient.name.charAt(0).toUpperCase()}
                    </div>
                    <Link to={`/patient/${patient.id}/${encodeURIComponent(patient.name)}/prescription`} className="text-md text-gray-700">
                      {patient.name}
                    </Link>
                  </div>
                  <svg className="h-5 w-5 fill-current text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 1.536a1 1 0 011.414 0l6.677 6.677a1 1 0 11-1.414 1.414L8.707 11.293a1 1 0 01-1.414-1.414L1.586 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default DoctorDashboard;
