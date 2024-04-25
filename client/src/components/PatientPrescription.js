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
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-4">Patient Prescription</h2>
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <p className="text-lg mb-2"><span className="font-bold">ID:</span> {patient.id}</p>
                    <p className="text-lg mb-2"><span className="font-bold">Name:</span> {patient.name}</p>
                    <button onClick={openModal} className="first-letter text-white font-karla bg-gray-700 focus:outline-none hover:bg-black rounded-lg text-sm py-2 px-4 rounded">
                        Add Prescription
                    </button>
                </div>
            </div>
            <AddPrescriptionModal isOpen={isModalOpen} onClose={closeModal} patient={patient}/>
        </div>
    );
}
 
export default PatientPrescription;
