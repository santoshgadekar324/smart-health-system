const CONFIG = {
  API_BASE: "https://smart-health-backend-ohre.onrender.com/api",
  TOKEN_KEY: "sh_token",
  USER_KEY: "sh_user"
};

const Auth = {
  setToken: (t) => localStorage.setItem(CONFIG.TOKEN_KEY, t),
  getToken: () => localStorage.getItem(CONFIG.TOKEN_KEY),
  setUser: (u) => localStorage.setItem(CONFIG.USER_KEY, JSON.stringify(u)),
  getUser: () => {
    const raw = localStorage.getItem(CONFIG.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  clear: () => {
    localStorage.removeItem(CONFIG.TOKEN_KEY);
    localStorage.removeItem(CONFIG.USER_KEY);
  },
  isLoggedIn: () => !!localStorage.getItem(CONFIG.TOKEN_KEY)
};

async function apiFetch(path, options = {}) {

  const token = Auth.getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(CONFIG.API_BASE + path, {
    ...options,
    headers
  });

  if (res.status === 401) {
    Auth.clear();
    window.location.href = "login.html";
    return;
  }

  return res.json();
}

const API = {

  login: (email, password) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    }),

  register: (payload) =>
    apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  getDoctors: () => apiFetch("/doctors"),

  getDoctorById: (id) =>
    apiFetch(`/doctors/${id}`),

  getDoctorsBySpecialization: (s) =>
    apiFetch(`/doctors/specialization/${encodeURIComponent(s)}`),

  getAvailableDoctors: () =>
    apiFetch("/doctors/available"),

  getAppointments: () =>
    apiFetch("/appointments"),

  bookAppointment: (payload) =>
    apiFetch("/appointments", {
      method: "POST",
      body: JSON.stringify(payload)
    })
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("SmartHealth script loaded");
});
