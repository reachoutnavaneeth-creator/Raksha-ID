/* =====================================================
   RAKSHA ID - DOCTOR DASHBOARD
   ===================================================== */


/* ================= PAGE LOAD ================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const doctorId =
            sessionStorage.getItem("doctorId");


        /*
         * Display Doctor ID if available.
         * Dashboard will still open even
         * when opened directly.
         */

        if (doctorId) {

            document
                .getElementById("doctorName")
                .textContent = doctorId;


            document
                .getElementById("welcomeDoctor")
                .textContent = doctorId;

        }

    }
);


/* ================= SEARCH PATIENT ================= */

function searchPatient() {

    const patientInput =
        document.getElementById("patientId");


    const result =
        document.getElementById("searchResult");


    const patientId =
        patientInput.value.trim();


    if (patientId === "") {

        result.textContent =
            "Please enter a Patient RAKSHA ID.";

        result.style.color =
            "#e5484d";

        return;

    }


    result.innerHTML =
        '<i class="fa-solid fa-circle-check"></i> ' +
        'Patient record found for ' +
        patientId;


    result.style.color =
        "#16834e";

}


/* ================= EMERGENCY CASES ================= */

function viewEmergencies() {

    alert(
        "Emergency Cases\n\n" +
        "Emergency management module will be connected here."
    );

}


/* ================= MEDICAL REPORTS ================= */

function viewReports() {

    alert(
        "Medical Reports\n\n" +
        "Medical reports module will be connected here."
    );

}


/* ================= PATIENT RECORDS ================= */

function openPatientRecords() {

    alert(
        "Patient Records\n\n" +
        "Patient records module will be connected here."
    );

}


/* ================= MEDICAL HISTORY ================= */

function openMedicalHistory() {

    alert(
        "Medical History\n\n" +
        "Medical history module will be connected here."
    );

}


/* ================= EMERGENCY NETWORK ================= */

function openEmergencyNetwork() {

    alert(
        "Emergency Network\n\n" +
        "Emergency network module will be connected here."
    );

}


/* ================= DOCTOR PROFILE ================= */

function openProfile() {

    alert(
        "Doctor Profile\n\n" +
        "Doctor profile module will be connected here."
    );

}


/* ================= LOGOUT ================= */

function logout() {

    sessionStorage.removeItem(
        "doctorId"
    );


    window.location.href =
        "../Home.html";

}