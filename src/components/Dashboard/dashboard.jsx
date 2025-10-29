// import React, { useState, useEffect, useRef } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import { fetchElectricDashboard } from "../../api/fetchElectricDashBoard";
// import DateSelector from "./DateSelector/DateSelector";
// import { Download } from "lucide-react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// // ✅ Excel packages
// //import * as XLSX from "xlsx";
// import ExcelJS from "exceljs";
// //import { saveAs } from "file-saver";
// import { saveAs } from "file-saver";

// const DashBoard = () => {
//   const navigate = useNavigate();
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [dashboardData, setDashboardData] = useState([]);
//   const [sortOption, setSortOption] = useState("");

//   // 🔹 Store refs for all scrollable cards
//   const scrollRefs = useRef([]);

//   useEffect(() => {
//     if (selectedDate && selectedDate.startDate && selectedDate.endDate) {
//       try {
//         const startStr = selectedDate.startDate.toISOString().split("T")[0];
//         const endStr = selectedDate.endDate.toISOString().split("T")[0];
//         const dateString = startStr + (startStr !== endStr ? " " + endStr : "");

//         fetchElectricDashboard({ date: dateString }).then((res) => {
//           const extractedData = res?.data ?? [];
//           setDashboardData(extractedData);
//         });
//       } catch (err) {
//         console.error("❌ Invalid date:", selectedDate, err);
//       }
//     }
//   }, [selectedDate]);


//   // 🔹 Sorting logic
//   const getSortedData = () => {
//     let sorted = [...dashboardData];
//     switch (sortOption) {
//       case "solarHigh":
//         sorted.sort(
//           (a, b) =>
//             (b.totalConsumption?.SOLAR ?? 0) -
//             (a.totalConsumption?.SOLAR ?? 0)
//         );
//         break;
//       case "solarLow":
//         sorted.sort(
//           (a, b) =>
//             (a.totalConsumption?.SOLAR ?? 0) -
//             (b.totalConsumption?.SOLAR ?? 0)
//         );
//         break;
//       case "wbsedclHigh":
//         sorted.sort(
//           (a, b) =>
//             (b.totalConsumption?.WBSEDCL ?? 0) -
//             (a.totalConsumption?.WBSEDCL ?? 0)
//         );
//         break;
//       case "wbsedclLow":
//         sorted.sort(
//           (a, b) =>
//             (a.totalConsumption?.WBSEDCL ?? 0) -
//             (b.totalConsumption?.WBSEDCL ?? 0)
//         );
//         break;
//       default:
//         break;
//     }
//     return sorted;
//   };

//   const tableData = getSortedData();

//   const safeData = dashboardData.length > 0 ? dashboardData : [{}];
//   const record = safeData[0];
//   const totalConsumption = record?.totalConsumption?.TOTAL ?? 0;

//   const chartData =
//     totalConsumption > 0
//       ? [
//           {
//             name: "Prep",
//             value:
//               ((record?.WBSEDCLConsumption?.PREP ?? 0) +
//                 (record?.SOLARConsumption?.PREP ?? 0)) /
//               totalConsumption,
//           },
//           {
//             name: "Solvent",
//             value:
//               ((record?.WBSEDCLConsumption?.SOLVENT ?? 0) +
//                 (record?.SOLARConsumption?.SOLVENT ?? 0)) /
//               totalConsumption,
//           },
//           {
//             name: "Refinery",
//             value:
//               ((record?.WBSEDCLConsumption?.REFINERY ?? 0) +
//                 (record?.SOLARConsumption?.REFINERY ?? 0) +
//                 (record?.COMPRESSORConsumption?.REFINERY ?? 0)) /
//               totalConsumption,
//           },
//           {
//             name: "Dryer",
//             value: (record?.WBSEDCLConsumption?.DRYER ?? 0) / totalConsumption,
//           },
//           {
//             name: "Old Plant",
//             value:
//               (record?.WBSEDCLConsumption?.OLD_PLANT ?? 0) / totalConsumption,
//           },
//           {
//             name: "New Plant",
//             value:
//               (record?.WBSEDCLConsumption?.NEW_PLANT ?? 0) / totalConsumption,
//           },
//           {
//             name: "Boiler",
//             value:
//               ((record?.WBSEDCLConsumption?.BOILER ?? 0) +
//                 (record?.SOLARConsumption?.BOILER ?? 0) +
//                 (record?.COMPRESSORConsumption?.BOILER ?? 0)) /
//               totalConsumption,
//           },
//           {
//             name: "Pulverizer",
//             value:
//               (record?.WBSEDCLConsumption?.PULVERIZER ?? 0) / totalConsumption,
//           },
//         ].map((item) => ({
//           ...item,
//           value: parseFloat((item.value * 100).toFixed(2)),
//         }))
//       : [];

//   const COLORS = [
//     "#FF6384",
//     "#36A2EB",
//     "#FFCE56",
//     "#8E44AD",
//     "#2ECC71",
//     "#E67E22",
//     "#3498DB",
//     "#F39C12",
//   ];

//   // 🔹 Sync scroll across all card refs
//   const handleScroll = (e) => {
//     const scrollTop = e.target.scrollTop;
//     scrollRefs.current.forEach((ref) => {
//       if (ref && ref !== e.target) {
//         ref.scrollTop = scrollTop;
//       }
//     });
//   };

//   const handleLogout = () => {
//     // clear auth if needed
//     // localStorage.removeItem("token");
//     console.log("🚪 Logout clicked");
//     localStorage.removeItem("role");  // ✅ clear storage
//     navigate("/", { replace: true });
//     window.location.reload();  // ✅ refresh page
//   };

//   // 🔹 Common class to hide scrollbar but keep scrolling
//   const hiddenScrollbarClass = "max-h-60 overflow-y-auto scrollbar-hide";

// // ✅ Export to Excel with full styling
// const handleExport = async () => {
//   const wb = new ExcelJS.Workbook();
//   const ws = wb.addWorksheet("Dashboard");

//   // 🎨 Define color scheme
//   const colors = {
//     DATE: { top: "FFB6C1", sub: "FFE4EC", data: "FFF7F9" },      // Pink
//     POWER: { top: "87CEEB", sub: "B0E0F0", data: "E6F7FC" },     // Sky Blue
//     TOTAL: { top: "98FB98", sub: "C1F7C1", data: "ECFDEC" },     // Light Green
//     WBSEDCL: { top: "FFD700", sub: "FFE680", data: "FFF9D9" },   // Gold
//     SOLAR: { top: "FFA07A", sub: "FFCCB2", data: "FFF1E9" },     // Light Salmon
//     COMP: { top: "9370DB", sub: "C0A5E7", data: "F0EAFB" },      // Purple
//     ALT_ROW: "F2F2F2",                                           // Gray for alternate rows
//   };

//   // ✅ Helper: Apply cell style
//   const styleCell = (cell, { bold = false, bg = "FFFFFF", align = "center" }) => {
//     cell.font = { bold };
//     cell.alignment = { horizontal: align, vertical: "middle" };
//     cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: bg } };
//     cell.border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//   };

//   // ✅ Row 1: Top headers (merged)
//   ws.mergeCells("A1:A1");
//   ws.getCell("A1").value = "DATE";
//   styleCell(ws.getCell("A1"), { bold: true, bg: colors.DATE.top });

//   ws.mergeCells("B1:E1");
//   ws.getCell("B1").value = "POWER GENERATION";
//   styleCell(ws.getCell("B1"), { bold: true, bg: colors.POWER.top });

//   ws.mergeCells("F1:I1");
//   ws.getCell("F1").value = "TOTAL POWER CONSUMPTION";
//   styleCell(ws.getCell("F1"), { bold: true, bg: colors.TOTAL.top });

//   ws.mergeCells("J1:Q1");
//   ws.getCell("J1").value = "WBSEDCL";
//   styleCell(ws.getCell("J1"), { bold: true, bg: colors.WBSEDCL.top });

//   ws.mergeCells("R1:U1");
//   ws.getCell("R1").value = "SOLAR";
//   styleCell(ws.getCell("R1"), { bold: true, bg: colors.SOLAR.top });

