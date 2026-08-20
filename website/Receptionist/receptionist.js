/* =========================================================
   RAKSHA ID - RECEPTIONIST DASHBOARD
   COMPLETE REPLACEMENT VERSION
   ========================================================= */


/* =========================================================
   DEFAULT DATA
   ========================================================= */

const defaultCapacity = {
    bedsTotal: 20,
    bedsAvailable: 12,
    icuTotal: 10,
    icuAvailable: 5,
    ventTotal: 8,
    ventAvailable: 4
};


const defaultDoctors = [
    {
        id: "DOC001",
        name: "Dr. Emergency Kumar",
        specialization: "Emergency Medicine",
        status: "Available"
    },
    {
        id: "DOC002",
        name: "Dr. Priya Sharma",
        specialization: "Cardiology",
        status: "Available"
    },
    {
        id: "DOC003",
        name: "Dr. Rahul Verma",
        specialization: "Trauma Surgery",
        status: "Available"
    },
    {
        id: "DOC004",
        name: "Dr. Ananya Rao",
        specialization: "Neurology",
        status: "Available"
    },
    {
        id: "DOC005",
        name: "Dr. Arjun Singh",
        specialization: "Critical Care",
        status: "Busy"
    }
];


const defaultEmergencies = [
    {
        id: "ER001",
        patient: "Rahul Mehta",
        type: "Road Accident",
        priority: "High",
        location: "MG Road",
        blood: "O+",
        allergies: "None",
        contact: "9876543210",
        status: "Pending",
        time: new Date().toLocaleTimeString()
    },
    {
        id: "ER002",
        patient: "Sneha Patel",
        type: "Cardiac Emergency",
        priority: "High",
        location: "Sector 12",
        blood: "A+",
        allergies: "Penicillin",
        contact: "9876501234",
        status: "Accepted",
        time: new Date().toLocaleTimeString()
    },
    {
        id: "ER003",
        patient: "Amit Kumar",
        type: "Breathing Difficulty",
        priority: "Medium",
        location: "Station Road",
        blood: "B+",
        allergies: "None",
        contact: "9988776655",
        status: "Pending",
        time: new Date().toLocaleTimeString()
    }
];


const defaultAmbulances = [
    {
        id: "AMB001",
        patient: "Rahul Mehta",
        location: "MG Road",
        eta: 8,
        progress: 60,
        status: "En Route"
    },
    {
        id: "AMB002",
        patient: "Sneha Patel",
        location: "Sector 12",
        eta: 3,
        progress: 85,
        status: "En Route"
    }
];


const defaultNotifications = [
    {
        title: "Emergency System Ready",
        message: "Receptionist dashboard is active.",
        time: new Date().toLocaleTimeString()
    },
    {
        title: "Hospital Capacity",
        message: "Emergency beds are available.",
        time: new Date().toLocaleTimeString()
    }
];


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function getData(key, fallback) {

    const saved = localStorage.getItem(key);

    if (saved !== null) {

        try {

            const parsed = JSON.parse(saved);

            return parsed;

        }

        catch (error) {

            console.error(
                "Error reading localStorage:",
                key,
                error
            );

            return fallback;

        }

    }

    localStorage.setItem(
        key,
        JSON.stringify(fallback)
    );

    return fallback;
}


function saveData(key, data) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    }

    catch (error) {

        console.error(
            "Error saving localStorage:",
            key,
            error
        );

    }

}


/* =========================================================
   DATA
   ========================================================= */

let capacity =
    getData(
        "rakshaReceptionistCapacity",
        defaultCapacity
    );


let emergencies =
    getData(
        "rakshaReceptionistEmergencies",
        defaultEmergencies
    );


let ambulances =
    getData(
        "rakshaReceptionistAmbulances",
        defaultAmbulances
    );


let notifications =
    getData(
        "rakshaReceptionistNotifications",
        defaultNotifications
    );


let doctors =
    getData(
        "rakshaReceptionistDoctors",
        defaultDoctors
    );


let hospitalAccepting =
    localStorage.getItem(
        "rakshaHospitalAccepting"
    );


if (hospitalAccepting === null) {

    hospitalAccepting = true;

}

else {

    hospitalAccepting =
        hospitalAccepting === "true";

}


/* =========================================================
   SESSION
   ========================================================= */

function loadReceptionistSession() {

    const receptionistId =
        sessionStorage.getItem(
            "receptionistId"
        );


    const receptionistName =
        sessionStorage.getItem(
            "receptionistName"
        );


    const nameElement =
        document.getElementById(
            "receptionistName"
        );


    const idElement =
        document.getElementById(
            "receptionistId"
        );


    if (idElement) {

        if (receptionistId) {

            idElement.textContent =
                "ID: " + receptionistId;

        }

        else {

            idElement.textContent =
                "ID: Guest";

        }

    }


    if (nameElement) {

        if (receptionistName) {

            nameElement.textContent =
                receptionistName;

        }

        else {

            nameElement.textContent =
                "Receptionist";

        }

    }

}


/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {

    const clock =
        document.getElementById(
            "liveClock"
        );


    if (!clock) {
        return;
    }


    const now =
        new Date();


    clock.textContent =
        now.toLocaleTimeString();

}


setInterval(
    updateClock,
    1000
);


