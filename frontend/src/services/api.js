import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({ baseURL: API_URL, timeout: 15000 });

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("kalapriya_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("kalapriya_token");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

// ── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  verify: () => api.get("/auth/verify"),
  logout: () => api.post("/auth/logout"),
};

// ── Gallery ──────────────────────────────────────────────────────────────────
export const galleryAPI = {
  getAll: (category) => api.get("/gallery", { params: category ? { category } : {} }),
  getStats: () => api.get("/gallery/stats"),
  upload: (formData) =>
    api.post("/gallery", formData, { headers: { "Content-Type": "multipart/form-data" } }),
  uploadByUrl: (data) => api.post("/gallery", data),
  update: (id, data) => api.patch(`/gallery/${id}`, data),
  delete: (id) => api.delete(`/gallery/${id}`),
};

// ── Enquiries ────────────────────────────────────────────────────────────────
export const enquiryAPI = {
  submit: (data) => api.post("/enquiries", data),
  getAll: (params) => api.get("/enquiries", { params }),
  update: (id, data) => api.patch(`/enquiries/${id}`, data),
  delete: (id) => api.delete(`/enquiries/${id}`),
};

export default api;
