import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://electric-backend-three.vercel.app/";

export const fetchElectricDashboard = async ({ date }) => {
  try {
    console.log("📥 [Frontend] Sending to API:", { date });

    const response = await axios.post(
      `${API_BASE_URL}/electric/dashboard`,
      { date }
    );

    console.log("✅ [Frontend] API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ [Frontend] API Error:", error);
    throw error;
  }
};