/* =========================================================
   NAVIGATION
   ========================================================= */

function showSection(
    sectionId,
    button = null
) {

    const sections =
        document.querySelectorAll(
            ".page-section"
        );


    sections.forEach(
        section => {

            section.classList.remove(
                "active"
            );

        }
    );


    const target =
        document.getElementById(
            sectionId
        );


    if (target) {

        target.classList.add(
            "active"
        );

    }


    const buttons =
        document.querySelectorAll(
            ".nav-item"
        );


    buttons.forEach(
        item => {

            item.classList.remove(
                "active"
            );

        }
    );


    if (button) {

        button.classList.add(
            "active"
        );

    }


    switch (sectionId) {

        case "overview":
            renderOverview();
            break;

        case "emergency":
            renderEmergencyTable();
            break;

        case "ambulance":
            renderAmbulances();
            break;

        case "capacity":
            renderCapacity();
            break;

        case "doctors":
            renderDoctors();
            break;

        case "patients":
            renderPatientQueue();
            break;

        case "records":
            renderRecords();
            break;

        case "sos":
            renderSOS();
            break;

    }

}


function showSectionById(sectionId) {

    const buttons =
        document.querySelectorAll(
            ".nav-item"
        );


    let selectedButton = null;


    buttons.forEach(
        button => {

            const onclick =
                button.getAttribute(
                    "onclick"
                );


            if (
                onclick &&
                onclick.includes(
                    "'" + sectionId + "'"
                )
            ) {

                selectedButton =
                    button;

            }

        }
    );


    showSection(
        sectionId,
        selectedButton
    );

}


/* =========================================================
   HOSPITAL STATUS
   ========================================================= */

function updateHospitalStatusUI() {

    const text =
        document.getElementById(
            "hospitalStatusText"
        );


    const button =
        document.getElementById(
            "hospitalStatusButton"
        );


    if (!text || !button) {
        return;
    }


    if (hospitalAccepting) {

        text.textContent =
            "Accepting Emergency Cases";


        button.className =
            "status-toggle accepting";


        button.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> ACCEPTING';

    }

    else {

        text.textContent =
            "Not Accepting Emergency Cases";


        button.className =
            "status-toggle closed";


        button.innerHTML =
            '<i class="fa-solid fa-circle-xmark"></i> NOT ACCEPTING';

    }

}


function toggleHospitalStatus() {

    hospitalAccepting =
        !hospitalAccepting;


    localStorage.setItem(
        "rakshaHospitalAccepting",
        hospitalAccepting
    );


    updateHospitalStatusUI();


    addNotification(
        "Hospital Status Updated",
        hospitalAccepting
            ? "Hospital is now accepting emergency cases."
            : "Hospital is not accepting emergency cases."
    );

}


/* =========================================================
   OVERVIEW
   ========================================================= */

function renderOverview() {

    updateHospitalStatusUI();

    updateStats();

    renderOverviewEmergency();

}


function updateStats() {

    const active =
        emergencies.filter(
            item =>
                item.status !== "Completed"
        ).length;


    const activeEmergencyCount =
        document.getElementById(
            "activeEmergencyCount"
        );


    const ambulanceCount =
        document.getElementById(
            "ambulanceCount"
        );


    const bedCount =
        document.getElementById(
            "bedCount"
        );


    const doctorCount =
        document.getElementById(
            "doctorCount"
        );


    if (activeEmergencyCount) {

        activeEmergencyCount.textContent =
            active;

    }


    if (ambulanceCount) {

        ambulanceCount.textContent =
            ambulances.length;

    }


    if (bedCount) {

        bedCount.textContent =
            capacity.bedsAvailable;

    }


    if (doctorCount) {

        doctorCount.textContent =
            doctors.filter(
                doctor =>
                    doctor.status === "Available"
            ).length;

    }

}


function renderOverviewEmergency() {

    const table =
        document.getElementById(
            "overviewEmergencyTable"
        );


    if (!table) {
        return;
    }


    if (!emergencies.length) {

        table.innerHTML =
            `
            <tr>
                <td colspan="5" class="empty-row">
                    No emergency requests
                </td>
            </tr>
            `;

        return;

    }


    table.innerHTML =
        emergencies
            .slice()
            .reverse()
            .slice(0, 5)
            .map(
                item => {

                    return `
                        <tr>

                            <td>
                                <strong>
                                    ${escapeHTML(item.patient)}
                                </strong>
                            </td>

                            <td>
                                ${escapeHTML(item.type)}
                            </td>

                            <td>
                                <span class="priority-badge ${getSafeClass(item.priority)}">
                                    ${escapeHTML(item.priority)}
                                </span>
                            </td>

                            <td>
                                <span class="status-badge ${getSafeClass(item.status)}">
                                    ${escapeHTML(item.status)}
                                </span>
                            </td>

                            <td>
                                ${escapeHTML(item.time)}
                            </td>

                        </tr>
                    `;

                }
            )
            .join("");

}


/* =========================================================
   EMERGENCY TABLE
   ========================================================= */

