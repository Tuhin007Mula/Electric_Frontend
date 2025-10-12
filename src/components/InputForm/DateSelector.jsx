import React from "react";

const DateSelector = ({ formData, handleChange }) => {
  return (
    <div className="p-4 rounded-xl mb-6 bg-white/20 backdrop-blur-md shadow-md border border-white/30">
      <h2 className="font-bold p-2 text-lg text-center text-white mb-4 bg-gradient-to-r from-blue-400/60 to-indigo-500/60 backdrop-blur-md shadow-md">
        Date Selection
      </h2>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
        required
      />
    </div>
  );
};

export default DateSelector;