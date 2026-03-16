```javascript
/**
 * script.js — SmartHealth Core JS
 */

// CONFIG
const CONFIG = {
  API_BASE: "https://smart-health-backend-ohre.onrender.com/api",
  TOKEN_KEY: "sh_token",
  USER_KEY: "sh_user"
};


// AUTH STORAGE
const Auth = {
  setToken: (t) => localStorage.setItem(CONFIG.TOKEN_KEY, t),

  getToken: () => localStorage.getItem(CONFIG.TOKEN_KEY),

  setUser: (u) =>
    localStorage.setItem(CONFIG.USER_KEY, JSON.stringify(u)),

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


// API FETCH WRAPPER
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


// API METHODS
const API = {

  // AUTH
  login: (email, password) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    }).then(res => {
      if (res?.success && res.data?.token) {
        Auth.setToken(res.data.token);
        Auth.setUser(res.data);
      }
      return res;
    }),

  register: (payload) =>
    apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  // DOCTORS
  getDoctors: () => apiFetch("/doctors"),

  getDoctorById: (id) =>
    apiFetch(`/doctors/${id}`),

  getDoctorsBySpecialization: (specialization) =>
    apiFetch(`/doctors/specialization/${encodeURIComponent(specialization)}`),

  getAvailableDoctors: () =>
    apiFetch("/doctors/available"),

  // APPOINTMENTS
  getAppointments: () =>
    apiFetch("/appointments"),

  bookAppointment: (payload) =>
    apiFetch("/appointments", {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  updateAppointmentStatus: (id, status) =>
    apiFetch(`/appointments/${id}/status?status=${status}`, {
      method: "PUT"
    }),

  deleteAppointment: (id) =>
    apiFetch(`/appointments/${id}`, {
      method: "DELETE"
    }),

  // ADMIN (SAFE FALLBACK)
  getUsers: async () => {
    console.warn("Admin API not implemented yet");
    return [];
  },

  getAnalytics: async () => {
    console.warn("Analytics API not implemented yet");
    return {};
  }
};


// DASHBOARD TABS
function initTabs() {

  const links = document.querySelectorAll(".sidebar-link[data-tab]");

  links.forEach(link => {

    link.addEventListener("click", (e) => {

      e.preventDefault();

      const tab = link.dataset.tab;

      switchTab(tab);

    });

  });

}

function switchTab(tabId) {

  document.querySelectorAll(".dash-tab")
    .forEach(t => t.classList.remove("active"));

  document.querySelectorAll(".sidebar-link")
    .forEach(l => l.classList.remove("active"));

  const target = document.getElementById("tab-" + tabId);

  if (target) target.classList.add("active");

  const activeLink = document.querySelector(`.sidebar-link[data-tab="${tabId}"]`);

  if (activeLink) activeLink.classList.add("active");

}


// SIDEBAR TOGGLE
function initSidebarToggle() {

  const btn = document.getElementById("sidebarToggle");

  const sidebar = document.getElementById("sidebar");

  if (btn && sidebar) {

    btn.addEventListener("click", () => {

      sidebar.classList.toggle("open");

    });

  }

}


// LOGOUT
function initLogout() {

  const btn = document.getElementById("logoutBtn");

  if (btn) {

    btn.addEventListener("click", () => {

      Auth.clear();

      window.location.href = "login.html";

    });

  }

}


// USER INFO
function initUserInfo() {

  const user = Auth.getUser();

  if (!user) return;

  const nameEl = document.getElementById("userName");

  const avatarEl = document.getElementById("userAvatar");

  if (nameEl) {
    nameEl.textContent = user.fullName || user.email;
  }

  if (avatarEl) {
    avatarEl.textContent = (user.fullName || "U")[0].toUpperCase();
  }

}


// AUTH GUARD
function requireAuth(role) {

  if (!Auth.isLoggedIn()) {

    window.location.href = "login.html";

    return false;

  }

  const user = Auth.getUser();

  if (role && user?.role !== role) {

    window.location.href = "login.html";

    return false;

  }

  return true;

}


// DATE FORMAT
function fmtDate(dateStr) {

  if (!dateStr) return "-";

  return new Date(dateStr).toLocaleDateString("en-IN", {

    day: "2-digit",
    month: "short",
    year: "numeric"

  });

}


// INIT
document.addEventListener("DOMContentLoaded", () => {

  initTabs();

  initSidebarToggle();

  initLogout();

  initUserInfo();

});
```
