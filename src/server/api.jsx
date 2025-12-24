export const API_BASE_URL =
  "https://cleanops-efficient-operations-for-clean.onrender.com/api";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  // ✅ Add Content-Type ONLY if body exists
  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

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

  post: (path, data) =>
    apiFetch(path, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: (path, data) =>
    apiFetch(path, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (path) =>
    apiFetch(path, {
      method: "DELETE",
    }),
};
