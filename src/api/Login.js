// import axios from "axios";

// export const loginUser = async ({ username, password }) => {
//   try {
//     console.log("📥 [Frontend] Sending login data:", { username, password });

//     const response = await axios.post("http://localhost:5000/auth/login", {
//       username,
//       password,
//     });

//     console.log("✅ [Frontend] Login API Response:", response.data);

//     // If backend returns { success: true } or { token: "..." }
//     if (response.data?.success === true || response.data?.token) {
//       return true;
//     }

//     return false;
//   } catch (error) {
//     console.error("❌ [Frontend] Login API Error:", error);
//     return false; // in case of error, always return false
//   }
// };

import axios from "axios";

export const loginUser = async ({ username, password }) => {
  try {
    console.log("📥 [Frontend] Sending login data:", { username, password });

    const response = await axios.post("http://localhost:5000/auth/login", {
      username,
      password,
    });

    console.log("✅ [Frontend] Login API Response:", response.data);

    // Backend now returns response.data.role or "error"
    if (response.data?.success === "error") {
      return "error"; // return "error" for anything else
    } else {
      return response.data?.success; // return role if it's Admin or InputUser
    }
  } catch (error) {
    console.error("❌ [Frontend] Login API Error:", error);
    return "error"; // always return "error" on API failure
  }
};
