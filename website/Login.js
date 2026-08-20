let selectedRole = "";


/* ================= OPEN LOGIN ================= */

function openLogin(role) {

    selectedRole = role;

    const modal =
        document.getElementById("loginModal");

    const title =
        document.getElementById("loginTitle");

    const description =
        document.getElementById("loginDescription");

    const idLabel =
        document.getElementById("idLabel");

    const userId =
        document.getElementById("userId");

    const modalIcon =
        document.getElementById("modalIcon");


    /* ================= DOCTOR LOGIN ================= */

    if (role === "doctor") {

        title.textContent =
            "Doctor Login";

        description.textContent =
            "Secure access for authorized doctors.";

        idLabel.textContent =
            "Doctor ID";

        userId.placeholder =
            "Enter your Doctor ID";

        modalIcon.innerHTML =
            '<i class="fa-solid fa-user-doctor"></i>';

        modalIcon.style.background =
            "#e8f3fc";

        modalIcon.style.color =
            "#0b63a3";
    }


    /* ================= RECEPTIONIST LOGIN ================= */

    else {

        title.textContent =
            "Receptionist Login";

        description.textContent =
            "Secure access for hospital receptionists.";

        idLabel.textContent =
            "Receptionist ID";

        userId.placeholder =
            "Enter your Receptionist ID";

        modalIcon.innerHTML =
            '<i class="fa-solid fa-hospital"></i>';

        modalIcon.style.background =
            "#eaf8f0";

        modalIcon.style.color =
            "#17864b";
    }


    modal.classList.add("active");

    userId.focus();

}


/* ================= CLOSE LOGIN ================= */

function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.remove("active");

}


/* ================= PASSWORD ================= */

function togglePassword() {

    const password =
        document.getElementById("password");

    const icon =
        document.querySelector(".password-eye");


    if (password.type === "password") {

        password.type = "text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    }

    else {

        password.type = "password";

        icon.classList.remove("fa-eye-slash");

        icon.classList.add("fa-eye");

    }

}


/* ================= LOGIN ================= */

function login(event) {

    event.preventDefault();


    const userId =
        document
            .getElementById("userId")
            .value
            .trim();

    const password =
        document
            .getElementById("password")
            .value;


    if (!userId || !password) {

        alert(
            "Please enter your login details."
        );

        return;

    }


    /* ================= DOCTOR LOGIN ================= */

    if (selectedRole === "doctor") {

        sessionStorage.setItem(
            "doctorId",
            userId
        );


        alert(
            "Doctor Login Successful!\n\n" +
            "Doctor ID: " + userId
        );


        window.location.href =
            "Doctor/doctor-dashboard.html";
    }


    /* ================= RECEPTIONIST ================= */

    else {

        sessionStorage.setItem(
            "receptionistId",
            userId
        );


        alert(
            "Receptionist Login Successful!\n\n" +
            "Receptionist ID: " + userId
        );


        window.location.href =
            "Receptionist/receptionist-dashboard.html";
    }

}