//   ws.mergeCells("V1:AB1");
//   ws.getCell("V1").value = "COMPRESSOR";
//   styleCell(ws.getCell("V1"), { bold: true, bg: colors.COMP.top });

//   // ✅ Row 2: Subheaders
//   const subHeaders = [
//     "date",

//     // Power Generation
//     "WBSEDCL", "SOLAR", "DG", "TOTAL",

//     // Total Power Consumption
//     "WBSEDCL", "SOLAR", "SOLAR_LOSS", "TOTAL",

//     // WBSEDCL
//     "PREP", "SOLVENT", "REFINERY", "DRYER", "NEW_PLANT", "OLD_PLANT", "BOILER", "PULVERIZER",

//     // SOLAR
//     "PREP", "SOLVENT", "REFINERY", "BOILER",

//     // COMPRESSOR
//     "ELGI", "KAISER1", "KAISER2", "REFINERY", "NEW_PLANT", "OLD_PLANT", "BOILER"
//   ];

//   ws.addRow(subHeaders);

//   // 🎨 Style subheaders row
//   ws.getRow(2).eachCell((cell, colNumber) => {
//     let bg = "FFE4EC"; // default pink
//     if (colNumber >= 2 && colNumber <= 5) bg = colors.POWER.sub;
//     else if (colNumber >= 6 && colNumber <= 9) bg = colors.TOTAL.sub;
//     else if (colNumber >= 10 && colNumber <= 17) bg = colors.WBSEDCL.sub;
//     else if (colNumber >= 18 && colNumber <= 21) bg = colors.SOLAR.sub;
//     else if (colNumber >= 22 && colNumber <= 28) bg = colors.COMP.sub;

//     styleCell(cell, { bold: true, bg });
//   });

//   // ✅ Data Rows
//   dashboardData.forEach((rec, index) => {
//     const row = ws.addRow([
//       rec.date ?? "",

//       // Power Generation
//       // rec.powerGeneration?.WBSEDCL ?? 0,
//       // rec.powerGeneration?.SOLAR ?? 0,
//       // rec.powerGeneration?.DG ?? 0,
//       `${rec.powerGeneration?.WBSEDCL ?? 0} / ${rec.powerGeneration?.WBSEDCL_RH ?? 0} Hrs`,
//       `${rec.powerGeneration?.SOLAR ?? 0} / ${rec.powerGeneration?.SOLAR_RH ?? 0} Hrs`,
//       `${rec.powerGeneration?.DG ?? 0} / ${rec.powerGeneration?.DG_RH ?? 0} Hrs`,
//       rec.powerGeneration?.TOTAL ?? 0,

//       // Total Power Consumption
//       rec.totalConsumption?.WBSEDCL ?? 0,
//       rec.totalConsumption?.SOLAR ?? 0,
//       rec.totalConsumption?.SOLAR_LOSS ?? 0,
//       rec.totalConsumption?.TOTAL ?? 0,

//       // WBSEDCL
//       rec.WBSEDCLConsumption?.PREP ?? 0,
//       rec.WBSEDCLConsumption?.SOLVENT ?? 0,
//       rec.WBSEDCLConsumption?.REFINERY ?? 0,
//       rec.WBSEDCLConsumption?.DRYER ?? 0,
//       rec.WBSEDCLConsumption?.NEW_PLANT ?? 0,
//       rec.WBSEDCLConsumption?.OLD_PLANT ?? 0,
//       rec.WBSEDCLConsumption?.BOILER ?? 0,
//       rec.WBSEDCLConsumption?.PULVERIZER ?? 0,

//       // SOLAR
//       rec.SOLARConsumption?.PREP ?? 0,
//       rec.SOLARConsumption?.SOLVENT ?? 0,
//       rec.SOLARConsumption?.REFINERY ?? 0,
//       rec.SOLARConsumption?.BOILER ?? 0,

//       // COMPRESSOR
//       // rec.COMPRESSORConsumption?.ELGI ?? 0,
//       // rec.COMPRESSORConsumption?.KAISER1 ?? 0,
//       // rec.COMPRESSORConsumption?.KAISER2 ?? 0,
//       `${rec.COMPRESSORConsumption?.ELGI ?? 0} / ${rec.COMPRESSORConsumption?.ELGI_RH ?? 0} Hrs`,
//       `${rec.COMPRESSORConsumption?.KAISER1 ?? 0} / ${rec.COMPRESSORConsumption?.KAISER1_RH ?? 0} Hrs`,
//       `${rec.COMPRESSORConsumption?.KAISER2 ?? 0} / ${rec.COMPRESSORConsumption?.KAISER2_RH ?? 0} Hrs`,
//       rec.COMPRESSORConsumption?.REFINERY ?? 0,
//       rec.COMPRESSORConsumption?.NEW_PLANT ?? 0,
//       rec.COMPRESSORConsumption?.OLD_PLANT ?? 0,
//       rec.COMPRESSORConsumption?.BOILER ?? 0,
//     ]);

//     // 🎨 Style data cells by group
//     row.eachCell((cell, colNumber) => {
//       let bg = colors.DATE.data;
//       if (colNumber >= 2 && colNumber <= 5) bg = colors.POWER.data;
//       else if (colNumber >= 6 && colNumber <= 9) bg = colors.TOTAL.data;
//       else if (colNumber >= 10 && colNumber <= 17) bg = colors.WBSEDCL.data;
//       else if (colNumber >= 18 && colNumber <= 21) bg = colors.SOLAR.data;
//       else if (colNumber >= 22 && colNumber <= 28) bg = colors.COMP.data;

//       // 🔄 Alternate row background override
//       if (index % 2 === 1) {
//         bg = colors.ALT_ROW;
//       }

//       styleCell(cell, { bg });
//     });
//   });

//   // ✅ Auto column widths
//   ws.columns.forEach((col) => {
//     col.width = 15;
//   });

//   // ✅ Freeze top 2 rows + first column
//   ws.views = [{ state: "frozen", ySplit: 2, xSplit: 1 }];

//   // ✅ Save Excel file
//   const buf = await wb.xlsx.writeBuffer();
//   saveAs(new Blob([buf]), "Electric_Dashboard.xlsx");
// };




//   return (
//     <div
//       className="min-h-screen p-6 overflow-x-scroll"
//       //style={{ backgroundColor: "#EAF5F8" }}
//       style={{
//       backgroundColor: "#EAF5F8",
//       transform: "scale(0.75)",      // ✅ Shrink entire dashboard to 75%
//       transformOrigin: "top left",   // ✅ Keep alignment from top-left corner
//       width: "133.33%",              // ✅ Compensate for scale to avoid layout cutoff
//     }}
//     >
//       {/* <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
//         Electricity Management System
//       </h1> */}

//       {/* ✅ Navbar Section */}
//   <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg rounded-lg mb-6">
//     <h1 className="text-2xl font-bold text-white">
//       Electricity Management System
//     </h1>
//     {/* Logout Button */}
//     <button
//       onClick={handleLogout}
//       className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 shadow-lg hover:scale-105 transform transition duration-300"
//     >
//       Logout
//     </button>
//   </div>

