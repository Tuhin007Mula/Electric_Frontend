const API_BASE = import.meta.env.VITE_API_URL || "https://electric-backend-ivory.vercel.app";

if (import.meta.env.MODE === "development") {
  console.log("🌐 API_BASE =", API_BASE);
}

/**
 * Generic API request helper
 * Handles JSON parsing, errors, and query params automatically.
 */
export async function apiRequest(endpoint, method = "GET", data = null, queryParams = "") {
  try {
    let url = `${API_BASE}${endpoint}`;

    // Append query params if provided
    if (queryParams) {
      url += queryParams.startsWith("?") ? queryParams : `?${queryParams}`;
    }

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Log the request data before sending
    if (data) {
      console.log("📤 Sending Data to Backend:", data);
      options.body = JSON.stringify(data);
    }

    // Log the full request info
    console.log(`🔗 API Request → [${method}] ${url}`);

    const response = await fetch(url, options);

    // Check if response is OK
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Request Failed [${method}] ${endpoint}:`, errorText);
      throw new Error(`HTTP ${response.status} - ${errorText}`);
    }

    // Handle empty responses (e.g., DELETE or 204 No Content)
    if (response.status === 204) {
      console.log("ℹ️ No content returned from API.");
      return null;
    }

    const result = await response.json();

    // Log the response received from backend
    console.log("✅ API Response:", result);

    return result;
  } catch (error) {
    console.error(`❌ API Error [${method}] ${endpoint}:`, error);
    throw error;
  }
}