/* =========================================================
   NEXORA AI/ML DASHBOARD
   ========================================================= */


/* =========================================================
   AI / ML LEVEL DATA
   ========================================================= */

const levels = {

    1: {
        name: "Python Foundation",
        password: "NEXORA01",
        xp: 100
    },

    2: {
        name: "Python for AI",
        password: "NEXORA02",
        xp: 150
    },

    3: {
        name: "Mathematics for AI",
        password: "NEXORA03",
        xp: 200
    },

    4: {
        name: "Machine Learning",
        password: "NEXORA04",
        xp: 250
    },

    5: {
        name: "Data & Model Training",
        password: "NEXORA05",
        xp: 300
    },

    6: {
        name: "Deep Learning",
        password: "NEXORA06",
        xp: 350
    },

    7: {
        name: "Computer Vision",
        password: "NEXORA07",
        xp: 400
    },

    8: {
        name: "Natural Language Processing",
        password: "NEXORA08",
        xp: 450
    },

    9: {
        name: "Generative AI",
        password: "NEXORA09",
        xp: 500
    },

    10: {
        name: "AI Capstone",
        password: "NEXORA10",
        xp: 600
    }

};


/* =========================================================
   STORAGE
   ========================================================= */

const COMPLETED_KEY = "nexoraCompletedLevels";
const XP_KEY = "nexoraXP";
const NAME_KEY = "nexoraStudentName";


/* =========================================================
   STATE
   ========================================================= */

let completedLevels =
    JSON.parse(localStorage.getItem(COMPLETED_KEY)) || [];

let totalXP =
    Number(localStorage.getItem(XP_KEY)) || 0;

let studentName =
    localStorage.getItem(NAME_KEY) || "";

let currentLevel = null;


/* =========================================================
   INTRO BOOT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadProfile();

    updateAllStats();

    startBoot();

});


function startBoot() {

    const progress =
        document.getElementById("bootProgress");

    const percent =
        document.getElementById("bootPercent");

    const intro =
        document.getElementById("introScreen");

    let value = 0;

    const interval = setInterval(() => {

        value++;

        progress.style.width = value + "%";
        percent.textContent = value + "%";

        if (value >= 100) {

            clearInterval(interval);

            setTimeout(() => {

                intro.classList.add("hide");

            }, 500);

        }

    }, 18);

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function hideAllPages() {

    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active");
        });

}


function showDashboard() {

    hideAllPages();

    document
        .getElementById("dashboardPage")
        .classList.add("active");

    updateAllStats();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function openAIML() {

    hideAllPages();

    document
        .getElementById("aimlPage")
        .classList.add("active");

    updateAllStats();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function showProfile() {

    hideAllPages();

    document
        .getElementById("profilePage")
        .classList.add("active");

    loadProfile();

    updateAllStats();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function showPage(pageId) {

    hideAllPages();

    const page =
        document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }

}


/* =========================================================
   LEVEL SELECTION
   ========================================================= */

function selectLevel(levelNumber) {

    currentLevel = levelNumber;

    document
        .querySelectorAll(".level-reveal")
        .forEach(card => {
            card.classList.remove("revealed");
        });


    document
        .querySelectorAll(".level-circle")
        .forEach(circle => {
            circle.classList.remove("active");
        });


    const reveal =
        document.getElementById(
            `reveal-${levelNumber}`
        );


    const circle =
        document.querySelector(
            `.level-${levelNumber} .level-circle`
        );


    if (reveal) {

        setTimeout(() => {

            reveal.classList.add("revealed");

        }, 250);

    }


    if (circle) {

        circle.classList.add("active");

    }


    showToast(
        `LEVEL ${String(levelNumber).padStart(2, "0")} SELECTED`
    );

}


/* =========================================================
   PASSWORD MODAL
   ========================================================= */

function openPassword(levelNumber) {

    currentLevel = levelNumber;

    const modal =
        document.getElementById("passwordModal");

    const level =
        levels[levelNumber];


    if (!level) {
        return;
    }


    document
        .getElementById("passwordLevel")
        .textContent =
        String(levelNumber).padStart(2, "0");


    document
        .getElementById("selectedLevelName")
        .textContent =
        level.name;


    const passwordInput =
        document.getElementById("levelPassword");

    const error =
        document.getElementById("passwordError");


    passwordInput.value = "";

    error.classList.remove("show");

    modal.classList.add("active");

    setTimeout(() => {
        passwordInput.focus();
    }, 100);

}


function closePassword() {

    document
        .getElementById("passwordModal")
        .classList.remove("active");

}


function closeSuccess() {

    document
        .getElementById("successModal")
        .classList.remove("active");

}


/* =========================================================
   PASSWORD VERIFICATION
   ========================================================= */

function verifyPassword() {

    if (!currentLevel) {
        return;
    }


    const input =
        document
            .getElementById("levelPassword")
            .value
            .trim();


    const error =
        document.getElementById("passwordError");


    const correctPassword =
        levels[currentLevel].password;


    if (input === correctPassword) {

        error.classList.remove("show");

        closePassword();

        openSuccess();

    } else {

        error.classList.remove("show");

        void error.offsetWidth;

        error.classList.add("show");

    }

}


/* =========================================================
   ENTER KEY FOR PASSWORD
   ========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        const passwordModal =
            document.getElementById("passwordModal");

        if (
            passwordModal &&
            passwordModal.classList.contains("active")
        ) {

            verifyPassword();

        }

    }


    if (event.key === "Escape") {

        closePassword();

        closeSuccess();

    }

});


/* =========================================================
   SUCCESS
   ========================================================= */

