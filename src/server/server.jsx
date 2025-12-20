export const API_BASE_URL =
  "https://cleanops-efficient-operations-for-clean.onrender.com/api";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API Error (${response.status}): ${errorText || "Something went wrong"}`
    );
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

// 👉 Login API
export function loginUser({ email, password }) {
  return api.post("/auth/login", { email, password });
}

// 👉 Register API
export function registerUser({ name, email, password, phone, role, ward }) {
  return api.post("/auth/register", {
    name,
    email,
    password,
    phone,
    role,
    ward,
  });
}
