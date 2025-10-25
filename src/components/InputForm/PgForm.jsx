// import React, { useState } from "react";

// const PowerForm = () => {
//   const [formData, setFormData] = useState({
//     date: "",
//     WBSEDCL: "",
//     SOLAR: "",
//     DG: "",
//     // Electric Consumption Entries
//     prep_WBSEDCL: "",
//     prep_SOLAR: "",
//     solvent_WBSEDCL: "",
//     solvent_SOLAR: "",
//     refinery_WBSEDCL: "",
//     refinery_SOLAR: "",
//     refinery_COMPRESSOR: "",
//     newplant_WBSEDCL: "",
//     newplant_COMPRESSOR: "",
//     oldplant_WBSEDCL: "",
//     oldplant_COMPRESSOR: "",
//     dryer_WBSEDCL: "",
//     pulverizer_WBSEDCL: "",
//     // Boiler Electric Consumption Entries
//     boiler_solvent: "",
//     boiler_prep: "",
//     boiler_refinery: "",
//     boiler_dryer: "",
//     ro_solvent: "",
//     ro_prep: "",
//     ro_refinery: "",
//     ro_dryer: "",
//     comp_solvent: "",
//     comp_prep: "",
//     comp_refinery: "",
//     comp_newplant: "",
//     comp_oldplant: "",
//     comp_dryer: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("📤 Submitted Data:", formData);
//     alert("✅ Form submitted successfully!");
//   };

//   return (
//     <div className="relative h-screen w-screen">
//       {/* Background Layer */}
//       <div
//         className="fixed inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: "url('/bgimage.png')", // keep inside public/
//         }}
//       ></div>

//       {/* Glassmorphic Form Wrapper */}
//       <div className="relative h-screen">
//         <div className="max-w-5xl mx-auto my-10 p-6 rounded-2xl shadow-2xl
//           bg-white/20 backdrop-blur-m border border-white/30">
          
//           {/* Header */}
//           <div
//             className="text-center p-3 rounded-xl mb-6
//              bg-gradient-to-r from-pink-400/60 to-purple-500/60 
//              backdrop-blur-md shadow-md"
//           >
//             <h1 className="text-2xl font-bold text-white drop-shadow">
//               Power Generation Form
//             </h1>
//           </div>

//           {/* Date Section */}
//           <div className="p-4 rounded-xl mb-6 bg-white/20 backdrop-blur-md shadow-md border border-white/30">
//             <h2 className="font-bold p-2 text-lg text-center text-white mb-4 bg-gradient-to-r from-blue-400/60 to-indigo-500/60 backdrop-blur-md shadow-md">
//               Date Selection
//             </h2>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-3 py-2"
//               required
//             />
//           </div>