//       {/* ✅ PieChart (Left) + DateSelector (Center) + WBSEDCL & SOLAR Table (Right) */}
// <div className="flex items-start justify-between mt-6 w-full">
//   {/* 🟢 Pie Chart (Left aligned) */}
//   <div className="bg-white shadow-lg rounded-xl p-2 w-[510px] h-[350px] flex items-center justify-center">
//     {chartData.length > 0 ? (
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={chartData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//             label={({ name, value }) => `${name} ${value}%`}
//           >
//             {chartData.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip formatter={(val) => `${val}%`} />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     ) : (
//       <p className="text-gray-500 text-center">
//         ⚠️ No data available for pie chart
//       </p>
//     )}
//   </div>

//   {/* 🟡 Date Selector (Center aligned) */}
//   <div className="flex flex-col items-center justify-center w-[800px] h-[300px] bg-white rounded-xl shadow-lg border border-gray-200 p-4 mx-auto">
//     <div className="bg-gradient-to-r from-pink-600 to-rose-600 w-full text-white text-center font-semibold py-2 mb-5 rounded-t-xl">
//         Select Date
//       </div>
//     <DateSelector
//       onChange={(date) => {
//         if (date?.value?.start && date?.value?.end) {
//           const startDate = new Date(date.value.start);
//           const endDate = new Date(date.value.end);
//           if (!isNaN(startDate) && !isNaN(endDate)) {
//             setSelectedDate({ startDate, endDate });
//           }
//         } else if (date?.value) {
//           const singleDate = new Date(date.value);
//           if (!isNaN(singleDate)) {
//             setSelectedDate({
//               startDate: singleDate,
//               endDate: singleDate,
//             });
//           }
//         } else if (date) {
//           const singleDate = new Date(date);
//           if (!isNaN(singleDate)) {
//             setSelectedDate({
//               startDate: singleDate,
//               endDate: singleDate,
//             });
//           }
//         } else {
//           setSelectedDate(null);
//         }
//       }}
//     />
//   </div>

//   {/* 🔵 WBSEDCL & SOLAR Table (Right aligned) */}
//   <div className="bg-white shadow-lg rounded-xl p-4 w-[550px] h-[320px]">
//     <div className="flex justify-between items-center mb-4">
//       <h2 className="text-lg font-semibold text-gray-800">
//         WBSEDCL and SOLAR Consumption
//       </h2>
//       <select
//         className="border rounded-lg px-2 py-1 text-sm"
//         value={sortOption}
//         onChange={(e) => setSortOption(e.target.value)}
//       >
//         <option value="">Sort By</option>
//         <option value="solarHigh">High to Low (SOLAR)</option>
//         <option value="solarLow">Low to High (SOLAR)</option>
//         <option value="wbsedclHigh">High to Low (WBSEDCL)</option>
//         <option value="wbsedclLow">Low to High (WBSEDCL)</option>
//       </select>
//     </div>

//     <div className="max-h-60 overflow-y-auto scrollbar-hide">
//       <table className="w-full border-collapse border border-gray-200">
//         <thead className="sticky top-0 z-10">
//           <tr>
//             <th className="border border-gray-300 px-3 py-2 text-sm text-center bg-cyan-200 text-gray-700">
//               Date
//             </th>
//             <th className="border border-gray-300 px-3 py-2 text-sm text-center bg-orange-200 text-gray-700">
//               WBSEDCL
//             </th>
//             <th className="border border-gray-300 px-3 py-2 text-sm text-center bg-yellow-200 text-gray-700">
//               SOLAR
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.length > 0 ? (
//             tableData.map((record, idx) => (
//               <tr key={idx}>
//                 <td
//                   className={`border border-gray-300 px-3 py-2 text-sm text-center ${
//                     idx % 2 === 0 ? "bg-cyan-50" : "bg-cyan-100"
//                   }`}
//                 >
//                   {record.date ?? "N/A"}
//                 </td>
//                 <td
//                   className={`border border-gray-300 px-3 py-2 text-sm text-center ${
//                     idx % 2 === 0 ? "bg-orange-50" : "bg-orange-100"
//                   }`}
//                 >
//                   {record.totalConsumption?.["WBSEDCL"] ?? 0}
//                 </td>
//                 <td
//                   className={`border border-gray-300 px-3 py-2 text-sm text-center ${
//                     idx % 2 === 0 ? "bg-yellow-50" : "bg-yellow-100"
//                   }`}
//                 >
//                   {record.totalConsumption?.["SOLAR"] ?? 0}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td
//                 colSpan="3"
//                 className="text-center py-4 text-gray-500 text-sm"
//               >
//                 No Data Available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>


//       {/* ✅ Parent container for Export button + cards */}
// <div className="relative bg-white shadow-lg rounded-xl border border-gray-200 mt-8">

//       {/* 🔹 Center-Aligned Heading + Right Export Button */}
//   <div className="relative flex items-center justify-center sticky top-0 right-0 z-30 bg-white px-16 py-4 rounded-t-xl">
//     {/* Center Heading */}
//     <h1 className="text-2xl font-bold text-gray-800 text-center absolute left-1/2 transform -translate-x-1/2">
//       Daily Report
//     </h1>

//     {/* Right-Aligned Export Button */}
//     <div className="ml-auto">
//       <button
//         onClick={handleExport}
//         className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg flex items-center gap-2 shadow-md"
//       >
//         <Download className="w-5 h-5" />
//         Export
//       </button>
//     </div>
//   </div>

//       {/* ✅ Cards Section (Date fixed inside same container) */}
//       <div className="bg-white shadow-lg flex flex-start rounded-xl py-0 px-0 border border-gray-200 mb-0 overflow-x-scroll mt-0 space-x-6 relative">

        
//         {/* Date Card (Sticky inside same div) */}
//         <div className="bg-white shadow-lg rounded-xl p-6 min-w-[200px] mx-0 border border-gray-200 mb-0 mt-0 sticky left-0 z-20">
//           <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#AEF5F8] text-center">
//             Date
//           </h2>
//           <div className="mb-2 sticky top-12 bg-white z-10">
//             <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
//               DATE
//             </label>
//           </div>
//           <div
//             className={hiddenScrollbarClass}
//             ref={(el) => (scrollRefs.current[0] = el)}
//             onScroll={handleScroll}
//           >
//             {dashboardData.length > 0 ? (
//               dashboardData.map((record, idx) => (
//                 <div key={idx} className="grid grid-cols-1 gap-4 mb-2">
//                   <input
//                     type="text"
//                     value={record.date ?? "0"}
//                     readOnly
//                     className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#EAFCFD]"
//                   />
//                 </div>
//               ))
//             ) : (
//               <div className="grid grid-cols-1 gap-4 mb-2">
//                 <input
//                   type="text"
//                   value="No Date Selected"
//                   readOnly
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#EAFCFD]"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Other Cards (Scroll Horizontally) */}

//         {/* Power Generation Card */}
//         <div className="bg-white shadow-lg rounded-xl p-6 min-w-3xl mx-0 border border-gray-200 mb-0 mt-0">
//           <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#B9FCA8] text-center">
//             Power Generation
//           </h2>
//           <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2 sticky top-12 bg-white z-10">
//             {["WBSEDCL", "SOLAR", "DG", "TOTAL"].map((label) => (
//               <div key={label}>
//                 <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
//                   {label}
//                 </label>
//               </div>
//             ))}
//           </div>
//           <div
//             className={hiddenScrollbarClass}
//             ref={(el) => (scrollRefs.current[1] = el)}
//             onScroll={handleScroll}
//           >
//             {safeData.map((record, idx) => (
//               <div
//                 key={idx}
//                 className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2"
//               >
//                 {["WBSEDCL", "SOLAR", "DG", "TOTAL"].map((label) => {
//                   const value = record.powerGeneration?.[label] ?? 0;
//                   const rhValue = record.powerGeneration?.[`${label}_RH`] ?? 0;
//                   return (
//                     <div key={label}>
//                       <input
//                         type="text"
//                         value={
//                           ["WBSEDCL", "SOLAR", "DG"].includes(label)
//                             ? `${value} / ${rhValue} Hrs`
//                             : value
//                         }
//                         readOnly
//                         className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#ECFCED]"
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             ))}
//           </div>
//         </div>

//       {/* Total Power Consumption Card */}
//         <div className="bg-white shadow-lg rounded-xl p-6 min-w-3xl mx-auto border border-gray-200 mb-0 mt-0">
//           <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#FECB7D] text-center">
//             Total Power Consumption
//           </h2>
//           <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2 sticky top-12 bg-white z-10">
//             {["WBSEDCL", "SOLAR", "SOLAR_LOSS", "TOTAL"].map((label) => (
//               <div key={label}>
//                 <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
//                   {label}
//                 </label>
//               </div>
//             ))}
//           </div>
//           <div
//             className={hiddenScrollbarClass}
//             ref={(el) => (scrollRefs.current[2] = el)}
//             onScroll={handleScroll}
//           >
//           {safeData.map((record, idx) => (
//             <div
//               key={idx}
//               className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2"
//             >
//               {["WBSEDCL", "SOLAR", "SOLAR_LOSS", "TOTAL"].map((label) => {

