// import React from "react";

// export default function LoginForm() {
//   return (
//     <div className="relative flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg20.webp')" }}>
//       {/* Overlay to reduce opacity */}
//       <div className="absolute inset-0 bg-black opacity-20"></div>

//       <div className="relative flex bg-white rounded-xl shadow-lg overflow-hidden w-[750px] md:w-[800px] lg:w-[900px] max-w-[95%] h-[450px] md:h-[420px] lg:h-[420px]">
//         {/* LEFT DESIGN (chevron blocks) */}
//         <div className="relative w-[45%] bg-white overflow-hidden">
//           <div className="absolute w-[180px] h-[180px] rotate-45 bg-[#c2f970] top-[-40px] left-[20px]"></div>
//           <div className="absolute w-[180px] h-[180px] rotate-45 bg-[#6bc97b] top-[40px] left-[100px]"></div>
//           <div className="absolute w-[180px] h-[180px] rotate-45 bg-[#f7d23e] top-[120px] left-[20px]"></div>
//           <div className="absolute w-[180px] h-[180px] rotate-45 bg-[#ff9900] top-[200px] left-[100px]"></div>
//           <div className="absolute w-[180px] h-[180px] rotate-45 bg-[#e85c1c] top-[280px] left-[20px]"></div>
//         </div>

//         {/* RIGHT FORM */}
//         <div className="flex-1 p-10 flex flex-col justify-center">
//           <h2 className="mb-5 text-[32px] font-bold text-left">User Login</h2>
//           <form>
//             <div className="flex items-center mb-4 bg-gray-100 rounded-md px-3 py-2">
//               <span className="mr-2 text-lg">👤</span>
//               <input
//                 type="text"
//                 placeholder="Username"
//                 className="flex-1 bg-transparent outline-none text-[15px]"
//               />
//             </div>
//             <div className="flex items-center mb-4 bg-gray-100 rounded-md px-3 py-2">
//               <span className="mr-2 text-lg">🔒</span>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="flex-1 bg-transparent outline-none text-[15px]"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-[#41a948] hover:bg-[#368f3c] text-white rounded-md py-3 text-[16px] w-full transition"
//             >
//               LOGIN
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import PgFormPage from "../../pages/PgFormPage";
import DashBoard from "../Dashboard/dashboard";
import { loginUser } from "../../api/Login"; // adjust path

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ track login state
  const [role, setRole] = useState("");

   useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear old errors

    const success = await loginUser({ username, password });

    if (success === "Admin") {
      console.log("✅ Logged in as Admin");
      setRole("Admin");
      setIsLoggedIn(true);
      localStorage.setItem("role", "Admin");  // ✅ persist
    } else if (success === "InputUser") {
      console.log("✅ Logged in as InputUser");
      setRole("InputUser");
      setIsLoggedIn(true);
      localStorage.setItem("role", "InputUser");  // ✅ persist
    } else {
      setError("Incorrect Username or Password");
    }
  };

  // ✅ If Admin logged in, show dashboard
  if (isLoggedIn && role === "Admin") {
    return <DashBoard />;
  }

  // ✅ If InputUser logged in, show PgFormPage
  if (isLoggedIn && role === "InputUser") {
    return <PgFormPage />;
  }

  return (
    <div
      className="relative flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg20.webp')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative flex bg-white rounded-xl shadow-lg overflow-hidden w-[750px] md:w-[800px] lg:w-[900px] max-w-[95%] h-[450px] md:h-[420px] lg:h-[420px]">
        {/* LEFT DESIGN */}
        <div className="relative w-[45%] bg-white overflow-hidden">
          <div className="absolute w-[180px] h-[180px] rotate-45 bg-[#c2f970] top-[-40px] left-[20px]"></div>
          <div className="absolute w-[180px] h-[180px] rotate-45 bg-[#6bc97b] top-[40px] left-[100px]"></div>
          <div className="absolute w-[180px] h-[180px] rotate-45 bg-[#f7d23e] top-[120px] left-[20px]"></div>
          <div className="absolute w-[180px] h-[180px] rotate-45 bg-[#ff9900] top-[200px] left-[100px]"></div>
          <div className="absolute w-[180px] h-[180px] rotate-45 bg-[#e85c1c] top-[280px] left-[20px]"></div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="mb-5 text-[32px] font-bold text-left">User Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center mb-4 bg-gray-100 rounded-md px-3 py-2">
              <span className="mr-2 text-lg">👤</span>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[15px]"
              />
            </div>
            <div className="flex items-center mb-4 bg-gray-100 rounded-md px-3 py-2">
              <span className="mr-2 text-lg">🔒</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[15px]"
              />
            </div>

            {/* ERROR MESSAGE */}
            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

            <button
              type="submit"
              className="bg-[#41a948] hover:bg-[#368f3c] text-white rounded-md py-3 text-[16px] w-full transition"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}