function renderEmergencyTable() {

    const table =
        document.getElementById(
            "emergencyTable"
        );


    if (!table) {
        return;
    }


    updatePriorityCounts();


    if (!emergencies.length) {

        table.innerHTML =
            `
            <tr>
                <td colspan="8" class="empty-row">
                    No emergency requests
                </td>
            </tr>
            `;

        return;

    }


    table.innerHTML =
        emergencies
            .slice()
            .reverse()
            .map(
                item => {

                    return `
                        <tr>

                            <td>
                                <strong>
                                    ${escapeHTML(item.id)}
                                </strong>
                            </td>

                            <td>
                                ${escapeHTML(item.patient)}
                            </td>

                            <td>
                                ${escapeHTML(item.type)}
                            </td>

                            <td>
                                <span class="priority-badge ${getSafeClass(item.priority)}">
                                    ${escapeHTML(item.priority)}
                                </span>
                            </td>

                            <td>
                                ${escapeHTML(item.location)}
                            </td>

                            <td>
                                ${escapeHTML(item.time)}
                            </td>

                            <td>
                                <span class="status-badge ${getSafeClass(item.status)}">
                                    ${escapeHTML(item.status)}
                                </span>
                            </td>

                            <td>

                                ${
                                    item.status === "Pending"

                                    ?

                                    `
                                    <button
                                        class="accept-btn"
                                        type="button"
                                        onclick="acceptEmergency('${escapeHTML(item.id)}')">

                                        <i class="fa-solid fa-check"></i>

                                        Accept

                                    </button>
                                    `

                                    :

                                    `
                                    <button
                                        class="accept-btn"
                                        type="button"
                                        onclick="viewPatient('${escapeHTML(item.id)}')">

                                        <i class="fa-solid fa-eye"></i>

                                        View

                                    </button>
                                    `
                                }

                            </td>

                        </tr>
                    `;

                }
            )
            .join("");

}


function updatePriorityCounts() {

    const highCount =
        document.getElementById(
            "highCount"
        );


    const mediumCount =
        document.getElementById(
            "mediumCount"
        );


    const lowCount =
        document.getElementById(
            "lowCount"
        );


    if (highCount) {

        highCount.textContent =
            emergencies.filter(
                item =>
                    item.priority === "High"
            ).length;

    }


    if (mediumCount) {

        mediumCount.textContent =
            emergencies.filter(
                item =>
                    item.priority === "Medium"
            ).length;

    }


    if (lowCount) {

        lowCount.textContent =
            emergencies.filter(
                item =>
                    item.priority === "Low"
            ).length;

    }

}


/* =========================================================
   ADD EMERGENCY
   ========================================================= */

function openEmergencyModal() {

    const modal =
        document.getElementById(
            "emergencyModal"
        );


    if (modal) {

        modal.classList.add(
            "active"
        );

    }

}


function addEmergency(event) {

    event.preventDefault();


    const patientElement =
        document.getElementById(
            "emergencyPatient"
        );


    const typeElement =
        document.getElementById(
            "emergencyType"
        );


    const priorityElement =
        document.getElementById(
            "emergencyPriority"
        );


    const locationElement =
        document.getElementById(
            "emergencyLocation"
        );


    const bloodElement =
        document.getElementById(
            "emergencyBlood"
        );


    const allergiesElement =
        document.getElementById(
            "emergencyAllergies"
        );


    const contactElement =
        document.getElementById(
            "emergencyContact"
        );


    if (
        !patientElement ||
        !typeElement ||
        !priorityElement ||
        !locationElement ||
        !bloodElement ||
        !contactElement
    ) {

        alert(
            "Emergency form fields are missing."
        );

        return;

    }


    const patient =
        patientElement.value.trim();


    const type =
        typeElement.value.trim();


    const priority =
        priorityElement.value;


    const location =
        locationElement.value.trim();


    const blood =
        bloodElement.value;


    const allergies =
        allergiesElement
            ? allergiesElement.value.trim() || "None"
            : "None";


    const contact =
        contactElement.value.trim();


    if (!patient || !type || !location || !contact) {

        alert(
            "Please fill all required emergency details."
        );

        return;

    }


    const newEmergency = {

        id:
            "ER" +
            String(
                Date.now()
            ).slice(-6),

        patient,

        type,

        priority,

        location,

        blood,

        allergies,

        contact,

        status: "Pending",

        time:
            new Date().toLocaleTimeString()

    };


    emergencies.push(
        newEmergency
    );


    saveData(
        "rakshaReceptionistEmergencies",
        emergencies
    );


    addNotification(
        "New Emergency Request",
        `${patient} - ${type} - ${priority} priority`
    );


    closeModal(
        "emergencyModal"
    );


    if (
        event.target &&
        typeof event.target.reset === "function"
    ) {

        event.target.reset();

    }


    renderAll();


    alert(
        "Emergency request added successfully."
    );

}


/* =========================================================
   ACCEPT EMERGENCY
   ========================================================= */

function acceptEmergency(id) {

    const emergency =
        emergencies.find(
            item =>
                item.id === id
        );


    if (!emergency) {

        alert(
            "Emergency request not found."
        );

        return;

    }


    emergency.status =
        "Accepted";


    saveData(
        "rakshaReceptionistEmergencies",
        emergencies
    );


    addNotification(
        "Emergency Accepted",
        `${emergency.patient}'s emergency request has been accepted.`
    );


    renderAll();


    alert(
        "Emergency request accepted."
    );

}


