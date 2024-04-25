import React, { useState } from "react";

const DatesOfMonth = ({setSelectedDates, selectedDates}) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const numberOfDaysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const datesOfMonth = Array.from(
    { length: numberOfDaysInMonth },
    (_, index) => index + 1
  );

  

  const handleDateToggle = (date) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };
  console.log("Selected Dates:", selectedDates);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-2">
        <button className="px-2 py-1 border rounded-md bg-gray-200 hover:bg-gray-300">
          &lt;
        </button>
        <div>
          <p className="text-lg font-semibold">
            {monthsOfYear[currentMonth]} {currentYear}
          </p>
        </div>
        <button className="px-2 py-1 border rounded-md bg-gray-200 hover:bg-gray-300">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, index) => (
          <div key={`empty-${index}`} className="text-center"></div>
        ))}
        {datesOfMonth.map((date) => (
          <div key={date} className="text-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-1 w-4 h-4 rounded-sm focus:ring-1 focus:ring-blue-500 border-gray-300"
                onChange={() => handleDateToggle(date)}
              />
              {date}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddPrescriptionModal = ({ isOpen, onClose, patient }) => {

  const [selectedDates, setSelectedDates] = useState([]);


  const [medicineInputs, setMedicineInputs] = useState([
    { name: "", frequency: "", repetition: "", selectedDays: [], times: [] },
  ]);
  const [showWeekly, setShowWeekly] = useState(true);
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...medicineInputs];
    newInputs[index][name] = value;
    setMedicineInputs(newInputs);
  };

  const handleAddMedicine = () => {
    setMedicineInputs([
      ...medicineInputs,
      { name: "", frequency: "", repetition: "", selectedDays: [], times: [] },
    ]);
  };

  const handleRepetitionChange = (index, repetition) => {
    const newInputs = [...medicineInputs];
    newInputs[index].repetition = repetition;
    setMedicineInputs(newInputs);
    setShowWeekly(repetition === "weekly");
  };

  const handleDayToggle = (index, dayIndex) => {
    const newInputs = [...medicineInputs];
    const dayPosition = newInputs[index].selectedDays.indexOf(dayIndex);
    if (dayPosition === -1) {
      newInputs[index].selectedDays.push(dayIndex);
    } else {
      newInputs[index].selectedDays.splice(dayPosition, 1);
    }
    setMedicineInputs(newInputs);
  };

  const handleTimeChange = (index, timeIndex, event) => {
    const { value } = event.target;
    const newInputs = [...medicineInputs];
    newInputs[index].times[timeIndex] = value;
    setMedicineInputs(newInputs);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const transformedMedicineInputs = medicineInputs.flatMap((medicine) => {
      console.log(medicine)

      return medicine.times.map((time) => {
        const hours = parseInt(time.split(':')[0]); 
        const minutes = parseInt(time.split(':')[1]); 
        const transformedMedicine = {
          minutes: minutes,
          hours: hours,
          days: medicine.selectedDays,
          dates: medicine.repetition === 'monthly' ? selectedDates : [], 
          medicine: medicine.name
        };
        return transformedMedicine;
      });
    });

    const postData = {medicines: transformedMedicineInputs}

    
    console.log('Transformed Medicine Inputs:', transformedMedicineInputs);
    try {
      const response = await fetch("https://c45d-14-139-241-214.ngrok-free.app/api/crontab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log("Data sent successfully!");
      } else {
        console.error("Failed to send data:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    onClose(); 
  };
  
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <section
      className={`fixed inset-0 z-50 flex items-center justify-center flex-wrap py-20 bg-neutral-500 bg-opacity-80 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="pt-5 max-w-lg mx-auto bg-white border border-neutral-100 rounded-xl">
          <div className="px-6 pb-5">
            <div className="flex flex-wrap justify-between mb-2 -m-2">
              <div className="w-auto">
                <div className="flex flex-nowrap justify-left items-center">
                  <h2 className="mb-1 text-[20px] font-semibold font-karla">
                    {patient.name}'s Prescription
                  </h2>
                </div>
              </div>
              <div className="w-auto p-2" onClick={onClose}>
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.96967 12.9697C3.67678 13.2626 3.67678 13.7374 3.96967 14.0303C4.26256 14.3232 4.73744 14.3232 5.03033 14.0303L3.96967 12.9697ZM14.0303 5.03033C14.3232 4.73744 14.3232 4.26256 14.0303 3.96967C13.7374 3.67678 13.2626 3.67678 12.9697 3.96967L14.0303 5.03033ZM5.03033 3.96967C4.73744 3.67678 4.26256 3.67678 3.96967 3.96967C3.67678 4.26256 3.67678 4.73744 3.96967 5.03033L5.03033 3.96967ZM12.9697 14.0303C13.2626 14.3232 13.7374 14.3232 14.0303 14.0303C14.3232 13.7374 14.3232 13.2626 14.0303 12.9697L12.9697 14.0303ZM5.03033 14.0303L14.0303 5.03033L12.9697 3.96967L3.96967 12.9697L5.03033 14.0303ZM3.96967 5.03033L12.9697 14.0303L14.0303 12.9697L5.03033 3.96967L3.96967 5.03033Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <form onSubmit={handleFormSubmit}>
              {medicineInputs.map((medicine, index) => (
                <div key={index} className="px-4 py-2">
                  <p className="font-semibold mb-2">Medicine {index + 1}</p>
                  <input
                    type="text"
                    className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder={`Name of medicine ${index + 1}`}
                    name="name"
                    value={medicine.name}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                  <div className="mt-2">
                    <p>
                      Number of times in a day: &nbsp;
                      <select
                        className="px-4 py-2 w-20 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        name="frequency"
                        value={medicine.frequency}
                        onChange={(event) => handleInputChange(index, event)}
                      >
                        <option value="">Select</option>
                        {[1, 2, 3, 4, 5].map((times) => (
                          <option key={times} value={times}>
                            {times}
                          </option>
                        ))}
                      </select>
                    </p>
                  </div>
                  {Array.from({ length: medicine.frequency }).map(
                    (_, timeIndex) => (
                      <div key={timeIndex} className="mt-2">
                        <p>Time {timeIndex + 1}:</p>
                        <input
                          type="time"
                          step="3600"
                          className="px-4 py-2 w-40 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          value={medicine.times[timeIndex] || ""}
                          onChange={(event) =>
                            handleTimeChange(index, timeIndex, event)
                          }
                        />
                      </div>
                    )
                  )}
                  <div className="mt-2">
                    <p>Repetition:</p>
                    <div className="flex">
                      <button
                        type="button"
                        className={`px-3 py-1 mr-4 bg-gray-200 rounded-md ${
                          medicine.repetition === "weekly"
                            ? "bg-blue-500 text-white"
                            : ""
                        }`}
                        onClick={() => handleRepetitionChange(index, "weekly")}
                      >
                        Weekly
                      </button>
                      <button
                        type="button"
                        className={`px-3 py-1 bg-gray-200 rounded-md ${
                          medicine.repetition === "monthly"
                            ? "bg-blue-500 text-white"
                            : ""
                        }`}
                        onClick={() => handleRepetitionChange(index, "monthly")}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>
                  {showWeekly && (
                    <div className="mt-2">
                      <p>Select Days:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {daysOfWeek.map((day, dayIndex) => (
                          <label
                            key={dayIndex}
                            className={`flex items-center px-2 py-1 rounded-md ${
                              dayIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="mr-1 w-4 h-4 rounded-sm focus:ring-1 focus:ring-blue-500 border-gray-300"
                              checked={medicine.selectedDays.includes(dayIndex)}
                              onChange={() => handleDayToggle(index, dayIndex)}
                            />
                            {day}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  {!showWeekly && <DatesOfMonth setSelectedDates={setSelectedDates} selectedDates={selectedDates}/>}
                  <hr className="my-4" />
                </div>
              ))}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="ml-2 px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
                  onClick={handleAddMedicine}
                >
                  Add medicine
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="first-letter text-white font-karla bg-gray-700 focus:outline-none hover:bg-black rounded-lg text-sm px-5 py-2.5 w-full"
                  onClick={(event) => {
                    handleFormSubmit(event);
                  }}
                >
                  Add Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddPrescriptionModal;