//                 return (
//                     <div key={label}>
//                     <input
//                       type="text"
//                       value={record.totalConsumption?.[label] ?? 0}
//                       readOnly
//                       className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#F9F0D8]"
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           ))}
//           </div>
//         </div>

//         {/* WBSEDCL Card */}
//         <div className="bg-white shadow-lg rounded-xl p-6 min-w-7xl mx-auto border border-gray-200 mb-0 mt-0">
//           <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#F8BDBD] text-center">
//             WBSEDCL
//           </h2>
//           <div className="grid grid-cols-8 sm:grid-cols-8 md:grid-cols-8 gap-4 mb-2 sticky top-12 bg-white z-10">
//             {[
//               "PREP",
//               "SOLVENT",
//               "REFINERY",
//               "DRYER",
//               "NEW_PLANT",
//               "OLD_PLANT",
//               "BOILER",
//               "PULVERIZER",
//             ].map((label) => (
//               <div key={label}>
//                 <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
//                   {label}
//                 </label>
//               </div>
//             ))}
//           </div>
//           <div
//             className={hiddenScrollbarClass}
//             ref={(el) => (scrollRefs.current[3] = el)}
//             onScroll={handleScroll}
//           >
//           {safeData.map((record, idx) => (
//             <div
//               key={idx}
//               className="grid grid-cols-8 sm:grid-cols-8 md:grid-cols-8 gap-4 mb-2"
//             >
//               {[
//                 "PREP",
//                 "SOLVENT",
//                 "REFINERY",
//                 "DRYER",
//                 "NEW_PLANT",
//                 "OLD_PLANT",
//                 "BOILER",
//                 "PULVERIZER",
//               ].map((label) => {
//                 return (
//                 <div key={label}>
//                   <input
//                     type="text"
//                     value={record.WBSEDCLConsumption?.[label] ?? 0}
//                     readOnly
//                     className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#F9EDED]"
//                   />
//                 </div>
//                 );
//               })}
//             </div>
//           ))}
//           </div>
//         </div>

//         {/* SOLAR Card */}
//         <div className="bg-white shadow-lg rounded-xl p-6 min-w-2xl mx-auto border border-gray-200 mb-0 mt-0">
//           <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#ADCFF8] text-center">
//             SOLAR
//           </h2>
//           <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2 sticky top-12 bg-white z-10">
//             {["PREP", "SOLVENT", "REFINERY", "BOILER"].map((label) => (
//               <div key={label}>
//                 <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
//                   {label}
//                 </label>
//               </div>
//             ))}
//           </div>
//           <div
//             className={hiddenScrollbarClass}
//             ref={(el) => (scrollRefs.current[4] = el)}
//             onScroll={handleScroll}
//           >
//           {safeData.map((record, idx) => (
//             <div
//               key={idx}
//               className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2"
//             >
//               {["PREP", "SOLVENT", "REFINERY", "BOILER"].map((label) => {
//                 return (
//                 <div key={label}>
//                   <input
//                     type="text"
//                     value={record.SOLARConsumption?.[label] ?? 0}
//                     readOnly
//                     className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#E9F3FB]"
//                   />
//                 </div>
//                 );
//               })}
//             </div>
//           ))}
//           </div>
//         </div>

//         {/* COMPRESSOR Card */}
//         <div className="bg-white shadow-lg rounded-xl p-6 min-w-6xl mx-auto border border-gray-200 mb-0 mt-0">
//           <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#EDD3F8] text-center">
//             COMPRESSOR
//           </h2>
//           <div className="grid grid-cols-7 sm:grid-cols-7 md:grid-cols-7 gap-4 mb-2 sticky top-12 bg-white z-10">
//             {[
//               "ELGI",
//               "KAISER1",
//               "KAISER2",
//               "REFINERY",
//               "NEW_PLANT",
//               "OLD_PLANT",
//               "BOILER",
//             ].map((label) => (
//               <div key={label}>
//                 <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
//                   {label}
//                 </label>
//               </div>
//             ))}
//           </div>
//           <div
//             className={hiddenScrollbarClass}
//             ref={(el) => (scrollRefs.current[5] = el)}
//             onScroll={handleScroll}
//           >
//           {safeData.map((record, idx) => (
//             <div
//               key={idx}
//               className="grid grid-cols-7 sm:grid-cols-7 md:grid-cols-7 gap-4 mb-2"
//             >
//               {[
//                 "ELGI",
//                 "KAISER1",
//                 "KAISER2",
//                 "REFINERY",
//                 "NEW_PLANT",
//                 "OLD_PLANT",
//                 "BOILER",
//               ].map((label) => {
//                 const value = record.COMPRESSORConsumption?.[label] ?? 0;
//                 const rhValue = record.COMPRESSORConsumption?.[`${label}_RH`] ?? 0;
//                 return (
//                   <div key={label}>
//                     <input
//                       type="text"
//                       value={
//                         ["ELGI", "KAISER1", "KAISER2"].includes(label)
//                           ? `${value} / ${rhValue} Hrs`
//                           : value
//                       }
//                       readOnly
//                       className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#FFEDFD]"
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           ))}
//           </div>
//         </div>

//         {/* 🔹 Your existing cards (Power Generation, Total Power Consumption, WBSEDCL, SOLAR, COMPRESSOR...) remain the same */}
//         {/* Copy your existing card code here (from Power Generation downwards) */}
//       </div>

//       {/* 🔹 CSS for hiding scrollbars */}
//       {/* <style jsx>{` */}
//         <style>{`
//         .scrollbar-hide {
//           scrollbar-width: none; /* Firefox */
//           -ms-overflow-style: none; /* IE 10+ */
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none; /* Chrome, Safari, Edge */
//         }
//       `}</style>
//     </div>
//     </div>
//   );
// };

// export default DashBoard;

//##########################################################################

import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchElectricDashboard } from "../../api/fetchElectricDashBoard";
import DateSelector from "./DateSelector/DateSelector";
import { Download } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ✅ Excel packages
//import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
//import { saveAs } from "file-saver";
import { saveAs } from "file-saver";

