const API_BASE = "/api";



export async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || data || "Something went wrong");
  }

  return data;
}

export const authApi = {
  me: () => apiRequest("/auth/me"),
  signup: (body) =>
    apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  login: (body) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  logout: () =>
    apiRequest("/auth/logout", {
      method: "POST",
    }),
  onboard: (body) =>
    apiRequest("/auth/onboard", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};

export const userApi = {
  recommended: () => apiRequest("/users"),
  friends: () => apiRequest("/users/friends"),
  requests: () => apiRequest("/users/Friend-requests"),
  sendRequest: (id) =>
    apiRequest(`/users/Friend-requests/${id}`, {
      method: "POST",
    }),
  acceptRequest: (id) =>
    apiRequest(`/users/Friend-requests/${id}/accept`, {
      method: "PUT",
    }),
};

 export const chatApi = {
  token: () => apiRequest("/chat/token"),
};

export const videoApi = {
  token: () => apiRequest("/video/token"),
};