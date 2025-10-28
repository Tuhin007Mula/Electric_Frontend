import React from "react";

const CompressorConsumption = ({ formData, handleChange }) => {
  return (
    <div className="p-4 rounded-xl mb-6 bg-white/20 backdrop-blur-md shadow-md border border-white/30">
      <h3 className="font-bold p-2 text-lg text-center text-white mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
        Compressor
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["comp_ELGI WBSEDCL Unit", "comp_Kaeser 1 WBSEDCL Unit", "comp_Kaeser 2 WBSEDCL Unit", "comp_ELGI SOLAR Unit", "comp_Kaeser 1 SOLAR Unit", "comp_Kaeser 2 SOLAR Unit", "ELGI Running Hour", "Kaeser 1 Running Hour", "Kaeser 2 Running Hour"].map((field) => (
          <div key={field}>
            <label className="block font-medium text-black mb-1">
              {field.replace("comp_", "")}
            </label>
            <input
              type="number"
              name={field}
              value={formData[field] || ""}
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

export default CompressorConsumption;