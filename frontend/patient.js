// =========================
// GLOBAL STATE
// =========================
const ALL_SYMPTOMS = [
  'Fever', 'Cough', 'Headache', 'Fatigue', 'Shortness of Breath',
  'Chest Pain', 'Nausea', 'Vomiting', 'Diarrhea', 'Stomach Pain',
  'Sore Throat', 'Runny Nose', 'Body Aches', 'Chills', 'Rash'
];

let selectedSymptoms = new Set();
let lastPrediction = null;


// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {

  requireAuth();

  buildSymptomGrid();
  loadDoctors();

  // min date today
  const dateInput = document.getElementById("apptDate");
  if (dateInput) {
    dateInput.min = new Date().toISOString().split("T")[0];
  }

});


// =========================
// SYMPTOM GRID
// =========================
function buildSymptomGrid() {

  const grid = document.getElementById("symptomGrid");

  grid.innerHTML = "";

  ALL_SYMPTOMS.forEach(sym => {

    grid.innerHTML += `
      <div class="symptom-chip" onclick="toggleSymptom(this, '${sym}')">
        ${sym}
      </div>
    `;

  });

}


// =========================
// TOGGLE SYMPTOM
// =========================
function toggleSymptom(el, symptom) {

  if (selectedSymptoms.has(symptom)) {
    selectedSymptoms.delete(symptom);
    el.classList.remove("selected");
  } else {
    selectedSymptoms.add(symptom);
    el.classList.add("selected");
  }

}


// =========================
// AI PREDICTION
// =========================
async function runPrediction() {

  if (selectedSymptoms.size === 0) {
    alert("❌ Select at least one symptom");
    return;
  }

  const notes = document.getElementById("symptomNotes").value;

  try {

    const res = await API.addSymptoms([...selectedSymptoms], notes);

    if (!res || !res.success) {
      alert("❌ Prediction failed");
      return;
    }

    lastPrediction = res.data;

    document.getElementById("prDisease").innerText =
      res.data.predictedDisease;

    document.getElementById("prConf").innerText =
      Math.round(res.data.confidence * 100) + "%";

    document.getElementById("prSpecialty").innerText =
      res.data.recommendedSpecialty;

    document.getElementById("predictionResult").classList.remove("d-none");

  } catch (e) {
    alert("❌ Server error");
  }

}


// =========================
// LOAD DOCTORS
// =========================
async function loadDoctors() {

  const select = document.getElementById("doctorSelect");

  if (!select) return;

  try {

    const res = await API.getDoctors();

    if (!res || !res.data) return;

    select.innerHTML = `<option value="">-- Select Doctor --</option>`;

    res.data.forEach(doc => {

      select.innerHTML += `
        <option value="${doc.id}">
          Dr. ${doc.user?.fullName || doc.name} (${doc.specialization})
        </option>
      `;

    });

  } catch (e) {
    console.log("Doctor load error");
  }

}


// =========================
// BOOK APPOINTMENT
// =========================
async function bookAppointment() {

  const doctorId = document.getElementById("doctorSelect").value;
  const date = document.getElementById("apptDate").value;
  const time = document.getElementById("apptTime").value;
  const reason = document.getElementById("apptReason").value;

  if (!doctorId) {
    alert("❌ Select doctor");
    return;
  }

  if (!date || !time) {
    alert("❌ Select date & time");
    return;
  }

  try {

    const res = await API.bookAppointment({
      doctorId: parseInt(doctorId),   // 🔥 IMPORTANT
      appointmentDate: date,
      appointmentTime: time + ":00",
      reason: reason,
      predictionId: lastPrediction?.predictionId || null
    });

    if (res && res.success) {
      alert("✅ Appointment Booked");
    } else {
      alert("❌ Failed");
    }

  } catch (e) {
    alert("❌ Server error");
  }

}


// =========================
// TAB SWITCH FIX
// =========================
document.querySelectorAll(".sidebar-link").forEach(link => {

  link.addEventListener("click", function(e) {

    e.preventDefault();

    document.querySelectorAll(".sidebar-link").forEach(l =>
      l.classList.remove("active")
    );

    this.classList.add("active");

    document.querySelectorAll(".dash-tab").forEach(tab =>
      tab.classList.remove("active")
    );

    const tabName = this.getAttribute("data-tab");
    document.getElementById("tab-" + tabName).classList.add("active");

  });

});
