import React from "react";

const BoilerConsumption = ({ formData, handleChange }) => {
  return (
    <div className="p-4 rounded-xl mb-6 bg-white/20 backdrop-blur-md shadow-md border border-white/30">
      <h2 className="font-bold p-2 text-lg text-center text-white mb-4 bg-gradient-to-r from-blue-400/60 to-indigo-500/60 backdrop-blur-md shadow-md">
        Boiler Electric Consumption Entries
      </h2>

      {/* TF Boiler */}
      <h3 className="font-bold p-2 text-lg text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
        TF Boiler
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {["boiler_TF_WBSEDCL Unit", "boiler_TF_Running Hour", "boiler_TF_COMPRESSOR Unit", "boiler_TF_Husk Consumption (Ton)"].map((field) => (
          <div key={field}>
            <label className="block font-medium text-black mb-1">
              {field.replace("boiler_TF_", "")}
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
      
      {/* 12 Ton Boiler */}
      <h3 className="font-bold p-2 text-lg text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
        12 Ton Boiler
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["boiler_12_WBSEDCL Unit", "boiler_12_SOLAR Unit", "boiler_12_Running Hour", "boiler_12_RO Unit", "boiler_12_COMPRESSOR Unit", "boiler_12_Steam Generation (Ton)", "boiler_12_Water Consumption (Ton)", "boiler_12_Husk Consumption (Ton)"].map((field) => (
          <div key={field}>
            <label className="block font-medium text-black mb-1">
              {field.replace("boiler_12_", "")}
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

      {/* 18 Ton Boiler */}
      <h3 className="font-bold p-2 text-lg text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
        18 Ton Boiler
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["boiler_18_WBSEDCL Unit", "boiler_18_Running Hour", "boiler_18_RO Unit", "boiler_18_COMPRESSOR Unit", "boiler_18_Steam Generation (Ton)", "boiler_18_Water Consumption (Ton)", "boiler_18_Husk Consumption (Ton)"].map((field) => (
          <div key={field}>
            <label className="block font-medium text-black mb-1">
              {field.replace("boiler_18_", "")}
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

export default BoilerConsumption;
