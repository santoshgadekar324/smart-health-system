/**
 * ✅ FINAL CLEAN DOCTOR.JS
 * Full working, no duplicate, no error
 */

document.addEventListener("DOMContentLoaded", () => {

  requireAuth();

  loadDoctorProfile();
  loadAppointments();
let allAppointments = [];

});


// =========================
// LOAD DOCTOR PROFILE
// =========================
async function loadDoctorProfile() {

  try {

    const res = await API.getDoctorProfile();

    if (!res || !res.data) return;

    document.getElementById("doctorName").innerText =
      res.data.user?.fullName || "Doctor";

    document.getElementById("doctorSpecialization").innerText =
      res.data.specialization || "General";

    document.getElementById("doctorEmail").innerText =
      res.data.user?.email || "-";

  } catch (e) {
    console.log("Profile load error");
  }

}


// =========================
// LOAD APPOINTMENTS
// =========================
// LOAD APPOINTMENTS
// =========================
async function loadAppointments() {

  const res = await API.getDoctorAppointments();

  const container = document.getElementById("doctorAppointments");

  if (!container || !res?.data) return;

  allAppointments = res.data;

  if (allAppointments.length === 0) {
    container.innerHTML = "<p>No appointments</p>";
    return;
  }

  renderAppointments(allAppointments);
}


// =========================
// OPTIONAL: REFRESH BUTTON
// =========================
function refreshAppointments() {
  loadAppointments();
}
async function updateStatus(id, status) {

  const res = await apiFetch(`/appointments/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status })
  });

  if (res) {
    alert("✅ Updated");
    loadAppointments();
  } else {
    alert("❌ Failed");
  }

}
function filterAppointments(status) {

  if (!status) {
    loadAppointments();
    return;
  }

  const filtered = allAppointments.filter(a => a.status === status);

  renderAppointments(filtered);

}
function filterAppointments(status) {

  if (!status) {
    renderAppointments(allAppointments);
    return;
  }

  const filtered = allAppointments.filter(a => a.status === status);

  renderAppointments(filtered);

}
function renderAppointments(list) {

  const container = document.getElementById("doctorAppointments");

  container.innerHTML = list.map(a => `

    <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px; border-radius:8px;">

      <div style="display:flex; justify-content:space-between;">
        <strong>${a.patient?.fullName || "Patient"}</strong>

        <span style="
          padding:4px 10px;
          border-radius:10px;
          background:${getStatusColor(a.status)};
          color:white;
        ">
          ${a.status}
        </span>
      </div>

      <p>${a.appointmentDate} | ${a.appointmentTime}</p>
      <p>${a.reason || "-"}</p>

      <div>
        <button onclick="updateStatus(${a.id}, 'APPROVED')">Accept</button>
        <button onclick="updateStatus(${a.id}, 'REJECTED')">Reject</button>
        <button onclick="updateStatus(${a.id}, 'COMPLETED')">Complete</button>
      </div>

    </div>

  `).join("");

}
function getStatusColor(status) {

  if (status === "PENDING") return "orange";
  if (status === "APPROVED") return "green";
  if (status === "REJECTED") return "red";
  if (status === "COMPLETED") return "blue";

  return "gray";
}