//           {/* Power Generation Section */}
//           <div className="p-4 rounded-xl mb-6 bg-white/20 backdrop-blur-md shadow-md border border-white/30">
//             <h2 className="font-bold p-2 text-lg text-center text-white mb-4 bg-gradient-to-r from-blue-400/60 to-indigo-500/60 backdrop-blur-md shadow-md">
//               Power Generation
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {["WBSEDCL", "SOLAR", "DG"].map((field) => (
//                 <div key={field}>
//                   <label className="block font-medium text-black mb-1">
//                     {field}
//                   </label>
//                   <input
//                     type="number"
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     placeholder={`Enter ${field}`}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Example of Reusable Sections */}
//           <div className="p-4 rounded-xl mb-6 bg-white/20 backdrop-blur-md shadow-md border border-white/30">
//             <h2 className="font-bold p-2 text-lg text-center text-white mb-4 bg-gradient-to-r from-blue-400/60 to-indigo-500/60 backdrop-blur-md shadow-md">
//               Electric Consumption Entries
//             </h2>

//             {/* Prep Section */}
//             <h3 className="font-bold p-2 text-lg w-24/25 mx-auto text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
//               Prep Section
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               {["prep WBSEDCL", "prep SOLAR", "prep BOILER"].map((field) => (
//                 <div key={field}>
//                   <label className="block font-medium text-black mb-1">
//                     {field.replace("prep", "")}
//                   </label>
//                   <input
//                     type="number"
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     placeholder={`Enter ${field}`}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
//               ))}
//             </div>
//             {/* Solvent Plant */}
//             <h3 className="font-bold p-2 text-lg w-24/25 mx-auto text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
//               Solvent Plant
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               {["solvent WBSEDCL", "solvent SOLAR", "solvent BOILER"].map((field) => (
//                 <div key={field}>
//                   <label className="block font-medium text-black mb-1">
//                     {field.replace("solvent", "")}
//                   </label>
//                   <input
//                     type="number"
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     placeholder={`Enter ${field}`}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
//               ))}
//             </div>
//           {/* Refinery */}
//           <h3 className="font-bold p-2 text-lg w-24/25 mx-auto text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
//               Refinery
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               {["Refinery WBSEDCL", "Refinery Solar", "Refinery Compressor", "Refinery Boiler"].map((field) => (
//                 <div key={field}>
//                   <label className="block font-medium text-black mb-1">
//                     {field.replace("Refinery", "")}
//                   </label>
//                   <input
//                     type="number"
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     placeholder={`Enter ${field}`}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
//               ))}
//             </div>
//           {/* New Plant */}
//           <h3 className="font-bold p-2 text-lg w-24/25 mx-auto text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
//               New Plant
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               {["New Plant WBSEDCL", "New Plant Compressor"].map((field) => (
//                 <div key={field}>
//                   <label className="block font-medium text-black mb-1">
//                     {field.replace("New Plant", "")}
//                   </label>
//                   <input
//                     type="number"
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     placeholder={`Enter ${field}`}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
//               ))}
//             </div>
//           {/* Old Plant */}
//           <h3 className="font-bold p-2 text-lg w-24/25 mx-auto text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
//             Old Plant
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             {["WBSEDCL", "COMPRESSOR"].map((field) => (
//               <div key={field}>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   {field}
//                 </label>
//                 <input
//                   type="number"
//                   name={`oldplant_${field}`}
//                   value={formData[`oldplant_${field}`]}
//                   onChange={handleChange}
//                   placeholder={`Enter ${field}`}
//                   className="w-full border rounded-lg px-3 py-2"
//                 />
//               </div>
//             ))}
//           </div>
//           {/* Dryer */}
//           <h3 className="font-bold p-2 text-lg w-24/25 mx-auto text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
//             Dryer
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             {["WBSEDCL", "BOILER"].map((field) => (
//               <div key={field}>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   {field}
//                 </label>
//                 <input
//                   type="number"
//                   name={`dryer_${field}`}
//                   value={formData[`dryer_${field}`]}
//                   onChange={handleChange}
//                   placeholder={`Enter ${field}`}
//                   className="w-full border rounded-lg px-3 py-2"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Pulverizer */}
//           <h3 className="font-bold p-2 text-lg w-24/25 mx-auto text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
//             Pulverizer
//           </h3>
//           <div className="grid grid-cols-1 gap-4 mb-6">
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">
//                 WBSEDCL
//               </label>
//               <input
//                 type="number"
//                 name="pulverizer_WBSEDCL"
//                 value={formData.pulverizer_WBSEDCL}
//                 onChange={handleChange}
//                 placeholder="Enter WBSEDCL"
//                 className="w-full border rounded-lg px-3 py-2"
//               />
//             </div>
//           </div>
//         </div>


//         {/* Example of Reusable Sections */}
//           <div className="p-4 rounded-xl mb-6 bg-white/20 backdrop-blur-md shadow-md border border-white/30">
//             <h2 className="font-bold p-2 text-lg text-center text-white mb-4 bg-gradient-to-r from-blue-400/60 to-indigo-500/60 backdrop-blur-md shadow-md">
//               Boiler Electric Consumption Entries
//             </h2>

//             {/* Boiler */}
//           <h3 className="font-bold p-2 text-lg w-24/25 mx-auto text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
//             Boiler
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             {["WBSEDCL", "SOLAR", "R.O.", "COMPRESSOR"].map((field) => (
//               <div key={field}>
//                 <label className="block font-medium text-gray-700 mb-1 capitalize">
//                   {field}
//                 </label>
//                 <input
//                   type="number"
//                   name={`boiler_${field}`}
//                   value={formData[`boiler_${field}`]}
//                   onChange={handleChange}
//                   placeholder={`Enter ${field}`}
//                   className="w-full border rounded-lg px-3 py-2"
//                 />
//               </div>
//             ))}
//           </div>
//           {/* Compressor */}
//           <h3 className="font-bold p-2 text-lg w-24/25 mx-auto text-center text-black mb-4 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 backdrop-blur-md shadow-md">
//             Compressor
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             {[
//               "ELGI",
//               "Keiser 1",
//               "Keiser 2",
//             ].map((field) => (
//               <div key={field}>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   {field.replace(/plant/, " Plant")}
//                 </label>
//                 <input
//                   type="number"
//                   name={`comp_${field}`}
//                   value={formData[`comp_${field}`]}
//                   onChange={handleChange}
//                   placeholder={`Enter ${field}`}
//                   className="w-full border rounded-lg px-3 py-2"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

        

//           {/* Submit Button */}
//           <div className="text-center">
//             <button
//               onClick={handleSubmit}
//               className="px-6 py-2 rounded-xl font-semibold text-white
//               bg-gradient-to-r from-green-600/80 to-emerald-600/80 
//               shadow-lg hover:scale-105 transform transition duration-300"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PowerForm;

import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import DateSelector from "./DateSelector";
import PowerGeneration from "./PowerGeneration";
import PlantsConsumption from "./PlantsConsumption";
import BoilerConsumption from "./BoilerConsumption";
import CompressorConsumption from "./CompressorConsumption";
import Production from "./Production";
import LoginForm from "../LoginForm/LoginForm";
import { apiRequest } from "../../api/Electric"; // adjust path if needed

const PgForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // date: "",
    // WBSEDCL: "",
    // SOLAR: "",
    // DG: "",
    // prep_WBSEDCL: "",
    // prep_SOLAR: "",
    // prep_BOILER: "",
    // solvent_WBSEDCL: "",
    // solvent_SOLAR: "",
    // solvent_BOILER: "",
    // refinery_WBSEDCL: "",
    // refinery_SOLAR: "",
    // refinery_COMPRESSOR: "",
    // refinery_BOILER: "",
    // newplant_WBSEDCL: "",
    // newplant_COMPRESSOR: "",
    // oldplant_WBSEDCL: "",
    // oldplant_COMPRESSOR: "",
    // dryer_WBSEDCL: "",
    // dryer_BOILER: "",
    // pulverizer_WBSEDCL: "",
    // boiler_WBSEDCL: "",
    // boiler_SOLAR: "",
    // boiler_RO: "",
    // boiler_COMPRESSOR: "",
    // comp_ELGI: "",
    // comp_Kaiser1: "",
    // comp_Kaiser2: "",
    // //boiler_solvent: "",
    // //boiler_prep: "",
    // //boiler_refinery: "",
    // //boiler_dryer: "",
    // // comp_solvent: "",
    // // comp_prep: "",
    // // comp_refinery: "",
    // // comp_newplant: "",
    // // comp_oldplant: "",
    // // comp_dryer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("📤 Raw FormData:", formData);

    // ✅ Helper: safely convert blank → number or undefined
    const toOptionalNumber = (val) => {
      if (val === "" || val === undefined) return undefined;
      return Number(val);
    };

    // ✅ Build payload strictly according to ElectricModel
    const payload = {
      date: formData.date || new Date().toISOString().split("T")[0],

      PowerGeneration: {
        WBSEDCL: Number(formData.WBSEDCL) || 0,
        SOLAR: Number(formData.SOLAR) || 0,
        DG: Number(formData.DG) || 0,
        WBSEDCL_RH : Number(formData["WBSEDCL Running Hour"]) || 0,
        SOLAR_RH : Number(formData["SOLAR Running Hour"]) || 0,
        DG_RH : Number(formData["DG Running Hour"]) || 0,
      },

      PlantsConsumption: {
        Prep: {
          WBSEDCL: Number(formData.prep_WBSEDCL) || 0,
          SOLAR: Number(formData.prep_SOLAR) || 0,
          BOILER_STEAM: Number(formData["prep_BOILER Steam (Ton)"]) || 0,
          BOILER_UNIT: Number(formData["prep_BOILER Steam Unit"]) || 0,
        },
        Solvent: {
          WBSEDCL: Number(formData.solvent_WBSEDCL) || 0,
          SOLAR: Number(formData.solvent_SOLAR) || 0,
          BOILER_STEAM: Number(formData["solvent_BOILER Steam (Ton)"]) || 0,
          BOILER_UNIT: Number(formData["solvent_BOILER Steam Unit"]) || 0,
        },
        Refinery: {
          WBSEDCL: Number(formData.refinery_WBSEDCL) || 0,
          SOLAR: Number(formData.refinery_SOLAR) || 0,
          COMPRESSOR: Number(formData.refinery_COMPRESSOR) || 0,
          BOILER_STEAM: Number(formData["refinery_BOILER Steam (Ton)"]) || 0,
          BOILER_UNIT: Number(formData["refinery_BOILER Steam Unit"]) || 0,
        },
        NewPlant: {
          WBSEDCL: Number(formData.newplant_WBSEDCL) || 0,
          COMPRESSOR: Number(formData.newplant_COMPRESSOR) || 0,
        },
        OldPlant: {
          WBSEDCL: Number(formData.oldplant_WBSEDCL) || 0,
          COMPRESSOR: Number(formData.oldplant_COMPRESSOR) || 0,
        },
        Dryer: {
          WBSEDCL: Number(formData.dryer_WBSEDCL) || 0,
          BOILER: Number(formData["dryer_BOILER Steam (Ton)"]) || 0,
        },
        Pulverizer: {
          WBSEDCL: Number(formData.pulverizer_WBSEDCL) || 0,
        },
      },

      BoilerConsumption: {
        TF_Boiler: {
          WBSEDCL: Number(formData.boiler_TF_WBSEDCL) || 0,
          SOLAR: Number(formData.boiler_TF_SOLAR) || 0,
          RO: Number(formData.boiler_TF_RO) || 0,
          COMPRESSOR: Number(formData.boiler_TF_COMPRESSOR) || 0,
        },
        TON_12_Boiler: {
          WBSEDCL: Number(formData.boiler_12_WBSEDCL) || 0,
          SOLAR: Number(formData.boiler_12_SOLAR) || 0,
          RO: Number(formData.boiler_12_RO) || 0,
          COMPRESSOR: Number(formData.boiler_12_COMPRESSOR) || 0,
        },
        TON_18_Boiler: {
          WBSEDCL: Number(formData.boiler_18_WBSEDCL) || 0,
          SOLAR: Number(formData.boiler_18_SOLAR) || 0,
          RO: Number(formData.boiler_18_RO) || 0,
          COMPRESSOR: Number(formData.boiler_18_COMPRESSOR) || 0,
        },
      },

      CompressorConsumption: {
        ELGI: Number(formData.comp_ELGI) || 0,
        KAISER_1: Number(formData["comp_Kaiser 1"]) || 0,
        KAISER_2: Number(formData["comp_Kaiser 2"]) || 0,
        ELGI_RH: Number(formData["ELGI Running Hour"]) || 0,
        KAISER_1_RH: Number(formData["Kaiser 1 Running Hour"]) || 0,
        KAISER_2_RH: Number(formData["Kaiser 2 Running Hour"]) || 0,
      },

      Production: {
        BRAN_FEEDING: Number(formData["Bran Feeding (Ton)"]) || 0,
        CRUDE_CHARGE: Number(formData["Crude Charge (Ton)"]) || 0,
        PADDY_FEEDING: Number(formData["Paddy Feeding (Ton)"]) || 0,
      },
    };

    console.log("📦 Final Payload:", payload);

    // ✅ Send to backend
    const result = await apiRequest("/electric", "POST", payload);

    alert("✅ Form submitted successfully!");
    console.log("🚀 Backend Response:", result);
    navigate('/success');
  } catch (error) {
    alert("❌ Failed to submit data, check console.");
    console.error("⚠️ Submit Error:", error);
  }
};

const handleLogout = () => {
    // clear auth if needed
    // localStorage.removeItem("token");
    console.log("🚪 Logout clicked");
    localStorage.removeItem("role");  // ✅ clear storage
    navigate("/", { replace: true });
    window.location.reload();  // ✅ refresh page
  };


  return (
    <div className="relative h-screen w-screen">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/bgimage.png')" }}
      >
      </div>

      {/* Logout Button */}
      {/* <button
        onClick={handleLogout}
        className="fixed top-10 right-50 z-50 px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 shadow-lg hover:scale-105 transform transition duration-300"
      >
        Logout
      </button> */}

      {/* ✅ Navbar */}
  <div className="w-full z-10 bg-gradient-to-r from-indigo-400/60 to-purple-400/60 backdrop-blur-md shadow-lg flex justify-between items-center px-8 sm:px-10 md:px-20 py-4">
    {/* Heading */}
    <h1 className="text-2xl font-bold text-white drop-shadow">
      Electricity Management System
    </h1>

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="px-8 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 shadow-lg hover:scale-105 transform transition duration-300"
    >
      Logout
    </button>
  </div>

      {/* Form */}
      {/* <div className="relative h-screen overflow-y-auto z-10"> */}
      <div className="relative overflow-y-auto z-10 mt-0">
        <div className="max-w-5xl mx-auto my-8 p-6 rounded-2xl shadow-2xl bg-white/20 backdrop-blur-m border border-white/30">
          
          {/* Header */}
          <div className="text-center p-3 rounded-xl mb-6 bg-gradient-to-r from-pink-400/60 to-purple-500/60 backdrop-blur-md shadow-md">
            <h1 className="text-2xl font-bold text-white drop-shadow">
              Power Generation Form
            </h1>
          </div>

          {/* Components */}
          <DateSelector formData={formData} handleChange={handleChange} />
          <PowerGeneration formData={formData} handleChange={handleChange} />
          <PlantsConsumption formData={formData} handleChange={handleChange} />
          <BoilerConsumption formData={formData} handleChange={handleChange} />
          <CompressorConsumption formData={formData} handleChange={handleChange} />
          <Production formData={formData} handleChange={handleChange} />

          {/* Submit */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600/80 to-emerald-600/80 shadow-lg hover:scale-105 transform transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgForm;

