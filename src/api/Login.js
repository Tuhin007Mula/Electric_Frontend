// import axios from "axios";

// export const loginUser = async ({ username, password }) => {
//   try {
//     console.log("📥 [Frontend] Sending login data:", { username, password });

//     const response = await axios.post("http://localhost:5000/auth/login", {
//       username,
//       password,
//     });

//     console.log("✅ [Frontend] Login API Response:", response.data);

//     // Backend now returns response.data.role or "error"
//     if (response.data?.success === "error") {
//       return "error"; // return "error" for anything else
//     } else {
//       return response.data?.success; // return role if it's Admin or InputUser
//     }
//   } catch (error) {
//     console.error("❌ [Frontend] Login API Error:", error);
//     return "error"; // always return "error" on API failure
//   }
// };

import axios from "axios";

// ✅ Use environment variable from Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://electric-backend-three.vercel.app/";

export const loginUser = async ({ username, password }) => {
  try {
    console.log("📥 [Frontend] Sending login data:", { username, password });

    // ✅ Dynamic backend URL
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });

    console.log("✅ [Frontend] Login API Response:", response.data);

    // ✅ Handle backend response
    if (response.data?.success === "error") {
      return "error"; // invalid credentials or server error
    } else {
      return response.data?.success; // e.g. "Admin" or "InputUser"
    }
  } catch (error) {
    console.error("❌ [Frontend] Login API Error:", error.message);
    return "error"; // always return "error" on API failure
  }
};
