/*
 Smart Health System - FINAL CLEAN script.js
*/

const CONFIG = {
  API_BASE: "https://smart-health-backend-ohre.onrender.com/api",
  TOKEN_KEY: "sh_token",
  USER_KEY: "sh_user"
};

// =========================
// AUTH STORAGE
// =========================
const Auth = {

  setToken(token) {
    localStorage.setItem(CONFIG.TOKEN_KEY, token);
  },

  getToken() {
    return localStorage.getItem(CONFIG.TOKEN_KEY);
  },

  setUser(user) {
    localStorage.setItem(CONFIG.USER_KEY, JSON.stringify(user));
  },

  getUser() {
    const raw = localStorage.getItem(CONFIG.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  clear() {
    localStorage.removeItem(CONFIG.TOKEN_KEY);
    localStorage.removeItem(CONFIG.USER_KEY);
  },

  isLoggedIn() {
    return !!localStorage.getItem(CONFIG.TOKEN_KEY);
  }
};

// =========================
// API FETCH
// =========================
async function apiFetch(path, options = {}) {

  try {

    const token = Auth.getToken();

    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };

    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }

    const response = await fetch(CONFIG.API_BASE + path, {
      ...options,
      headers
    });

    if (response.status === 401) {
      Auth.clear();
      window.location.href = "login.html";
      return null;
    }

    if (!response.ok) {
      const text = await response.text();
      throw new Error("Server error: " + response.status + " " + text);
    }

    return await response.json();

  } catch (error) {
    console.error("🔥 API ERROR:", error);
    alert("⚠️ Backend slow / error");
    return null;
  }

}

// =========================
// API METHODS
// =========================
const API = {

  // LOGIN
  async login(email, password) {

    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    if (res && res.token) {

      Auth.setToken(res.token);

      Auth.setUser({
        email: res.email,
        role: res.role,
        fullName: res.name
      });

    }

    return res;

  },

  // REGISTER
  register(payload) {
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: payload.fullName,
        email: payload.email,
        password: payload.password,
        role: payload.role
      })
    });
  },

  // =========================
  // AI PREDICTION ✅ FIXED
  // =========================
 addSymptoms(symptoms, notes) {
  return apiFetch("/ai/predict", {
    method: "POST",
    body: JSON.stringify({
      symptoms: symptoms,
      notes: notes
    })
  });
},

  // =========================
  // DOCTORS
  // =========================
  getDoctors() {
    return apiFetch("/doctors");
  },

  getDoctorProfile() {
    return apiFetch("/doctors/profile");
  },

  // =========================
  // APPOINTMENTS
  // =========================
  getAppointments() {
    return apiFetch("/appointments");
  },

  getDoctorAppointments() {
    return apiFetch("/appointments/doctor");
  },

  bookAppointment(payload) {
    return apiFetch("/appointments", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  // =========================
  // ADMIN
  // =========================
  getAllUsers() {
    return apiFetch("/admin/users");
  },

  getAllDoctors() {
    return apiFetch("/admin/doctors");
  },

  getAllAppointments() {
    return apiFetch("/admin/appointments");
  }

};

// =========================
// LOGOUT
// =========================
function logout() {
  Auth.clear();
  window.location.href = "login.html";
}

// =========================
// AUTH GUARD
// =========================
function requireAuth() {
  if (!Auth.isLoggedIn()) {
    window.location.href = "login.html";
  }
}
