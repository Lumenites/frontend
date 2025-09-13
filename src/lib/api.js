const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path, { method = "GET", body, token, headers } = {}) {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();
  if (!response.ok) {
    const message = isJson ? data?.message || "Request failed" : String(data || "Request failed");
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const api = {
  // Auth endpoints
  signup: (payload) => request("/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  me: (token) => request("/auth/me", { method: "GET", token }),
  updateProfile: (payload, token) => request("/auth/profile", { method: "PUT", body: payload, token }),
  
  // Dashboard endpoints
  getDashboardData: () => request("/dashboard/overview", { method: "GET" }),
  switchPlan: (payload) => request("/dashboard/switch-plan", { method: "POST", body: payload }),
  cancelSubscription: () => request("/dashboard/cancel-subscription", { method: "POST" }),
  applyOffer: (payload) => request("/dashboard/apply-offer", { method: "POST", body: payload }),
  dismissNotification: (notificationId) => request(`/dashboard/dismiss-notification/${notificationId}`, { method: "PUT" }),
  
  // Plans endpoints
  getPlans: () => request("/plans", { method: "GET" }),
  getPlan: (planId) => request(`/plans/${planId}`, { method: "GET" }),
  getRecommendedPlans: (token) => request("/plans/recommended", { method: "GET", token }),
};

export default API_BASE_URL;


