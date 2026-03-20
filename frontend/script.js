
/*
 Smart Health System - script.js
 Clean version for backend integration
*/

const CONFIG = {
  API_BASE: "https://smart-health-backend-ohre.onrender.com/api",
  TOKEN_KEY: "sh_token",
  USER_KEY: "sh_user"
};


/* =========================
   AUTH STORAGE
========================= */

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


/* =========================
   API FETCH
========================= */
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

    // ❗ Unauthorized
    if (response.status === 401) {
      Auth.clear();
      window.location.href = "login.html";
      return null;
    }

    // ❗ Backend down / error
    if (!response.ok) {
      const text = await response.text();
      throw new Error("Server error: " + response.status + " " + text);
    }

    // ❗ Safe JSON parse
    const data = await response.json();

    return data;

  } catch (error) {

    console.error("🔥 API ERROR:", error);

    alert("⚠️ Backend sleeping / slow.\nWait 20 sec and refresh.");

    return null;
  }

}

/* =========================
   API METHODS
========================= */

const API = {

  /* LOGIN */
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
        fullName: res.fullName
      });

    }

    return res;

  },


  /* REGISTER */
  register(payload) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name: payload.fullName, // ✅ FIXED
      email: payload.email,
      password: payload.password,
      role: payload.role.toUpperCase(),
      phone: payload.phone || "",
      gender: payload.gender || ""
    })
  });
}
  /* DOCTORS */

  getDoctors() {
    return apiFetch("/doctors");
  },

  getDoctorById(id) {
    return apiFetch(`/doctors/${id}`);
  },

  getDoctorsBySpecialization(spec) {
    return apiFetch(`/doctors/specialization/${encodeURIComponent(spec)}`);
  },

  getAvailableDoctors() {
    return apiFetch("/doctors/available");
  },


  /* APPOINTMENTS */

  getAppointments() {
    return apiFetch("/appointments");
  },

  bookAppointment(payload) {
    return apiFetch("/appointments", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

};


/* =========================
   LOGOUT
========================= */

function logout() {

  Auth.clear();

  window.location.href = "login.html";

}


/* =========================
   AUTH GUARD
========================= */

function requireAuth() {

  if (!Auth.isLoggedIn()) {

    window.location.href = "login.html";

  }

}


/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {

  console.log("Smart Health System loaded");

});
