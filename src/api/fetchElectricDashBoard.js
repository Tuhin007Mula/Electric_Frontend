import axios from "axios";

export const fetchElectricDashboard = async ({ date }) => {
  try {
    console.log("📥 [Frontend] Sending to API:", { date });

    const response = await axios.post(
      "http://localhost:5000/electric/dashboard",
      { date }
    );

    console.log("✅ [Frontend] API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ [Frontend] API Error:", error);
    throw error;
  }
};
