import React from "react";

const Production = ({ formData, handleChange }) => {
  return (
    <div className="p-4 rounded-xl mb-6 bg-white/20 backdrop-blur-md shadow-md border border-white/30">
      <h2 className="font-bold p-2 text-lg text-center text-white mb-4 bg-gradient-to-r from-blue-400/60 to-indigo-500/60 backdrop-blur-md shadow-md">
        Production
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["Bran Feeding (Ton)", "Crude Charge (Ton)", "Paddy Feeding (Ton)"].map((field) => (
          <div key={field}>
            <label className="block font-medium text-black mb-1">{field}</label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Production;