function openSuccess() {

    if (!currentLevel) {
        return;
    }


    const level =
        levels[currentLevel];


    document
        .getElementById("successMessage")
        .textContent =
        `${level.name} access has been granted.`;

    document
        .getElementById("successModal")
        .classList.add("active");

}


/* =========================================================
   ENTER MODULE
   ========================================================= */

function enterModule() {

    if (!currentLevel) {
        return;
    }


    const level =
        levels[currentLevel];


    /*
       Prevent XP from being added more than once.
    */

    if (!completedLevels.includes(currentLevel)) {

        completedLevels.push(currentLevel);

        totalXP += level.xp;


        localStorage.setItem(
            COMPLETED_KEY,
            JSON.stringify(completedLevels)
        );


        localStorage.setItem(
            XP_KEY,
            totalXP
        );

    }


    closeSuccess();

    updateAllStats();

    showToast(
        `${level.name.toUpperCase()} COMPLETED +${level.xp} XP`
    );


    /*
       Later, this is where the actual lesson/module
       page can be connected.

       Example:

       window.location.href =
           "python-foundation.html";
    */

}


/* =========================================================
   PROFILE
   ========================================================= */

function loadProfile() {

    const input =
        document.getElementById("studentName");

    if (input) {

        input.value = studentName;

    }


    updateProfileAvatar();

}


function saveProfile() {

    const input =
        document.getElementById("studentName");

    if (!input) {
        return;
    }


    const name =
        input.value.trim();


    if (!name) {

        showToast("ENTER YOUR NAME FIRST");

        return;

    }


    studentName = name;


    localStorage.setItem(
        NAME_KEY,
        studentName
    );


    updateProfileAvatar();

    showToast("PROFILE SAVED");

}


function updateProfileAvatar() {

    const avatar =
        document.getElementById("profileAvatar");

    if (!avatar) {
        return;
    }


    if (!studentName) {

        avatar.textContent = "ST";

        return;

    }


    const words =
        studentName
            .trim()
            .split(/\s+/);


    let initials = "";


    if (words.length === 1) {

        initials =
            words[0]
                .substring(0, 2)
                .toUpperCase();

    } else {

        initials =
            (
                words[0][0] +
                words[words.length - 1][0]
            ).toUpperCase();

    }


    avatar.textContent = initials;

}


/* =========================================================
   STATISTICS
   ========================================================= */

function getProgress() {

    return Math.round(
        (completedLevels.length / 10) * 100
    );

}


function updateAllStats() {

    const completed =
        completedLevels.length;

    const progress =
        getProgress();


    /* -----------------------------
       NAVBAR
       ----------------------------- */

    const xpValue =
        document.getElementById("xpValue");

    if (xpValue) {
        xpValue.textContent = totalXP;
    }


    /* -----------------------------
       DASHBOARD
       ----------------------------- */

    const dashboardCompleted =
        document.getElementById(
            "dashboardCompleted"
        );

    const dashboardProgress =
        document.getElementById(
            "dashboardProgress"
        );

    const dashboardXP =
        document.getElementById(
            "dashboardXP"
        );


    if (dashboardCompleted) {

        dashboardCompleted.textContent =
            `${completed} / 10`;

    }


    if (dashboardProgress) {

        dashboardProgress.textContent =
            `${progress}%`;

    }


    if (dashboardXP) {

        dashboardXP.textContent =
            totalXP;

    }


    /* -----------------------------
       SECTOR CARD
       ----------------------------- */

    const sectorCompleted =
        document.getElementById(
            "sectorCompleted"
        );

    const sectorProgress =
        document.getElementById(
            "sectorProgress"
        );


    if (sectorCompleted) {

        sectorCompleted.textContent =
            completed;

    }


    if (sectorProgress) {

        sectorProgress.textContent =
            `${progress}%`;

    }


    /* -----------------------------
       ROADMAP HUD
       ----------------------------- */

    const roadmapCompleted =
        document.getElementById(
            "roadmapCompleted"
        );

    const roadmapProgress =
        document.getElementById(
            "roadmapProgress"
        );


    if (roadmapCompleted) {

        roadmapCompleted.textContent =
            completed;

    }


    if (roadmapProgress) {

        roadmapProgress.textContent =
            `${progress}%`;

    }


    /* -----------------------------
       PROFILE
       ----------------------------- */

    const profileCompleted =
        document.getElementById(
            "profileCompleted"
        );

    const profileProgress =
        document.getElementById(
            "profileProgress"
        );

    const profileXP =
        document.getElementById(
            "profileXP"
        );


    if (profileCompleted) {

        profileCompleted.textContent =
            `${completed} / 10`;

    }


    if (profileProgress) {

        profileProgress.textContent =
            `${progress}%`;

    }


    if (profileXP) {

        profileXP.textContent =
            totalXP;

    }


    updateCompletedCircles();

}


/* =========================================================
   COMPLETED LEVEL VISUALS
   ========================================================= */

function updateCompletedCircles() {

    document
        .querySelectorAll(".level-circle")
        .forEach((circle, index) => {

            const levelNumber =
                index + 1;


            if (
                completedLevels.includes(levelNumber)
            ) {

                circle.classList.add("completed");

            } else {

                circle.classList.remove("completed");

            }

        });

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer = null;


function showToast(message) {

    const toast =
        document.getElementById("toast");


    if (!toast) {
        return;
    }


    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

}


/* =========================================================
   MODAL OUTSIDE CLICK
   ========================================================= */

document.addEventListener("click", event => {

    const passwordModal =
        document.getElementById("passwordModal");

    const successModal =
        document.getElementById("successModal");


    if (
        event.target === passwordModal
    ) {

        closePassword();

    }


    if (
        event.target === successModal
    ) {

        closeSuccess();

    }

});


/* =========================================================
   INITIAL UPDATE
   ========================================================= */

updateAllStats();