const DashBoard = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [dashboardData, setDashboardData] = useState([]);
  const [sortOption, setSortOption] = useState("");

  // 🔹 Store refs for all scrollable cards
  const scrollRefs = useRef([]);

  useEffect(() => {
    if (selectedDate && selectedDate.startDate && selectedDate.endDate) {
      try {
        const startStr = selectedDate.startDate.toISOString().split("T")[0];
        const endStr = selectedDate.endDate.toISOString().split("T")[0];
        const dateString = startStr + (startStr !== endStr ? " " + endStr : "");

        fetchElectricDashboard({ date: dateString }).then((res) => {
          const extractedData = res?.data ?? [];
          setDashboardData(extractedData);
        });
      } catch (err) {
        console.error("❌ Invalid date:", selectedDate, err);
      }
    }
  }, [selectedDate]);


  // 🔹 Sorting logic
  const getSortedData = () => {
    let sorted = [...dashboardData];
    switch (sortOption) {
      case "solarHigh":
        sorted.sort(
          (a, b) =>
            (b.totalConsumption?.SOLAR ?? 0) -
            (a.totalConsumption?.SOLAR ?? 0)
        );
        break;
      case "solarLow":
        sorted.sort(
          (a, b) =>
            (a.totalConsumption?.SOLAR ?? 0) -
            (b.totalConsumption?.SOLAR ?? 0)
        );
        break;
      case "wbsedclHigh":
        sorted.sort(
          (a, b) =>
            (b.totalConsumption?.WBSEDCL ?? 0) -
            (a.totalConsumption?.WBSEDCL ?? 0)
        );
        break;
      case "wbsedclLow":
        sorted.sort(
          (a, b) =>
            (a.totalConsumption?.WBSEDCL ?? 0) -
            (b.totalConsumption?.WBSEDCL ?? 0)
        );
        break;
      default:
        break;
    }
    return sorted;
  };

  const tableData = getSortedData();

  const safeData = dashboardData.length > 0 ? dashboardData : [{}];
  const record = safeData[0];
  const totalConsumption = record?.totalConsumption?.TOTAL ?? 0;

  const chartData =
    totalConsumption > 0
      ? [
          {
            name: "Prep",
            value:
              ((record?.WBSEDCLConsumption?.PREP ?? 0) +
                (record?.SOLARConsumption?.PREP ?? 0)) /
              totalConsumption,
          },
          {
            name: "Solvent",
            value:
              ((record?.WBSEDCLConsumption?.SOLVENT ?? 0) +
                (record?.SOLARConsumption?.SOLVENT ?? 0)) /
              totalConsumption,
          },
          {
            name: "Refinery",
            value:
              ((record?.WBSEDCLConsumption?.REFINERY ?? 0) +
                (record?.SOLARConsumption?.REFINERY ?? 0) +
                (record?.COMPRESSORConsumption?.REFINERY ?? 0)) /
              totalConsumption,
          },
          {
            name: "Dryer",
            value: (record?.WBSEDCLConsumption?.DRYER ?? 0) / totalConsumption,
          },
          {
            name: "Old Plant",
            value:
              (record?.WBSEDCLConsumption?.OLD_PLANT ?? 0) / totalConsumption,
          },
          {
            name: "New Plant",
            value:
              (record?.WBSEDCLConsumption?.NEW_PLANT ?? 0) / totalConsumption,
          },
          {
            name: "Boiler",
            value:
              ((record?.WBSEDCLConsumption?.BOILER ?? 0) +
                (record?.SOLARConsumption?.BOILER ?? 0) +
                (record?.COMPRESSORConsumption?.BOILER ?? 0)) /
              totalConsumption,
          },
          {
            name: "Pulverizer",
            value:
              (record?.WBSEDCLConsumption?.PULVERIZER ?? 0) / totalConsumption,
          },
        ].map((item) => ({
          ...item,
          value: parseFloat((item.value * 100).toFixed(2)),
        }))
      : [];

  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#8E44AD",
    "#2ECC71",
    "#E67E22",
    "#3498DB",
    "#F39C12",
  ];

  // 🔹 Sync scroll across all card refs
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    scrollRefs.current.forEach((ref) => {
      if (ref && ref !== e.target) {
        ref.scrollTop = scrollTop;
      }
    });
  };

  const handleLogout = () => {
    // clear auth if needed
    // localStorage.removeItem("token");
    console.log("🚪 Logout clicked");
    localStorage.removeItem("role");  // ✅ clear storage
    navigate("/", { replace: true });
    window.location.reload();  // ✅ refresh page
  };

  // 🔹 Common class to hide scrollbar but keep scrolling
  const hiddenScrollbarClass = "max-h-60 overflow-y-auto scrollbar-hide";

