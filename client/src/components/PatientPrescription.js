import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddPrescriptionModal from "../modalcomponents/AddPrescriptionModal";

const PatientPrescription = () => {
  const { id, name } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const patient = { id: id, name: decodeURIComponent(name) };

  return (
    <div className="bg-gradient-to-r from-teal-100 to-cyan-200 min-h-screen px-4 py-8">
      <div className="container mx-auto rounded-lg shadow-md bg-white px-8 py-6">
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Patient Prescription</h2>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-lg mb-2">
              <span className="font-bold text-gray-700">ID:</span> {patient.id}
            </p>
            <p className="text-lg mb-2">
              <span className="font-bold text-gray-700">Name:</span> {patient.name}
            </p>
          </div>
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Prescription
          </button>
        </div>
      </div>
      <AddPrescriptionModal isOpen={isModalOpen} onClose={closeModal} patient={patient} />
    </div>
  );
};

export default PatientPrescription;