/* =========================================================
   PATIENT VIEW
   ========================================================= */

function viewPatient(id) {

    const patient =
        emergencies.find(
            item =>
                item.id === id
        );


    if (!patient) {
        return;
    }


    alert(
        "PATIENT DETAILS\n\n" +

        "Patient: " +
        patient.patient +

        "\nEmergency: " +
        patient.type +

        "\nPriority: " +
        patient.priority +

        "\nBlood Group: " +
        patient.blood +

        "\nAllergies: " +
        patient.allergies +

        "\nEmergency Contact: " +
        patient.contact +

        "\nLocation: " +
        patient.location +

        "\nStatus: " +
        patient.status
    );

}


/* =========================================================
   AMBULANCE
   ========================================================= */

function openAmbulanceModal() {

    const modal =
        document.getElementById(
            "ambulanceModal"
        );


    if (modal) {

        modal.classList.add(
            "active"
        );

    }

}


function dispatchAmbulance(event) {

    event.preventDefault();


    const patientElement =
        document.getElementById(
            "ambulancePatient"
        );


    const locationElement =
        document.getElementById(
            "ambulanceLocation"
        );


    const etaElement =
        document.getElementById(
            "ambulanceETA"
        );


    if (
        !patientElement ||
        !locationElement ||
        !etaElement
    ) {

        alert(
            "Ambulance form fields are missing."
        );

        return;

    }


    const patient =
        patientElement.value.trim();


    const location =
        locationElement.value.trim();


    const eta =
        Number(
            etaElement.value
        );


    if (
        !patient ||
        !location ||
        !eta ||
        eta <= 0
    ) {

        alert(
            "Please enter valid ambulance details."
        );

        return;

    }


    const ambulance = {

        id:
            "AMB" +
            String(
                Date.now()
            ).slice(-6),

        patient,

        location,

        eta,

        progress: 10,

        status: "Dispatched"

    };


    ambulances.push(
        ambulance
    );


    saveData(
        "rakshaReceptionistAmbulances",
        ambulances
    );


    addNotification(
        "Ambulance Dispatched",
        `Ambulance dispatched for ${patient}. ETA ${eta} minutes.`
    );


    closeModal(
        "ambulanceModal"
    );


    if (
        event.target &&
        typeof event.target.reset === "function"
    ) {

        event.target.reset();

    }


    renderAll();


    alert(
        "Ambulance dispatched successfully."
    );

}