// ✅ Export to Excel with full styling
const handleExport = async () => {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Dashboard");

  // 🎨 Define color scheme
  const colors = {
    DATE: { top: "FFB6C1", sub: "FFE4EC", data: "FFF7F9" },      // Pink
    POWER: { top: "87CEEB", sub: "B0E0F0", data: "E6F7FC" },     // Sky Blue
    TOTAL: { top: "98FB98", sub: "C1F7C1", data: "ECFDEC" },     // Light Green
    WBSEDCL: { top: "FFD700", sub: "FFE680", data: "FFF9D9" },   // Gold
    SOLAR: { top: "FFA07A", sub: "FFCCB2", data: "FFF1E9" },     // Light Salmon
    COMP: { top: "9370DB", sub: "C0A5E7", data: "F0EAFB" },      // Purple
    PLANT: { top: "3CB371", sub: "7DCC9B", data: "E8F6EF" },     // Medium Sea Green
    TON12: { top: "40E0D0", sub: "80EDE0", data: "E6FAF8" },     // Turquoise
    TON18: { top: "FF8C00", sub: "FFB84D", data: "FFF3E0" },     // Dark Orange
    ALT_ROW: "F2F2F2",                                           // Gray for alternate rows
  };

  // ✅ Helper: Apply cell style
  const styleCell = (cell, { bold = false, bg = "FFFFFF", align = "center" }) => {
    cell.font = { bold };
    cell.alignment = { horizontal: align, vertical: "middle" };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: bg } };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  };

  // ✅ Row 1: Top headers (merged)
  ws.mergeCells("A1:A1");
  ws.getCell("A1").value = "DATE";
  styleCell(ws.getCell("A1"), { bold: true, bg: colors.DATE.top });

  ws.mergeCells("B1:E1");
  ws.getCell("B1").value = "POWER GENERATION";
  styleCell(ws.getCell("B1"), { bold: true, bg: colors.POWER.top });

  ws.mergeCells("F1:I1");
  ws.getCell("F1").value = "TOTAL POWER CONSUMPTION";
  styleCell(ws.getCell("F1"), { bold: true, bg: colors.TOTAL.top });

  ws.mergeCells("J1:L1");
  ws.getCell("J1").value = "PLANT WISE CONSUMPTION";
  styleCell(ws.getCell("J1"), { bold: true, bg: colors.PLANT.top });

  ws.mergeCells("M1:U1");
  ws.getCell("M1").value = "WBSEDCL";
  styleCell(ws.getCell("M1"), { bold: true, bg: colors.WBSEDCL.top });

  ws.mergeCells("V1:Y1");
  ws.getCell("V1").value = "SOLAR";
  styleCell(ws.getCell("V1"), { bold: true, bg: colors.SOLAR.top });

  ws.mergeCells("Z1:AF1");
  ws.getCell("Z1").value = "COMPRESSOR";
  styleCell(ws.getCell("Z1"), { bold: true, bg: colors.COMP.top });

  ws.mergeCells("AG1:AJ1");
  ws.getCell("AG1").value = "12 TON BOILER";
  styleCell(ws.getCell("AG1"), { bold: true, bg: colors.TON12.top });

  ws.mergeCells("AK1:AN1");
  ws.getCell("AK1").value = "18 TON BOILER";
  styleCell(ws.getCell("AK1"), { bold: true, bg: colors.TON18.top });

  // ✅ Row 2: Subheaders
  const subHeaders = [
    "date",

    // Power Generation
    "WBSEDCL", "SOLAR", "DG", "TOTAL",

    // Total Power Consumption
    "WBSEDCL", "SOLAR", "SOLAR_LOSS", "TOTAL",

    // Plant Wise Consumption
    "PREP_SOLVENT", "REFINERY", "RICE_MILL",

    // WBSEDCL
    "PREP", "SOLVENT", "REFINERY", "DRYER", "NEW_PLANT", "OLD_PLANT", "BOILER", "PULVERIZER_MEGA", "PULVERIZER_OILS",

    // SOLAR
    "PREP", "SOLVENT", "REFINERY", "BOILER",

    // COMPRESSOR
    "ELGI", "KAESER1", "KAESER2", "REFINERY", "NEW_PLANT", "OLD_PLANT", "BOILER",

    // 12 Ton Boiler
    "UNIT CONSUMPTION", "STEAM GENERATION", "WATER CONSUMPTION", "HUSK CONSUMPTION",

    // 18 Ton Boiler
    "UNIT CONSUMPTION", "STEAM GENERATION", "WATER CONSUMPTION", "HUSK CONSUMPTION",
  ];

  ws.addRow(subHeaders);

  // 🎨 Style subheaders row
  ws.getRow(2).eachCell((cell, colNumber) => {
    let bg = "FFE4EC"; // default pink
    if (colNumber >= 2 && colNumber <= 5) bg = colors.POWER.sub;
    else if (colNumber >= 6 && colNumber <= 9) bg = colors.TOTAL.sub;
    else if (colNumber >= 10 && colNumber <= 12) bg = colors.PLANT.sub;
    else if (colNumber >= 13 && colNumber <= 21) bg = colors.WBSEDCL.sub;
    else if (colNumber >= 22 && colNumber <= 25) bg = colors.SOLAR.sub;
    else if (colNumber >= 26 && colNumber <= 32) bg = colors.COMP.sub;
    else if (colNumber >= 33 && colNumber <= 36) bg = colors.TON12.sub;
    else if (colNumber >= 37 && colNumber <= 40) bg = colors.TON18.sub;

    styleCell(cell, { bold: true, bg });
  });

  // ✅ Data Rows
  dashboardData.forEach((rec, index) => {
    const row = ws.addRow([
      rec.date ?? "",

      // Power Generation
      // rec.powerGeneration?.WBSEDCL ?? 0,
      // rec.powerGeneration?.SOLAR ?? 0,
      // rec.powerGeneration?.DG ?? 0,
      `${rec.powerGeneration?.WBSEDCL ?? 0} / ${rec.powerGeneration?.WBSEDCL_RH ?? 0} Hrs`,
      `${rec.powerGeneration?.SOLAR ?? 0} / ${rec.powerGeneration?.SOLAR_RH ?? 0} Hrs`,
      `${rec.powerGeneration?.DG ?? 0} / ${rec.powerGeneration?.DG_RH ?? 0} Hrs`,
      rec.powerGeneration?.TOTAL ?? 0,

      // Total Power Consumption
      rec.totalConsumption?.WBSEDCL ?? 0,
      rec.totalConsumption?.SOLAR ?? 0,
      rec.totalConsumption?.SOLAR_LOSS ?? 0,
      rec.totalConsumption?.TOTAL ?? 0,

      // Plant Wise Consumption
      `${rec.plantWiseConsumption?.PREP_SOLVENT ?? 0} Unit / ${rec.plantWiseConsumption?.PREP_SOLVENT_PRODUCTION ?? 0} Ton`,
      `${rec.plantWiseConsumption?.REFINERY ?? 0} Unit / ${rec.plantWiseConsumption?.REFINERY_PRODUCTION ?? 0} Ton`,
      `${rec.plantWiseConsumption?.RICE_MILL ?? 0} Unit / ${rec.plantWiseConsumption?.RICE_MILL_PRODUCTION ?? 0} Ton`,

      // WBSEDCL
      rec.WBSEDCLConsumption?.PREP ?? 0,
      rec.WBSEDCLConsumption?.SOLVENT ?? 0,
      rec.WBSEDCLConsumption?.REFINERY ?? 0,
      rec.WBSEDCLConsumption?.DRYER ?? 0,
      rec.WBSEDCLConsumption?.NEW_PLANT ?? 0,
      rec.WBSEDCLConsumption?.OLD_PLANT ?? 0,
      rec.WBSEDCLConsumption?.BOILER ?? 0,
      rec.WBSEDCLConsumption?.PULVERIZER_MEGA ?? 0,
      rec.WBSEDCLConsumption?.PULVERIZER_OILS ?? 0,

      // SOLAR
      rec.SOLARConsumption?.PREP ?? 0,
      rec.SOLARConsumption?.SOLVENT ?? 0,
      rec.SOLARConsumption?.REFINERY ?? 0,
      rec.SOLARConsumption?.BOILER ?? 0,

      // COMPRESSOR
      // rec.COMPRESSORConsumption?.ELGI ?? 0,
      // rec.COMPRESSORConsumption?.KAISER1 ?? 0,
      // rec.COMPRESSORConsumption?.KAISER2 ?? 0,
      `${rec.COMPRESSORConsumption?.ELGI ?? 0} (W) / ${rec.COMPRESSORConsumption?.ELGI_SOLAR ?? 0} (S) / ${rec.COMPRESSORConsumption?.ELGI_RH ?? 0} Hrs`,
      `${rec.COMPRESSORConsumption?.KAESER1 ?? 0} (W) / ${rec.COMPRESSORConsumption?.KAESER1_SOLAR ?? 0} (S) / ${rec.COMPRESSORConsumption?.KAESER1_RH ?? 0} Hrs`,
      `${rec.COMPRESSORConsumption?.KAESER2 ?? 0} (W) / ${rec.COMPRESSORConsumption?.KAESER2_SOLAR ?? 0} (S) / ${rec.COMPRESSORConsumption?.KAESER2_RH ?? 0} Hrs`,
      rec.COMPRESSORConsumption?.REFINERY ?? 0,
      rec.COMPRESSORConsumption?.NEW_PLANT ?? 0,
      rec.COMPRESSORConsumption?.OLD_PLANT ?? 0,
      rec.COMPRESSORConsumption?.BOILER ?? 0,

      // 12 TON BOILER
      `${rec.Ton12BoilerConsumption?.UNIT ?? 0} / ${rec.Ton12BoilerConsumption?.UNIT_RH ?? 0} Hrs`,
      rec.Ton12BoilerConsumption?.STEAM ?? 0,
      rec.Ton12BoilerConsumption?.WATER ?? 0,
      rec.Ton12BoilerConsumption?.HUSK ?? 0,

      // 18 TON BOILER
      `${rec.Ton18BoilerConsumption?.UNIT ?? 0} / ${rec.Ton18BoilerConsumption?.UNIT_RH ?? 0} Hrs`,
      rec.Ton18BoilerConsumption?.STEAM ?? 0,
      rec.Ton18BoilerConsumption?.WATER ?? 0,
      rec.Ton18BoilerConsumption?.HUSK ?? 0,
    ]);

    // 🎨 Style data cells by group
    row.eachCell((cell, colNumber) => {
      let bg = colors.DATE.data;
      if (colNumber >= 2 && colNumber <= 5) bg = colors.POWER.data;
      else if (colNumber >= 6 && colNumber <= 9) bg = colors.TOTAL.data;
      else if (colNumber >= 10 && colNumber <= 12) bg = colors.PLANT.data;
      else if (colNumber >= 13 && colNumber <= 21) bg = colors.WBSEDCL.data;
      else if (colNumber >= 22 && colNumber <= 25) bg = colors.SOLAR.data;
      else if (colNumber >= 26 && colNumber <= 32) bg = colors.COMP.data;
      else if (colNumber >= 33 && colNumber <= 36) bg = colors.TON12.data;
      else if (colNumber >= 37 && colNumber <= 40) bg = colors.TON18.data;

      // 🔄 Alternate row background override
      if (index % 2 === 1) {
        bg = colors.ALT_ROW;
      }

      styleCell(cell, { bg });
    });
  });

  // ✅ Auto column widths
  ws.columns.forEach((col) => {
    col.width = 15;
  });

  // ✅ Freeze top 2 rows + first column
  ws.views = [{ state: "frozen", ySplit: 2, xSplit: 1 }];

  // ✅ Save Excel file
  const buf = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buf]), "Electric_Dashboard.xlsx");
};


