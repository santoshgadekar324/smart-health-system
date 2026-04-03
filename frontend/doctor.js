/**
 * ✅ FINAL CLEAN DOCTOR.JS
 * Full working, no duplicate, no error
 */

document.addEventListener("DOMContentLoaded", () => {

  requireAuth();

  loadDoctorProfile();
  loadAppointments();

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
async function loadAppointments() {

  try {

    const res = await API.getDoctorAppointments();

    const container = document.getElementById("doctorAppointments");

    if (!container || !res?.data) return;

    if (res.data.length === 0) {
      container.innerHTML = "<p>No appointments</p>";
      return;
    }

    container.innerHTML = res.data.map(a => `
      <div style="
        border:1px solid #ccc;
        padding:10px;
        margin-bottom:10px;
        border-radius:8px;
      ">
        <strong>Patient:</strong> ${a.patient?.fullName || "Unknown"} <br>
        <strong>Date:</strong> ${a.appointmentDate} <br>
        <strong>Time:</strong> ${a.appointmentTime} <br>
        <strong>Reason:</strong> ${a.reason || "-"}
      </div>
    `).join("");

  } catch (e) {
    console.log("Appointments load error");
  }

}


// =========================
// OPTIONAL: REFRESH BUTTON
// =========================
function refreshAppointments() {
  loadAppointments();
}
