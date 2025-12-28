export const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "https://cleanops-efficient-operations-for-clean.onrender.com/api"
    : "/api";

async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "API Error");
  }

  return response.json();
}

export const api = {
  get: (path) => apiFetch(path),

  post: (path, data) => {
    // ✅ HANDLE FormData PROPERLY
    if (data instanceof FormData) {
      return apiFetch(path, {
        method: "POST",
        body: data, // ❗ DO NOT stringify
      });
    }

    // normal JSON request
    return apiFetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  put: (path, data) =>
    apiFetch(path, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  delete: (path) =>
    apiFetch(path, {
      method: "DELETE",
    }),
};