return (
  <div
    className="min-h-screen p-4 md:p-6 overflow-x-auto dashboard-container"
    style={{
      backgroundColor: "#EAF5F8",
    }}
  >
    {/* ✅ Navbar */}
    <div className="flex items-start sm:items-center justify-between flex-wrap px-4 md:px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg rounded-lg mb-6 relative">
      {/* Heading (responsive alignment) */}
      <h1
        className="text-xl md:text-2xl font-bold text-white break-words max-w-[75%] 
        text-left md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:text-center"
      >
        Electricity Management System
      </h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 mt-2 sm:mt-0 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 shadow-lg hover:scale-105 transform transition duration-300 whitespace-nowrap ml-auto"
      >
        Logout
      </button>
    </div>

    {/* ✅ Responsive Row: PieChart + DateSelector + Table */}
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 mt-6 w-full">
      {/* 🟢 Pie Chart */}
      <div className="bg-white shadow-lg rounded-xl p-4 w-full md:w-[480px] lg:w-[510px] h-[350px] flex items-center justify-center">
        {chartData.length > 0 ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name} ${value}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(val) => `${val}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center">⚠️ No data available for pie chart</p>
        )}
      </div>

      {/* 🟡 Date Selector */}
      <div className="flex flex-col items-center justify-center w-full md:w-[600px] lg:w-[800px] h-auto bg-white rounded-xl shadow-lg border border-gray-200 p-4">
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 w-full text-white text-center font-semibold py-2 mb-5 rounded-t-xl">
          Select Date
        </div>
        <DateSelector
          onChange={(date) => {
            if (date?.value?.start && date?.value?.end) {
              const startDate = new Date(date.value.start);
              const endDate = new Date(date.value.end);
              if (!isNaN(startDate) && !isNaN(endDate)) {
                setSelectedDate({ startDate, endDate });
              }
            } else if (date?.value) {
              const singleDate = new Date(date.value);
              if (!isNaN(singleDate)) {
                setSelectedDate({
                  startDate: singleDate,
                  endDate: singleDate,
                });
              }
            } else if (date) {
              const singleDate = new Date(date);
              if (!isNaN(singleDate)) {
                setSelectedDate({
                  startDate: singleDate,
                  endDate: singleDate,
                });
              }
            } else {
              setSelectedDate(null);
            }
          }}
        />
      </div>

      {/* 🔵 WBSEDCL & SOLAR Table */}
      <div className="bg-white shadow-lg rounded-xl p-4 w-full md:w-[500px] lg:w-[550px] h-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
          <h2 className="text-lg font-semibold text-gray-800 text-center sm:text-left">
            WBSEDCL and SOLAR Consumption
          </h2>
          <select
            className="border rounded-lg px-2 py-1 text-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="solarHigh">High to Low (SOLAR)</option>
            <option value="solarLow">Low to High (SOLAR)</option>
            <option value="wbsedclHigh">High to Low (WBSEDCL)</option>
            <option value="wbsedclLow">Low to High (WBSEDCL)</option>
          </select>
        </div>

        <div className="max-h-60 overflow-y-auto scrollbar-hide">
          <table className="w-full border-collapse border border-gray-200 text-xs md:text-sm">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-center bg-cyan-200 text-gray-700">
                  Date
                </th>
                <th className="border border-gray-300 px-3 py-2 text-center bg-orange-200 text-gray-700">
                  WBSEDCL
                </th>
                <th className="border border-gray-300 px-3 py-2 text-center bg-yellow-200 text-gray-700">
                  SOLAR
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((record, idx) => (
                  <tr key={idx}>
                    <td
                      className={`border border-gray-300 px-3 py-2 text-center ${
                        idx % 2 === 0 ? "bg-cyan-50" : "bg-cyan-100"
                      }`}
                    >
                      {record.date ?? "N/A"}
                    </td>
                    <td
                      className={`border border-gray-300 px-3 py-2 text-center ${
                        idx % 2 === 0 ? "bg-orange-50" : "bg-orange-100"
                      }`}
                    >
                      {record.totalConsumption?.["WBSEDCL"] ?? 0}
                    </td>
                    <td
                      className={`border border-gray-300 px-3 py-2 text-center ${
                        idx % 2 === 0 ? "bg-yellow-50" : "bg-yellow-100"
                      }`}
                    >
                      {record.totalConsumption?.["SOLAR"] ?? 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-4 text-gray-500 text-sm"
                  >
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* ✅ Daily Report Section */}
    <div className="relative bg-white shadow-lg rounded-xl border border-gray-200 mt-8">
      {/* ✅ Header with responsive alignment */}
      <div className="flex items-start sm:items-center justify-between flex-wrap sticky top-0 right-0 z-30 bg-white px-6 md:px-16 py-4 rounded-t-xl relative">
        <h1
          className="text-xl md:text-2xl font-bold text-gray-800 break-words max-w-[75%] 
          text-left md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:text-center"
        >
          Daily Report
        </h1>
        <button
          onClick={handleExport}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 md:px-8 py-2 mt-2 sm:mt-0 rounded-lg flex items-center gap-2 shadow-md whitespace-nowrap ml-auto"
        >
          <Download className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* ✅ Cards Section (Date fixed inside same container) */}
      <div className="bg-white shadow-lg flex flex-start rounded-xl py-0 px-0 border border-gray-200 mb-0 overflow-x-scroll mt-0 space-x-6 relative">

        
        {/* Date Card (Sticky inside same div) */}
        <div className="bg-white shadow-lg rounded-xl p-6 min-w-[200px] mx-0 border border-gray-200 mb-0 mt-0 sticky left-0 z-20">
          <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#AEF5F8] text-center">
            Date
          </h2>
          <div className="mb-2 sticky top-12 bg-white z-10">
            <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
              DATE
            </label>
          </div>
          <div
            className={hiddenScrollbarClass}
            ref={(el) => (scrollRefs.current[0] = el)}
            onScroll={handleScroll}
          >
            {dashboardData.length > 0 ? (
              dashboardData.map((record, idx) => (
                <div key={idx} className="grid grid-cols-1 gap-4 mb-2">
                  <input
                    type="text"
                    value={record.date ?? "0"}
                    readOnly
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#EAFCFD]"
                  />
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 gap-4 mb-2">
                <input
                  type="text"
                  value="No Date Selected"
                  readOnly
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#EAFCFD]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Other Cards (Scroll Horizontally) */}

        {/* Power Generation Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 min-w-3xl mx-0 border border-gray-200 mb-0 mt-0">
          <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#B9FCA8] text-center">
            Power Generation
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2 sticky top-12 bg-white z-10">
            {["WBSEDCL", "SOLAR", "DG", "TOTAL"].map((label) => (
              <div key={label}>
                <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
                  {label}
                </label>
              </div>
            ))}
          </div>
          <div
            className={hiddenScrollbarClass}
            ref={(el) => (scrollRefs.current[1] = el)}
            onScroll={handleScroll}
          >
            {safeData.map((record, idx) => (
              <div
                key={idx}
                className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2"
              >
                {["WBSEDCL", "SOLAR", "DG", "TOTAL"].map((label) => {
                  const value = record.powerGeneration?.[label] ?? 0;
                  const rhValue = record.powerGeneration?.[`${label}_RH`] ?? 0;
                  return (
                    <div key={label}>
                      <input
                        type="text"
                        value={
                          ["WBSEDCL", "SOLAR", "DG"].includes(label)
                            ? `${value} / ${rhValue} Hrs`
                            : value
                        }
                        readOnly
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#ECFCED]"
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

      {/* Total Power Consumption Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 min-w-3xl mx-auto border border-gray-200 mb-0 mt-0">
          <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#F7E47B] text-center">
            Total Power Consumption
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2 sticky top-12 bg-white z-10">
            {["WBSEDCL", "SOLAR", "SOLAR_LOSS", "TOTAL"].map((label) => (
              <div key={label}>
                <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
                  {label}
                </label>
              </div>
            ))}
          </div>
          <div
            className={hiddenScrollbarClass}
            ref={(el) => (scrollRefs.current[2] = el)}
            onScroll={handleScroll}
          >
          {safeData.map((record, idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2"
            >
              {["WBSEDCL", "SOLAR", "SOLAR_LOSS", "TOTAL"].map((label) => {

                return (
                    <div key={label}>
                    <input
                      type="text"
                      value={record.totalConsumption?.[label] ?? 0}
                      readOnly
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#FAF5D5]"
                    />
                  </div>
                );
              })}
            </div>
          ))}
          </div>
        </div>

        {/* Plant Wise Consumption Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 min-w-6xl mx-auto border border-gray-200 mb-0 mt-0">
          <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#FECB7D] text-center">
            Plant Wise Consumption
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-4 mb-2 sticky top-12 bg-white z-10">
            {["PREP_SOLVENT", "REFINERY", "RICE_MILL"].map((label) => (
              <div key={label}>
                <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
                  {label}
                </label>
              </div>
            ))}
          </div>
          <div
            className={hiddenScrollbarClass}
            ref={(el) => (scrollRefs.current[3] = el)}
            onScroll={handleScroll}
          >
          {safeData.map((record, idx) => (
            <div
              key={idx}
              className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-4 mb-2"
            >
              {["PREP_SOLVENT", "REFINERY", "RICE_MILL"].map((label) => {
                const value = record.plantWiseConsumption?.[label] ?? 0;
                const rhValue = record.plantWiseConsumption?.[`${label}_PRODUCTION`] ?? 0;
                const ptValue = ((record.plantWiseConsumption?.[label])/(record.plantWiseConsumption?.[`${label}_PRODUCTION`])).toFixed(2) ?? 0;
                return (
                  <div key={label}>
                    <input
                      type="text"
                      value={
                        ["PREP_SOLVENT", "REFINERY", "RICE_MILL"].includes(label)
                          ? `${value} Unit / ${rhValue} Ton / ${ptValue} unit per Ton`
                          : value
                      }
                      readOnly
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#F9F0D8]"
                    />
                  </div>
                );
              })}
            </div>
          ))}
          </div>
        </div>

        {/* WBSEDCL Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 min-w-400 mx-auto border border-gray-200 mb-0 mt-0">
          <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#F8BDBD] text-center">
            WBSEDCL
          </h2>
          <div className="grid grid-cols-9 sm:grid-cols-9 md:grid-cols-9 gap-4 mb-2 sticky top-12 bg-white z-10">
            {[
              "PREP",
              "SOLVENT",
              "REFINERY",
              "DRYER",
              "NEW_PLANT",
              "OLD_PLANT",
              "BOILER",
              "PULVERIZER_MEGA",
              "PULVERIZER_OILS",
            ].map((label) => (
              <div key={label}>
                <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
                  {label}
                </label>
              </div>
            ))}
          </div>
          <div
            className={hiddenScrollbarClass}
            ref={(el) => (scrollRefs.current[4] = el)}
            onScroll={handleScroll}
          >
          {safeData.map((record, idx) => (
            <div
              key={idx}
              className="grid grid-cols-9 sm:grid-cols-9 md:grid-cols-9 gap-4 mb-2"
            >
              {[
                "PREP",
                "SOLVENT",
                "REFINERY",
                "DRYER",
                "NEW_PLANT",
                "OLD_PLANT",
                "BOILER",
                "PULVERIZER_MEGA",
                "PULVERIZER_OILS",
              ].map((label) => {
                return (
                <div key={label}>
                  <input
                    type="text"
                    value={record.WBSEDCLConsumption?.[label] ?? 0}
                    readOnly
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#F9EDED]"
                  />
                </div>
                );
              })}
            </div>
          ))}
          </div>
        </div>

        {/* SOLAR Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 min-w-2xl mx-auto border border-gray-200 mb-0 mt-0">
          <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#ADCFF8] text-center">
            SOLAR
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2 sticky top-12 bg-white z-10">
            {["PREP", "SOLVENT", "REFINERY", "BOILER"].map((label) => (
              <div key={label}>
                <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
                  {label}
                </label>
              </div>
            ))}
          </div>
          <div
            className={hiddenScrollbarClass}
            ref={(el) => (scrollRefs.current[5] = el)}
            onScroll={handleScroll}
          >
          {safeData.map((record, idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2"
            >
              {["PREP", "SOLVENT", "REFINERY", "BOILER"].map((label) => {
                return (
                <div key={label}>
                  <input
                    type="text"
                    value={record.SOLARConsumption?.[label] ?? 0}
                    readOnly
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#E9F3FB]"
                  />
                </div>
                );
              })}
            </div>
          ))}
          </div>
        </div>

        {/* COMPRESSOR Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 min-w-450 mx-auto border border-gray-200 mb-0 mt-0">
          <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#EDD3F8] text-center">
            COMPRESSOR
          </h2>
          <div className="grid grid-cols-7 sm:grid-cols-7 md:grid-cols-7 gap-4 mb-2 sticky top-12 bg-white z-10">
            {[
              "ELGI",
              "KAESER 1",
              "KAESER 2",
              "REFINERY",
              "NEW_PLANT",
              "OLD_PLANT",
              "BOILER",
            ].map((label) => (
              <div key={label}>
                <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
                  {label}
                </label>
              </div>
            ))}
          </div>
          <div
            className={hiddenScrollbarClass}
            ref={(el) => (scrollRefs.current[6] = el)}
            onScroll={handleScroll}
          >
          {safeData.map((record, idx) => (
            <div
              key={idx}
              className="grid grid-cols-7 sm:grid-cols-7 md:grid-cols-7 gap-4 mb-2"
            >
              {[
                "ELGI",
                "KAESER1",
                "KAESER2",
                "REFINERY",
                "NEW_PLANT",
                "OLD_PLANT",
                "BOILER",
              ].map((label) => {
                const value = record.COMPRESSORConsumption?.[label] ?? 0;
                const solarValue = record.COMPRESSORConsumption?.[`${label}_SOLAR`] ?? 0;
                const rhValue = record.COMPRESSORConsumption?.[`${label}_RH`] ?? 0;
                return (
                  <div key={label}>
                    <input
                      type="text"
                      value={
                        ["ELGI", "KAESER1", "KAESER2"].includes(label)
                          ? `${value} (W) / ${solarValue} (S) / ${rhValue} Hrs`
                          : value
                      }
                      readOnly
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#FFEDFD]"
                    />
                  </div>
                );
              })}
            </div>
          ))}
          </div>
        </div>

        {/* 12 TON BOILER Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 min-w-3xl mx-auto border border-gray-200 mb-0 mt-0">
          <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#CCC8FB] text-center">
            12 TON BOILER
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2 sticky top-12 bg-white z-10">
            {[
              "UNIT CONSUMPTION",
              "STEAM GENERATION",
              "WATER CONSUMPTION",
              "HUSK CONSUMPTION",
            ].map((label) => (
              <div key={label}>
                <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
                  {label}
                </label>
              </div>
            ))}
          </div>
          <div
            className={hiddenScrollbarClass}
            ref={(el) => (scrollRefs.current[7] = el)}
            onScroll={handleScroll}
          >
          {safeData.map((record, idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2"
            >
              {[
                "UNIT",
                "STEAM",
                "WATER",
                "HUSK",
              ].map((label) => {
                const value = record.Ton12BoilerConsumption?.[label] ?? 0;
                const rhValue = record.Ton12BoilerConsumption?.[`${label}_RH`] ?? 0;
                return (
                  <div key={label}>
                    <input
                      type="text"
                      value={
                        ["UNIT"].includes(label)
                          ? `${value} / ${rhValue} Hrs`
                          : value
                      }
                      readOnly
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#EDECFB]"
                    />
                  </div>
                );
              })}
            </div>
          ))}
          </div>
        </div>

        {/* 18 TON BOILER Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 min-w-3xl mx-auto border border-gray-200 mb-0 mt-0">
          <h2 className="text-lg font-semibold text-gray-800 py-2 rounded-t-lg sticky top-0 z-10 bg-[#F0BEEB] text-center">
            18 TON BOILER
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2 sticky top-12 bg-white z-10">
            {[
              "UNIT CONSUMPTION",
              "STEAM GENERATION",
              "WATER CONSUMPTION",
              "HUSK CONSUMPTION",
            ].map((label) => (
              <div key={label}>
                <label className="block text-sm font-bold text-gray-600 mb-1 text-center pt-4">
                  {label}
                </label>
              </div>
            ))}
          </div>
          <div
            className={hiddenScrollbarClass}
            ref={(el) => (scrollRefs.current[8] = el)}
            onScroll={handleScroll}
          >
          {safeData.map((record, idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-2"
            >
              {[
                "UNIT",
                "STEAM",
                "WATER",
                "HUSK",
              ].map((label) => {
                const value = record.Ton18BoilerConsumption?.[label] ?? 0;
                const rhValue = record.Ton18BoilerConsumption?.[`${label}_RH`] ?? 0;
                return (
                  <div key={label}>
                    <input
                      type="text"
                      value={
                        ["UNIT"].includes(label)
                          ? `${value} / ${rhValue} Hrs`
                          : value
                      }
                      readOnly
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed bg-[#FDEEFB]"
                    />
                  </div>
                );
              })}
            </div>
          ))}
          </div>
        </div>

        {/* 🔹 Your existing cards (Power Generation, Total Power Consumption, WBSEDCL, SOLAR, COMPRESSOR...) remain the same */}
        {/* Copy your existing card code here (from Power Generation downwards) */}
      </div>
    </div>

    {/* ✅ Scaling Styles */}
    <style>{`
      .scrollbar-hide {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }

      @media (max-width: 767px) {
        .dashboard-container {
          transform: scale(1);
          transform-origin: top left;
        }
      }
      @media (min-width: 768px) and (max-width: 1279px) {
        .dashboard-container {
          transform: scale(0.9);
          transform-origin: top left;
          width: 112%;
        }
      }
      @media (min-width: 1280px) {
        .dashboard-container {
          transform: scale(0.75);
          transform-origin: top left;
          width: 133.33%;
        }
      }
    `}</style>
  </div>
);
};

export default DashBoard;