function renderAmbulances() {

    const container =
        document.getElementById(
            "ambulanceContainer"
        );


    if (!container) {
        return;
    }


    if (!ambulances.length) {

        container.innerHTML =
            `
            <div class="ambulance-card">

                <h3>
                    No Active Ambulances
                </h3>

                <p>
                    No ambulance is currently dispatched.
                </p>

            </div>
            `;

        return;

    }


    container.innerHTML =
        ambulances
            .map(
                item => {

                    return `

                        <div class="ambulance-card">

                            <div class="ambulance-card-header">

                                <div class="ambulance-icon">

                                    <i class="fa-solid fa-truck-medical"></i>

                                </div>

                                <span class="status-badge accepted">

                                    ${escapeHTML(item.status)}

                                </span>

                            </div>

                            <h3>

                                ${escapeHTML(item.id)}

                            </h3>

                            <p>

                                <strong>
                                    Patient:
                                </strong>

                                ${escapeHTML(item.patient)}

                            </p>

                            <p>

                                <strong>
                                    Location:
                                </strong>

                                ${escapeHTML(item.location)}

                            </p>

                            <p class="eta">

                                ETA:
                                ${Number(item.eta) || 0}
                                minutes

                            </p>

                            <div class="ambulance-progress">

                                <div class="progress">

                                    <div
                                        class="progress-bar"
                                        style="width:${Math.min(Number(item.progress) || 0, 100)}%">
                                    </div>

                                </div>

                                <small>

                                    ${Math.min(Number(item.progress) || 0, 100)}%
                                    progress

                                </small>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   AMBULANCE SIMULATION
   ========================================================= */

setInterval(
    simulateAmbulances,
    30000
);


function simulateAmbulances() {

    let changed = false;


    ambulances.forEach(
        item => {

            if (
                item.progress < 100 &&
                item.status !== "Arrived"
            ) {

                item.progress =
                    Number(item.progress || 0) + 10;


                if (item.progress > 100) {

                    item.progress = 100;

                }


                if (item.eta > 0) {

                    item.eta -= 1;

                }


                if (item.progress >= 100) {

                    item.status =
                        "Arrived";


                    addNotification(
                        "Ambulance Arrived",
                        `${item.id} has arrived at the hospital.`
                    );

                }

                else {

                    item.status =
                        "En Route";

                }


                changed = true;

            }

        }
    );


    if (changed) {

        saveData(
            "rakshaReceptionistAmbulances",
            ambulances
        );


        renderAmbulances();

        updateStats();

    }

}


/* =========================================================
   CAPACITY
   ========================================================= */

function openCapacityModal() {

    const fields = {

        bedsTotal:
            document.getElementById("bedsTotal"),

        bedsAvailable:
            document.getElementById("bedsAvailable"),

        icuTotal:
            document.getElementById("icuTotal"),

        icuAvailable:
            document.getElementById("icuAvailable"),

        ventTotal:
            document.getElementById("ventTotal"),

        ventAvailable:
            document.getElementById("ventAvailable")

    };


    if (fields.bedsTotal) {

        fields.bedsTotal.value =
            capacity.bedsTotal;

    }


    if (fields.bedsAvailable) {

        fields.bedsAvailable.value =
            capacity.bedsAvailable;

    }


    if (fields.icuTotal) {

        fields.icuTotal.value =
            capacity.icuTotal;

    }


    if (fields.icuAvailable) {

        fields.icuAvailable.value =
            capacity.icuAvailable;

    }


    if (fields.ventTotal) {

        fields.ventTotal.value =
            capacity.ventTotal;

    }


    if (fields.ventAvailable) {

        fields.ventAvailable.value =
            capacity.ventAvailable;

    }


    const modal =
        document.getElementById(
            "capacityModal"
        );


    if (modal) {

        modal.classList.add(
            "active"
        );

    }

}


function updateCapacity(event) {

    event.preventDefault();


    const bedsTotal =
        Number(
            document.getElementById(
                "bedsTotal"
            )?.value
        );


    const bedsAvailable =
        Number(
            document.getElementById(
                "bedsAvailable"
            )?.value
        );


    const icuTotal =
        Number(
            document.getElementById(
                "icuTotal"
            )?.value
        );


    const icuAvailable =
        Number(
            document.getElementById(
                "icuAvailable"
            )?.value
        );


    const ventTotal =
        Number(
            document.getElementById(
                "ventTotal"
            )?.value
        );


    const ventAvailable =
        Number(
            document.getElementById(
                "ventAvailable"
            )?.value
        );


    if (
        bedsTotal < 0 ||
        bedsAvailable < 0 ||
        icuTotal < 0 ||
        icuAvailable < 0 ||
        ventTotal < 0 ||
        ventAvailable < 0
    ) {

        alert(
            "Capacity values cannot be negative."
        );

        return;

    }


    if (
        bedsAvailable > bedsTotal ||
        icuAvailable > icuTotal ||
        ventAvailable > ventTotal
    ) {

        alert(
            "Available resources cannot be greater than total resources."
        );

        return;

    }


    capacity = {

        bedsTotal,
        bedsAvailable,

        icuTotal,
        icuAvailable,

        ventTotal,
        ventAvailable

    };


    saveData(
        "rakshaReceptionistCapacity",
        capacity
    );


    closeModal(
        "capacityModal"
    );


    addNotification(
        "Hospital Capacity Updated",
        "Emergency resources have been updated."
    );


    renderAll();


    alert(
        "Hospital capacity updated successfully."
    );

}


function renderCapacity() {

    updateResource(
        "capacityBeds",
        "bedProgress",
        "bedStatus",
        capacity.bedsAvailable,
        capacity.bedsTotal
    );


    updateResource(
        "capacityICU",
        "icuProgress",
        "icuStatus",
        capacity.icuAvailable,
        capacity.icuTotal
    );


    updateResource(
        "capacityVentilator",
        "ventProgress",
        "ventStatus",
        capacity.ventAvailable,
        capacity.ventTotal
    );

}


function updateResource(
    textId,
    progressId,
    statusId,
    available,
    total
) {

    const text =
        document.getElementById(
            textId
        );


    const progress =
        document.getElementById(
            progressId
        );


    const status =
        document.getElementById(
            statusId
        );


    if (
        !text ||
        !progress ||
        !status
    ) {

        return;

    }


    available =
        Number(available) || 0;


    total =
        Number(total) || 0;


    text.textContent =
        `${available} / ${total}`;


    let percentage = 0;


    if (total > 0) {

        percentage =
            (available / total) * 100;

    }


    progress.style.width =
        Math.max(
            0,
            Math.min(
                percentage,
                100
            )
        ) + "%";


    if (available === 0) {

        status.textContent =
            "Unavailable";

        status.style.color =
            "#dc3545";

    }

    else if (
        available <=
        Math.ceil(total * 0.25)
    ) {

        status.textContent =
            "Low Availability";

        status.style.color =
            "#f59e0b";

    }

    else {

        status.textContent =
            "Available";

        status.style.color =
            "#17864b";

    }

}


/* =========================================================
   PREPARE BED
   ========================================================= */

function prepareBed() {

    if (
        capacity.bedsAvailable <= 0
    ) {

        alert(
            "No emergency beds are currently available."
        );

        return;

    }


    capacity.bedsAvailable--;


    saveData(
        "rakshaReceptionistCapacity",
        capacity
    );


    addNotification(
        "Emergency Bed Prepared",
        "One emergency bed has been prepared."
    );


    renderAll();


    alert(
        "Emergency bed prepared successfully."
    );

}


/* =========================================================
   DOCTORS
   ========================================================= */

function renderDoctors() {

    const container =
        document.getElementById(
            "doctorContainer"
        );


    if (!container) {
        return;
    }


    if (!doctors.length) {

        container.innerHTML =
            `
            <div class="doctor-card">

                <h3>
                    No Doctors Found
                </h3>

            </div>
            `;

        return;

    }


    container.innerHTML =
        doctors
            .map(
                doctor => {

                    const available =
                        doctor.status ===
                        "Available";


                    return `

                        <div class="doctor-card">

                            <div class="doctor-top">

                                <div class="doctor-avatar">

                                    <i class="fa-solid fa-user-doctor"></i>

                                </div>

                                <div>

                                    <h3>
                                        ${escapeHTML(doctor.name)}
                                    </h3>

                                    <p>
                                        ${escapeHTML(doctor.specialization)}
                                    </p>

                                </div>

                            </div>

                            <div
                                class="available"
                                style="color:${available ? "#17864b" : "#dc3545"}"
                            >

                                <i class="fa-solid fa-circle"></i>

                                ${escapeHTML(doctor.status)}

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   PATIENT QUEUE
   ========================================================= */

function renderPatientQueue() {

    const table =
        document.getElementById(
            "patientQueueTable"
        );


    if (!table) {
        return;
    }


    if (!emergencies.length) {

        table.innerHTML =
            `
            <tr>
                <td colspan="6" class="empty-row">
                    No patients in queue
                </td>
            </tr>
            `;

        return;

    }


    table.innerHTML =
        emergencies
            .map(
                (patient, index) => {

                    const doctor =
                        doctors.find(
                            d =>
                                d.status ===
                                "Available"
                        );


                    return `

                        <tr>

                            <td>

                                <strong>
                                    ${String(index + 1).padStart(3, "0")}
                                </strong>

                            </td>

                            <td>

                                ${escapeHTML(patient.patient)}

                            </td>

                            <td>

                                ${escapeHTML(patient.type)}

                            </td>

                            <td>

                                <span class="priority-badge ${getSafeClass(patient.priority)}">

                                    ${escapeHTML(patient.priority)}

                                </span>

                            </td>

                            <td>

                                ${
                                    doctor
                                        ? escapeHTML(doctor.name)
                                        : "No Doctor Available"
                                }

                            </td>

                            <td>

                                <span class="status-badge ${getSafeClass(patient.status)}">

                                    ${escapeHTML(patient.status)}

                                </span>

                            </td>

                        </tr>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   MEDICAL RECORDS
   ========================================================= */

function renderRecords() {

    const container =
        document.getElementById(
            "recordsContainer"
        );


    if (!container) {
        return;
    }


    if (!emergencies.length) {

        container.innerHTML =
            `
            <div class="record-card">

                <h3>
                    No Medical Records
                </h3>

                <p>
                    No emergency patient records are available.
                </p>

            </div>
            `;

        return;

    }


    container.innerHTML =
        emergencies
            .map(
                patient => {

                    return `

                        <div class="record-card">

                            <h3>
                                ${escapeHTML(patient.patient)}
                            </h3>

                            <div class="record-line">

                                <span>
                                    Patient ID
                                </span>

                                <strong>
                                    ${escapeHTML(patient.id)}
                                </strong>

                            </div>

                            <div class="record-line">

                                <span>
                                    Emergency
                                </span>

                                <strong>
                                    ${escapeHTML(patient.type)}
                                </strong>

                            </div>

                            <div class="record-line">

                                <span>
                                    Priority
                                </span>

                                <strong>
                                    ${escapeHTML(patient.priority)}
                                </strong>

                            </div>

                            <div class="record-line">

                                <span>
                                    Blood Group
                                </span>

                                <strong>
                                    ${escapeHTML(patient.blood)}
                                </strong>

                            </div>

                            <div class="record-line">

                                <span>
                                    Allergies
                                </span>

                                <strong class="allergy">
                                    ${escapeHTML(patient.allergies)}
                                </strong>

                            </div>

                            <div class="record-line">

                                <span>
                                    Emergency Contact
                                </span>

                                <strong>
                                    ${escapeHTML(patient.contact)}
                                </strong>

                            </div>

                            <div class="record-line">

                                <span>
                                    Location
                                </span>

                                <strong>
                                    ${escapeHTML(patient.location)}
                                </strong>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function addNotification(
    title,
    message
) {

    notifications.unshift({

        title,

        message,

        time:
            new Date().toLocaleTimeString()

    });


    if (
        notifications.length > 30
    ) {

        notifications =
            notifications.slice(
                0,
                30
            );

    }


    saveData(
        "rakshaReceptionistNotifications",
        notifications
    );


    updateNotificationCount();

}


function updateNotificationCount() {

    const count =
        document.getElementById(
            "notificationCount"
        );


    if (!count) {
        return;
    }


    count.textContent =
        notifications.length;

}


function showNotifications() {

    const container =
        document.getElementById(
            "notificationList"
        );


    if (!container) {
        return;
    }


    if (!notifications.length) {

        container.innerHTML =
            `
            <div class="notification-item">

                <strong>
                    No notifications
                </strong>

                <span>
                    You are all caught up.
                </span>

            </div>
            `;

    }

    else {

        container.innerHTML =
            notifications
                .map(
                    item => {

                        return `

                            <div class="notification-item">

                                <strong>
                                    ${escapeHTML(item.title)}
                                </strong>

                                <span>
                                    ${escapeHTML(item.message)}
                                </span>

                                <span>
                                    ${escapeHTML(item.time)}
                                </span>

                            </div>

                        `;

                    }
                )
                .join("");

    }


    const modal =
        document.getElementById(
            "notificationModal"
        );


    if (modal) {

        modal.classList.add(
            "active"
        );

    }


    notifications = [];


    saveData(
        "rakshaReceptionistNotifications",
        notifications
    );


    updateNotificationCount();

}


/* =========================================================
   COMMUNICATION
   ========================================================= */

function makeEmergencyCall() {

    addNotification(
        "Emergency Call",
        "Emergency communication request initiated."
    );


    alert(
        "Emergency call initiated."
    );

}


function notifyDoctor() {

    const doctor =
        doctors.find(
            item =>
                item.status ===
                "Available"
        );


    if (!doctor) {

        alert(
            "No doctor is currently available."
        );

        return;

    }


    addNotification(
        "Doctor Alert",
        `${doctor.name} has been notified about an emergency.`
    );


    alert(
        doctor.name +
        " has been notified."
    );

}


function contactAmbulance() {

    addNotification(
        "Ambulance Communication",
        "Ambulance team has been contacted."
    );


    alert(
        "Ambulance team contacted."
    );

}


function sendEmergencyMessage() {

    const messageElement =
        document.getElementById(
            "emergencyMessage"
        );


    if (!messageElement) {

        alert(
            "Emergency message field was not found."
        );

        return;

    }


    const message =
        messageElement.value.trim();


    if (!message) {

        alert(
            "Please enter an emergency message."
        );

        return;

    }


    addNotification(
        "Emergency Message Sent",
        message
    );


    messageElement.value = "";


    alert(
        "Emergency message sent successfully."
    );

}


/* =========================================================
   SOS
   ========================================================= */

/*
   This function is called by your SOS icon/button.

   Example HTML:

   onclick="openSOS()"
*/

function openSOS() {

    const sosSection =
        document.getElementById(
            "sos"
        );


    /*
     * If your HTML already contains
     * an SOS page-section, open it.
     */

    if (sosSection) {

        showSectionById(
            "sos"
        );

        return;

    }


    /*
     * If there is no SOS section in HTML,
     * create a small SOS popup dynamically.
     */

    createSOSModal();

}


function renderSOS() {

    const sosButton =
        document.getElementById(
            "activateSOSButton"
        );


    if (sosButton) {

        sosButton.onclick =
            activateSOS;

    }

}


function createSOSModal() {

    /*
     * Don't create duplicate SOS modal.
     */

    let modal =
        document.getElementById(
            "dynamicSOSModal"
        );


    if (!modal) {

        modal =
            document.createElement(
                "div"
            );


        modal.id =
            "dynamicSOSModal";


        modal.className =
            "modal active";


        modal.innerHTML = `

            <div
                class="modal-content"
                style="
                    max-width:500px;
                    text-align:center;
                    padding:35px;
                "
            >

                <button
                    type="button"
                    onclick="closeModal('dynamicSOSModal')"
                    style="
                        position:absolute;
                        right:20px;
                        top:15px;
                        border:none;
                        background:none;
                        font-size:24px;
                        cursor:pointer;
                    "
                >
                    &times;
                </button>

                <div
                    style="
                        font-size:60px;
                        color:#dc3545;
                        margin-bottom:15px;
                    "
                >
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>

                <h2>
                    SOS Emergency
                </h2>

                <p>
                    Activate SOS to trigger an immediate
                    emergency response alert.
                </p>

                <button
                    type="button"
                    class="accept-btn"
                    onclick="activateSOS()"
                    style="
                        background:#dc3545;
                        color:white;
                        border:none;
                        padding:14px 28px;
                        border-radius:8px;
                        font-weight:700;
                        cursor:pointer;
                        margin-top:15px;
                    "
                >
                    <i class="fa-solid fa-bell"></i>
                    ACTIVATE SOS
                </button>

            </div>

        `;


        document.body.appendChild(
            modal
        );

    }

    else {

        modal.classList.add(
            "active"
        );

    }

}


function activateSOS() {

    const confirmed =
        window.confirm(
            "ARE YOU SURE YOU WANT TO ACTIVATE SOS?\n\nThis will trigger an immediate emergency response alert."
        );


    if (!confirmed) {

        return;

    }


    /*
     * Save SOS state.
     */

    localStorage.setItem(
        "rakshaSOSActive",
        "true"
    );


    localStorage.setItem(
        "rakshaSOSLastActivated",
        new Date().toISOString()
    );


    /*
     * Create notification.
     */

    addNotification(
        "SOS ACTIVATED",
        "Immediate emergency response alert has been triggered."
    );


    /*
     * Try browser vibration on supported devices.
     */

    if (
        "vibrate" in navigator
    ) {

        try {

            navigator.vibrate(
                [
                    500,
                    200,
                    500,
                    200,
                    800
                ]
            );

        }

        catch (error) {

            console.log(
                "Vibration not supported."
            );

        }

    }


    /*
     * Close dynamic SOS modal.
     */

    closeModal(
        "dynamicSOSModal"
    );


    /*
     * Visual alert.
     */

    alert(
        "🚨 SOS ACTIVATED!\n\nEmergency response alert has been triggered."
    );


    /*
     * Optional timeout to reset
     * active SOS indicator.
     */

    setTimeout(
        function() {

            localStorage.removeItem(
                "rakshaSOSActive"
            );

        },
        30000
    );

}


/* =========================================================
   REFRESH
   ========================================================= */

function refreshDashboard() {

    capacity =
        getData(
            "rakshaReceptionistCapacity",
            defaultCapacity
        );


    emergencies =
        getData(
            "rakshaReceptionistEmergencies",
            defaultEmergencies
        );


    ambulances =
        getData(
            "rakshaReceptionistAmbulances",
            defaultAmbulances
        );


    notifications =
        getData(
            "rakshaReceptionistNotifications",
            []
        );


    doctors =
        getData(
            "rakshaReceptionistDoctors",
            defaultDoctors
        );


    const storedStatus =
        localStorage.getItem(
            "rakshaHospitalAccepting"
        );


    hospitalAccepting =
        storedStatus === null
            ? true
            : storedStatus === "true";


    renderAll();


    addNotification(
        "Dashboard Refreshed",
        "Receptionist dashboard data has been refreshed."
    );


    alert(
        "Dashboard refreshed successfully."
    );

}


/* =========================================================
   RENDER ALL
   ========================================================= */

function renderAll() {

    renderOverview();

    renderEmergencyTable();

    renderAmbulances();

    renderCapacity();

    renderDoctors();

    renderPatientQueue();

    renderRecords();

    renderSOS();

    updateNotificationCount();

}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeModal(id) {

    const modal =
        document.getElementById(
            id
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   SAFE CSS CLASS
   ========================================================= */

function getSafeClass(value) {

    return String(
        value ?? ""
    )
        .toLowerCase()
        .replace(
            /[^a-z0-9_-]/g,
            ""
        );

}


/* =========================================================
   CLOSE MODAL BY CLICKING OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    function(event) {

        if (
            event.target &&
            event.target.classList &&
            event.target.classList.contains(
                "modal"
            )
        ) {

            event.target.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================================
   ESC KEY CLOSES MODALS
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        document
            .querySelectorAll(
                ".modal.active"
            )
            .forEach(
                modal => {

                    modal.classList.remove(
                        "active"
                    );

                }
            );

    }
);


/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    const confirmed = window.confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmed) {
        return;
    }

    // Clear receptionist session
    sessionStorage.removeItem("receptionistId");
    sessionStorage.removeItem("receptionistName");
    sessionStorage.removeItem("receptionistRole");

    // Clear complete session
    sessionStorage.clear();

    // Clear login-related local storage
    localStorage.removeItem("receptionist");
    localStorage.removeItem("receptionistId");
    localStorage.removeItem("receptionistName");
    localStorage.removeItem("loggedIn");

    // Prevent going back to dashboard using browser Back button
    window.history.pushState(null, "", window.location.href);

    // Redirect to Home.html
    window.location.replace("../Home.html");
}


/* =========================================================
   PREVENT DASHBOARD FROM BEING RESTORED USING BACK BUTTON
   ========================================================= */

function protectLoggedOutPage() {

    const loggedOut =
        sessionStorage.getItem(
            "rakshaLoggedOut"
        );


    if (loggedOut === "true") {

        /*
         * The user shouldn't stay on
         * the receptionist dashboard after logout.
         */

        window.location.replace(
            "../Home.html"
        );

    }

}


/* =========================================================
   BROWSER PAGE SHOW
   ========================================================= */

window.addEventListener(
    "pageshow",
    function(event) {

        /*
         * If browser restores this page
         * from cache after logout,
         * redirect to Home.
         */

        if (
            sessionStorage.getItem(
                "rakshaLoggedOut"
            ) === "true"
        ) {

            window.location.replace(
                "../Home.html"
            );

        }

    }
);


/* =========================================================
   EXPOSE FUNCTIONS TO HTML
   =========================================================

   This is important if your HTML uses:

   onclick="logout()"
   onclick="openSOS()"
   onclick="activateSOS()"
   etc.
   ========================================================= */

window.showSection =
    showSection;

window.showSectionById =
    showSectionById;

window.toggleHospitalStatus =
    toggleHospitalStatus;

window.openEmergencyModal =
    openEmergencyModal;

window.addEmergency =
    addEmergency;

window.acceptEmergency =
    acceptEmergency;

window.viewPatient =
    viewPatient;

window.openAmbulanceModal =
    openAmbulanceModal;

window.dispatchAmbulance =
    dispatchAmbulance;

window.openCapacityModal =
    openCapacityModal;

window.updateCapacity =
    updateCapacity;

window.prepareBed =
    prepareBed;

window.showNotifications =
    showNotifications;

window.makeEmergencyCall =
    makeEmergencyCall;

window.notifyDoctor =
    notifyDoctor;

window.contactAmbulance =
    contactAmbulance;

window.sendEmergencyMessage =
    sendEmergencyMessage;

window.openSOS =
    openSOS;

window.activateSOS =
    activateSOS;

window.refreshDashboard =
    refreshDashboard;

window.closeModal =
    closeModal;

window.logout =
    logout;


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
         * Check whether this dashboard
         * was previously logged out.
         */

        protectLoggedOutPage();


        /*
         * Load receptionist information.
         */

        loadReceptionistSession();


        /*
         * Start clock.
         */

        updateClock();


        /*
         * Hospital status.
         */

        updateHospitalStatusUI();


        /*
         * Render everything.
         */

        renderAll();

    }
);