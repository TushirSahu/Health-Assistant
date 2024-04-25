import React from 'react';
import { Link } from 'react-router-dom';

class DoctorDashboard extends React.Component {
    render() { 
        const patients = [
            { id: 1, name: 'ABC' },
            { id: 2, name: 'DEF' },
            { id: 3, name: 'GHI' }
        ];

        return (
            <div className="bg-gray-100 min-h-screen font-karla">
                <div className="container mx-auto py-8">
                    <header className="text-center">
                        <h1 className="text-3xl font-bold mb-4">Doctor's Dashboard</h1>
                    </header>
                    <div className="space-y-4">
                        <p className="text-lg text-gray-600 mb-2">List of Patients</p>
                        {patients.map(patient => (
                            <Link key={patient.id} to={`/patient/${patient.id}/${encodeURIComponent(patient.name)}/prescription`} className="block">
                                <button type="button" className="w-24 bg-white shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 rounded-lg p-2">
                                    {patient.name}
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default DoctorDashboard;
