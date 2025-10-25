import React from "react";

const PlantsConsumption = ({ formData, handleChange }) => {
  return (
    <div className="p-4 rounded-xl mb-6 bg-white/20 backdrop-blur-md shadow-md border border-white/30">
      <h2 className="font-bold p-2 text-lg text-center text-white mb-4 bg-gradient-to-r from-blue-400/60 to-indigo-500/60 backdrop-blur-md shadow-md">
        Electric Consumption Entries
      </h2>

      {/* Prep Section */}
      <h3 className="font-bold p-2 text-lg text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
        Prep Section
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {["prep_WBSEDCL", "prep_SOLAR", "prep_BOILER Steam (Ton)", "prep_BOILER Steam Unit"].map((field) => (
          <div key={field}>
            <label className="block font-medium text-black mb-1">{field.replace("prep_", "")}</label>
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

      {/* Solvent Plant */}
      <h3 className="font-bold p-2 text-lg text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
        Solvent Plant
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {["solvent_WBSEDCL", "solvent_SOLAR", "solvent_BOILER Steam (Ton)", "solvent_BOILER Steam Unit"].map((field) => (
          <div key={field}>
            <label className="block font-medium text-black mb-1">{field.replace("solvent_", "")}</label>
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

      {/* Refinery */}
      <h3 className="font-bold p-2 text-lg text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
        Refinery
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["refinery_WBSEDCL", "refinery_SOLAR", "refinery_COMPRESSOR", "refinery_BOILER Steam (Ton)", "refinery_BOILER Steam Unit"].map((field) => (
          <div key={field}>
            <label className="block font-medium text-black mb-1">{field.replace("refinery_", "")}</label>
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

      {/* New Plant */}
      <h3 className="font-bold p-2 text-lg text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
        New Plant
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {["newplant_WBSEDCL", "newplant_COMPRESSOR"].map((field) => (
          <div key={field}>
            <label className="block font-medium text-black mb-1">{field.replace("newplant_", "")}</label>
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

      {/* Old Plant */}
      <h3 className="font-bold p-2 text-lg text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
        Old Plant
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {["oldplant_WBSEDCL", "oldplant_COMPRESSOR"].map((field) => (
          <div key={field}>
            <label className="block font-medium text-black mb-1">{field.replace("oldplant_", "")}</label>
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

      {/* Dryer */}
      <h3 className="font-bold p-2 text-lg text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
        Dryer
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["dryer_WBSEDCL", "dryer_BOILER Steam (Ton)", "dryer_BOILER Steam Unit"].map((field) => (
          <div key={field}>
            <label className="block font-medium text-black mb-1">{field.replace("dryer_", "")}</label>
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

      {/* Pulverizer */}
      <h3 className="font-bold p-2 text-lg text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
        Pulverizer
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <label className="block font-medium text-black mb-1">WBSEDCL</label>
          <input
            type="number"
            name="pulverizer_WBSEDCL"
            value={formData.pulverizer_WBSEDCL}
            onChange={handleChange}
            placeholder="Enter WBSEDCL"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default PlantsConsumption;
