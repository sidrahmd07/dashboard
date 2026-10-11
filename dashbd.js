/* =========================================================
   NEXORA STUDENT DASHBOARD
   dashbd.js
   CLEAN VERSION — NO FAKE XP / LEVEL / COINS / PROGRESS
   ========================================================= */


/* =========================================================
   1. USER DATA
   ========================================================= */

const DEFAULT_USER = {
    name: "Yejjipurapu Vasavi",
    username: "@vasavi",

    streak: 0,
    courses: 0,
    projects: 0,

    quizzesCompleted: 0,
    averageScore: 0,
    bestScore: 0,

    questionsSolved: 0,
    correctAnswers: 0,
    accuracy: 0
};


/* =========================================================
   2. LEARNING TOPICS
   ========================================================= */

const LEARNING_TOPICS = [
    {
        id: "artificial-intelligence",
        number: "01",
        title: "Artificial Intelligence",
        category: "AI",
        description:
            "Learn the foundations of intelligent systems, machine learning concepts, neural networks and modern AI.",
        modules: [
            "AI Fundamentals",
            "Machine Learning",
            "Neural Networks",
            "Generative AI"
        ]
    },

    {
        id: "cyber-security",
        number: "02",
        title: "Cyber Security",
        category: "SECURITY",
        description:
            "Understand cybersecurity fundamentals, threats, vulnerabilities, network security and safe digital practices.",
        modules: [
            "Cybersecurity Fundamentals",
            "Network Security",
            "Threat Detection",
            "Web Security"
        ]
    },

    {
        id: "web-development",
        number: "03",
        title: "Web Development",
        category: "WEB",
        description:
            "Build modern websites and web applications using frontend technologies and web development fundamentals.",
        modules: [
            "HTML",
            "CSS",
            "JavaScript",
            "Web Applications"
        ]
    },

    {
        id: "data-science",
        number: "04",
        title: "Data Science",
        category: "DATA",
        description:
            "Learn how data is collected, cleaned, explored and used to discover useful patterns and insights.",
        modules: [
            "Python for Data",
            "Data Cleaning",
            "Data Analysis",
            "Data Visualization"
        ]
    },

    {
        id: "cloud-computing",
        number: "05",
        title: "Cloud Computing",
        category: "CLOUD",
        description:
            "Understand cloud platforms, computing resources, storage, deployment and cloud-based applications.",
        modules: [
            "Cloud Fundamentals",
            "Cloud Storage",
            "Cloud Computing",
            "Cloud Deployment"
        ]
    },

    {
        id: "app-development",
        number: "06",
        title: "App Development",
        category: "APP",
        description:
            "Explore mobile application development, application structure, interfaces and app deployment concepts.",
        modules: [
            "App Fundamentals",
            "UI Design",
            "Application Logic",
            "App Deployment"
        ]
    }
];


/* =========================================================
   3. DOMAIN PROJECTS
   ========================================================= */

const DOMAIN_PROJECTS = [
    {
        title: "AI Study Recommendation System",
        category: "Artificial Intelligence",
        description:
            "An intelligent system that analyzes learning patterns and recommends suitable study resources.",
        status: "AVAILABLE"
    },

    {
        title: "PhishLens",
        category: "Cyber Security",
        description:
            "An email threat intelligence prototype that analyzes messages and identifies suspicious indicators.",
        status: "AVAILABLE"
    },

    {
        title: "Responsive Portfolio Platform",
        category: "Web Development",
        description:
            "A responsive web platform demonstrating modern HTML, CSS and JavaScript development.",
        status: "AVAILABLE"
    },

    {
        title: "Student Data Analytics",
        category: "Data Science",
        description:
            "A data analysis project that processes student-related datasets and presents useful insights.",
        status: "AVAILABLE"
    },

    {
        title: "Cloud File Management System",
        category: "Cloud Computing",
        description:
            "A cloud-based application concept for storing, organizing and accessing files securely.",
        status: "AVAILABLE"
    },

    {
        title: "Student Companion App",
        category: "App Development",
        description:
            "A mobile application concept designed to organize student activities, tasks and learning resources.",
        status: "AVAILABLE"
    }
];


/* =========================================================
   4. LOAD USER
   ========================================================= */

let user = loadUser();


function loadUser() {

    let saved = null;

    try {
        saved = JSON.parse(
            localStorage.getItem("nexoraUser")
        );
    } catch (error) {
        saved = null;
    }


    const currentUser = {
        ...DEFAULT_USER,
        ...(saved || {})
    };


    /*
       Remove old fake gamification data.
    */

    delete currentUser.level;
    delete currentUser.xp;
    delete currentUser.xpRequired;
    delete currentUser.coins;
    delete currentUser.todayCoins;


    /*
       Make sure no invalid values remain.
    */

    currentUser.streak =
        Number(currentUser.streak) || 0;

    currentUser.courses =
        Number(currentUser.courses) || 0;

    currentUser.projects =
        Number(currentUser.projects) || 0;

    currentUser.quizzesCompleted =
        Number(currentUser.quizzesCompleted) || 0;

    currentUser.averageScore =
        Number(currentUser.averageScore) || 0;

    currentUser.bestScore =
        Number(currentUser.bestScore) || 0;

    currentUser.questionsSolved =
        Number(currentUser.questionsSolved) || 0;

    currentUser.correctAnswers =
        Number(currentUser.correctAnswers) || 0;

    currentUser.accuracy =
        Number(currentUser.accuracy) || 0;


    localStorage.setItem(
        "nexoraUser",
        JSON.stringify(currentUser)
    );


    return currentUser;
}


function saveUser() {

    localStorage.setItem(
        "nexoraUser",
        JSON.stringify(user)
    );
}


/* =========================================================
   5. DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeDashboard
);


function initializeDashboard() {

    setupIntro();

    setupGalaxy();

    setupShootingStars();

    setupClock();

    updateUserUI();

    setupNavigation();

    setupProfile();

    setupLearning();

    setupProjects();

    setupQuizSystem();

    setupAI();

    setupButtons();

    setupRevealAnimations();

    removeFakeGamification();

    checkAchievements();

}


/* =========================================================
   6. INTRO SCREEN
   ========================================================= */

function setupIntro() {

    const intro =
        document.getElementById("introScreen");

    const app =
        document.getElementById("app");


    if (!intro || !app) {
        return;
    }


    setTimeout(() => {

        intro.classList.add("hide");

        app.classList.remove("hidden");

    }, 2200);
}


/* =========================================================
   7. GALAXY BACKGROUND
   ========================================================= */

function setupGalaxy() {

    const canvas =
        document.getElementById("galaxyCanvas");


    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    if (!ctx) {
        return;
    }


    let width = window.innerWidth;

    let height = window.innerHeight;

    let stars = [];

    let mouseX = 0;

    let mouseY = 0;

    let targetMouseX = 0;

    let targetMouseY = 0;


    function resize() {

        width =
            window.innerWidth;

        height =
            window.innerHeight;


        const ratio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        canvas.width =
            width * ratio;

        canvas.height =
            height * ratio;

        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";


        ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );


        createStars();
    }


    function createStars() {

        stars = [];


        const count =
            Math.min(
                650,
                Math.max(
                    120,
                    Math.floor(
                        (width * height) / 1800
                    )
                )
            );


        for (
            let i = 0;
            i < count;
            i++
        ) {

            stars.push({

                x:
                    Math.random() *
                    width,

                y:
                    Math.random() *
                    height,

                radius:
                    Math.random() *
                    1.35 +
                    0.15,

                speed:
                    Math.random() *
                    0.25 +
                    0.03,

                depth:
                    Math.random(),

                alpha:
                    Math.random() *
                    0.65 +
                    0.15,

                twinkle:
                    Math.random() *
                    Math.PI *
                    2

            });

        }
    }


    function draw() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        mouseX +=
            (
                targetMouseX -
                mouseX
            ) * 0.025;


        mouseY +=
            (
                targetMouseY -
                mouseY
            ) * 0.025;


        const time =
            Date.now() * 0.001;


        stars.forEach(star => {

            star.y +=
                star.speed *
                (0.4 + star.depth);


            if (
                star.y >
                height + 5
            ) {

                star.y = -5;

                star.x =
                    Math.random() *
                    width;

            }


            const parallaxX =
                mouseX *
                star.depth *
                18;


            const parallaxY =
                mouseY *
                star.depth *
                12;


            const twinkle =
                Math.sin(
                    time +
                    star.twinkle
                );


            const alpha =
                Math.max(
                    0.08,
                    star.alpha +
                    twinkle * 0.15
                );


            ctx.beginPath();


            ctx.arc(
                star.x + parallaxX,
                star.y + parallaxY,
                star.radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(255,255,255,${alpha})`;


            ctx.fill();

        });


        requestAnimationFrame(draw);
    }


    window.addEventListener(
        "mousemove",
        event => {

            targetMouseX =
                event.clientX /
                width *
                2 -
                1;


            targetMouseY =
                event.clientY /
                height *
                2 -
                1;

        }
    );


    window.addEventListener(
        "resize",
        resize
    );


    resize();

    draw();
}


/* =========================================================
   8. SHOOTING STARS
   ========================================================= */

function setupShootingStars() {

    const container =
        document.getElementById(
            "shootingStars"
        );


    if (!container) {
        return;
    }


    function createShootingStar() {

        const star =
            document.createElement("div");


        star.className =
            "shooting-star";


        star.style.left =
            Math.random() * 100 + "%";


        star.style.top =
            Math.random() * 45 + "%";


        container.appendChild(star);


        setTimeout(() => {

            star.remove();

        }, 1500);
    }


    setInterval(() => {

        if (Math.random() < 0.35) {

            createShootingStar();

        }

    }, 5500);
}


/* =========================================================
   9. CLOCK
   ========================================================= */

function setupClock() {

    const dateElement =
        document.getElementById(
            "currentDate"
        );


    const timeElement =
        document.getElementById(
            "currentTime"
        );


    if (!dateElement && !timeElement) {
        return;
    }


    function updateClock() {

        const now =
            new Date();


        if (dateElement) {

            dateElement.textContent =
                now
                    .toLocaleDateString(
                        "en-IN",
                        {
                            weekday: "long",
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }
                    )
                    .toUpperCase();

        }


        if (timeElement) {

            timeElement.textContent =
                now.toLocaleTimeString(
                    "en-IN",
                    {
                        hour12: false
                    }
                );

        }

    }


    updateClock();

    setInterval(
        updateClock,
        1000
    );
}


/* =========================================================
   10. UPDATE USER UI
   ========================================================= */

function updateUserUI() {

    const firstName =
        (user.name || "Student")
            .trim()
            .split(" ")[0]
            .toUpperCase();


    setText(
        "welcomeName",
        firstName
    );


    setText(
        "profileName",
        user.name
    );


    setText(
        "profileUsername",
        user.username
    );


    setText(
        "navAvatar",
        getInitial(user.name)
    );


    setText(
        "profileAvatar",
        getInitial(user.name)
    );


    setText(
        "streakValue",
        user.streak
    );


    setText(
        "streakBig",
        user.streak
    );


    setText(
        "coursesValue",
        user.courses
    );


    setText(
        "projectsValue",
        user.projects
    );


    setText(
        "quizzesCompleted",
        user.quizzesCompleted
    );


    setText(
        "averageScore",
        user.averageScore + "%"
    );


    setText(
        "bestScore",
        user.bestScore + "%"
    );


    setText(
        "questionsSolved",
        user.questionsSolved
    );


    setText(
        "correctAnswers",
        user.correctAnswers
    );


    setText(
        "accuracy",
        user.accuracy + "%"
    );
}


function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }
}


function getInitial(name) {

    if (!name) {
        return "N";
    }


    return name
        .trim()
        .charAt(0)
        .toUpperCase();
}


/* =========================================================
   11. REMOVE OLD FAKE GAMIFICATION
   ========================================================= */

function removeFakeGamification() {

    const selectors = [

        "#xpFill",
        "#xpCurrent",
        "#currentXpText",
        "#xpRequired",
        "#remainingXp",
        "#levelNumber",
        "#coinValue",
        "#todayCoins",

        ".xp-card",
        ".coins-card",
        ".level-road",
        "#levelStatus"

    ];


    selectors.forEach(selector => {

        document
            .querySelectorAll(selector)
            .forEach(element => {

                element.remove();

            });

    });
}


/* =========================================================
   12. NAVIGATION
   ========================================================= */

function setupNavigation() {

    document
        .querySelectorAll("[data-target]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    navigateTo(
                        button.dataset.target
                    );

                }
            );

        });


    const mobileButton =
        document.getElementById(
            "mobileMenuButton"
        );


    const mobileNav =
        document.getElementById(
            "mobileNav"
        );


    if (
        mobileButton &&
        mobileNav
    ) {

        mobileButton.addEventListener(
            "click",
            () => {

                mobileNav.classList.toggle(
                    "open"
                );

            }
        );

    }
}


function navigateTo(target) {

    const section =
        document.getElementById(target);


    if (!section) {
        return;
    }


    section.scrollIntoView({
        behavior: "smooth"
    });


    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.target === target
            );

        });


    document
        .getElementById("mobileNav")
        ?.classList.remove("open");
}


/* =========================================================
   13. PROFILE
   ========================================================= */

function setupProfile() {

    const editButton =
        document.getElementById(
            "editProfileBtn"
        );


    const modal =
        document.getElementById(
            "profileModal"
        );


    const closeButton =
        document.getElementById(
            "closeProfile"
        );


    const saveButton =
        document.getElementById(
            "saveProfile"
        );


    if (
        !editButton ||
        !modal
    ) {
        return;
    }


    editButton.addEventListener(
        "click",
        () => {

            const nameInput =
                document.getElementById(
                    "editName"
                );


            const usernameInput =
                document.getElementById(
                    "editUsername"
                );


            if (nameInput) {
                nameInput.value =
                    user.name;
            }


            if (usernameInput) {
                usernameInput.value =
                    user.username;
            }


            modal.classList.add(
                "open"
            );

        }
    );


    closeButton?.addEventListener(
        "click",
        () => {

            modal.classList.remove(
                "open"
            );

        }
    );


    saveButton?.addEventListener(
        "click",
        () => {

            const nameInput =
                document.getElementById(
                    "editName"
                );


            const usernameInput =
                document.getElementById(
                    "editUsername"
                );


            let name =
                nameInput?.value.trim();


            let username =
                usernameInput?.value.trim();


            if (!name) {

                showToast(
                    "ENTER YOUR NAME"
                );

                return;

            }


            if (!username) {

                username =
                    "@" +
                    name
                        .split(" ")[0]
                        .toLowerCase();

            }


            if (
                !username.startsWith("@")
            ) {

                username =
                    "@" +
                    username;

            }


            user.name =
                name;


            user.username =
                username;


            saveUser();

            updateUserUI();


            modal.classList.remove(
                "open"
            );


            showToast(
                "PROFILE UPDATED"
            );

        }
    );
}


/* =========================================================
   14. LEARNING
   ========================================================= */

function setupLearning() {

    /*
       Supports existing HTML learning buttons.
       The HTML should contain the six learning cards.
    */

    document
        .querySelectorAll("[data-learning]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const topic =
                        button.dataset.learning ||
                        button.textContent.trim();


                    openLearningTopic(topic);

                }
            );

        });
}


function openLearningTopic(topic) {

    const normalized =
        String(topic)
            .toLowerCase()
            .replace(/-/g, " ")
            .trim();


    const topicData =
        LEARNING_TOPICS.find(item =>

            item.title
                .toLowerCase()
                .includes(normalized) ||

            item.id
                .replace(/-/g, " ")
                .includes(normalized)

        );


    if (!topicData) {

        showToast(
            `${String(topic).toUpperCase()} MODULE OPENING`
        );

        return;
    }


    showToast(
        `${topicData.title.toUpperCase()} MODULE OPENING`
    );


    const event =
        new CustomEvent(
            "nexoraLearningOpen",
            {
                detail: topicData
            }
        );


    document.dispatchEvent(event);
}


/* =========================================================
   15. PROJECTS
   ========================================================= */

function setupProjects() {

    /*
       Project cards can use:
       data-project-category="Artificial Intelligence"
       etc.
    */

    document
        .querySelectorAll("[data-project-category]")
        .forEach(card => {

            const category =
                card.dataset.projectCategory;


            const project =
                DOMAIN_PROJECTS.find(item =>

                    item.category
                        .toLowerCase() ===
                    category
                        .toLowerCase()

                );


            if (!project) {
                return;
            }


            const title =
                card.querySelector(
                    ".project-title"
                );


            const description =
                card.querySelector(
                    ".project-description"
                );


            const status =
                card.querySelector(
                    ".project-status"
                );


            if (title) {
                title.textContent =
                    project.title;
            }


            if (description) {
                description.textContent =
                    project.description;
            }


            if (status) {
                status.textContent =
                    project.status;
            }

        });
}


/* =========================================================
   16. QUIZ DATA
   ========================================================= */

const quizSets = {

    daily: {
        name: "DAILY QUIZ",

        questions: [

            {
                question:
                    "What does AI stand for?",

                options: [
                    "Artificial Intelligence",
                    "Automated Internet",
                    "Advanced Interface",
                    "Application Integration"
                ],

                answer: 0
            },

            {
                question:
                    "Which language is commonly used in AI and data science?",

                options: [
                    "Python",
                    "HTML",
                    "CSS",
                    "XML"
                ],

                answer: 0
            },

            {
                question:
                    "Which protocol is commonly used for secure web communication?",

                options: [
                    "HTTP",
                    "HTTPS",
                    "FTP",
                    "SMTP"
                ],

                answer: 1
            },

            {
                question:
                    "Which technology is used to structure a web page?",

                options: [
                    "HTML",
                    "Python",
                    "SQL",
                    "Git"
                ],

                answer: 0
            },

            {
                question:
                    "Which data structure follows FIFO?",

                options: [
                    "Stack",
                    "Queue",
                    "Tree",
                    "Graph"
                ],

                answer: 1
            }

        ]
    },


    quick: {
        name: "QUICK QUIZ",

        questions: [

            {
                question:
                    "Which symbol starts a JavaScript single-line comment?",

                options: [
                    "//",
                    "##",
                    "<!--",
                    "**"
                ],

                answer: 0
            },

            {
                question:
                    "Which HTML element creates a hyperlink?",

                options: [
                    "<link>",
                    "<a>",
                    "<url>",
                    "<href>"
                ],

                answer: 1
            },

            {
                question:
                    "Which is a programming language?",

                options: [
                    "Python",
                    "Chrome",
                    "Windows",
                    "GitHub"
                ],

                answer: 0
            }

        ]
    },


    brain: {
        name: "BRAIN CHALLENGE",

        questions: [

            {
                question:
                    "What is the average time complexity of binary search?",

                options: [
                    "O(n)",
                    "O(log n)",
                    "O(n²)",
                    "O(1)"
                ],

                answer: 1
            },

            {
                question:
                    "Which data structure uses LIFO?",

                options: [
                    "Queue",
                    "Array",
                    "Stack",
                    "Graph"
                ],

                answer: 2
            },

            {
                question:
                    "Which number is prime?",

                options: [
                    "21",
                    "27",
                    "29",
                    "35"
                ],

                answer: 2
            }

        ]
    },


    coding: {
        name: "CODING QUIZ",

        questions: [

            {
                question:
                    "Which loop is commonly used when the number of iterations is known?",

                options: [
                    "for",
                    "switch",
                    "try",
                    "catch"
                ],

                answer: 0
            },

            {
                question:
                    "Which keyword returns a value from a JavaScript function?",

                options: [
                    "send",
                    "return",
                    "output",
                    "give"
                ],

                answer: 1
            },

            {
                question:
                    "Which structure stores key-value pairs in JavaScript?",

                options: [
                    "Object",
                    "Loop",
                    "Function",
                    "String"
                ],

                answer: 0
            }

        ]
    },


    cyber: {
        name: "CYBER SECURITY",

        questions: [

            {
                question:
                    "What does HTTPS provide?",

                options: [
                    "Encryption",
                    "More storage",
                    "More RAM",
                    "Faster CPU"
                ],

                answer: 0
            },

            {
                question:
                    "What is phishing?",

                options: [
                    "A social engineering attack",
                    "A programming language",
                    "A database",
                    "A firewall"
                ],

                answer: 0
            },

            {
                question:
                    "Which can identify a device on a network?",

                options: [
                    "IP address",
                    "HTML",
                    "CPU",
                    "CSS"
                ],

                answer: 0
            }

        ]
    },


    ai: {
        name: "ARTIFICIAL INTELLIGENCE",

        questions: [

            {
                question:
                    "What does ML stand for?",

                options: [
                    "Machine Learning",
                    "Modern Logic",
                    "Memory Language",
                    "Machine Link"
                ],

                answer: 0
            },

            {
                question:
                    "Which language is widely used for machine learning?",

                options: [
                    "Python",
                    "HTML",
                    "CSS",
                    "XML"
                ],

                answer: 0
            },

            {
                question:
                    "What is training data used for?",

                options: [
                    "Teaching a model patterns",
                    "Increasing monitor size",
                    "Installing RAM",
                    "Creating passwords"
                ],

                answer: 0
            }

        ]
    }

};


/* =========================================================
   17. QUIZ STATE
   ========================================================= */

let currentQuiz = null;

let currentQuestion = 0;

let selectedAnswer = null;

let quizCorrect = 0;


/* =========================================================
   18. QUIZ SYSTEM
   ========================================================= */

function setupQuizSystem() {

    document
        .querySelectorAll("[data-quiz]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    startQuiz(
                        button.dataset.quiz
                    );

                }
            );

        });


    document
        .getElementById("nextQuestion")
        ?.addEventListener(
            "click",
            nextQuestion
        );


    document
        .getElementById("closeQuiz")
        ?.addEventListener(
            "click",
            closeQuiz
        );


    document
        .getElementById("closeResult")
        ?.addEventListener(
            "click",
            closeResult
        );

}


function startQuiz(type) {

    const selectedQuiz =
        quizSets[type];


    currentQuiz =
        selectedQuiz ||
        quizSets.daily;


    currentQuestion = 0;

    selectedAnswer = null;

    quizCorrect = 0;


    const modal =
        document.getElementById(
            "quizModal"
        );


    if (!modal) {
        return;
    }


    setText(
        "quizCategory",
        currentQuiz.name
    );


    modal.classList.add(
        "open"
    );


    loadQuizQuestion();
}


function loadQuizQuestion() {

    if (!currentQuiz) {
        return;
    }


    const question =
        currentQuiz.questions[
            currentQuestion
        ];


    if (!question) {
        return;
    }


    selectedAnswer = null;


    setText(
        "quizQuestionNumber",
        `${currentQuestion + 1} / ${currentQuiz.questions.length}`
    );


    setText(
        "quizProgress",
        `${currentQuestion + 1} / ${currentQuiz.questions.length}`
    );


    setText(
        "quizQuestion",
        question.question
    );


    const options =
        document.getElementById(
            "quizOptions"
        );


    if (!options) {
        return;
    }


    options.innerHTML = "";


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "quiz-option";


            button.type =
                "button";


            button.textContent =
                option;


            button.dataset.index =
                index;


            button.addEventListener(
                "click",
                () => {

                    selectAnswer(
                        index,
                        button
                    );

                }
            );


            options.appendChild(
                button
            );

        }
    );
}


function selectAnswer(
    index,
    button
) {

    selectedAnswer =
        index;


    document
        .querySelectorAll(".quiz-option")
        .forEach(option => {

            option.classList.remove(
                "selected"
            );

        });


    button.classList.add(
        "selected"
    );
}


function nextQuestion() {

    if (
        !currentQuiz ||
        selectedAnswer === null
    ) {

        showToast(
            "SELECT AN ANSWER FIRST"
        );

        return;
    }


    const question =
        currentQuiz.questions[
            currentQuestion
        ];


    if (
        selectedAnswer ===
        question.answer
    ) {

        quizCorrect++;

    }


    currentQuestion++;


    if (
        currentQuestion >=
        currentQuiz.questions.length
    ) {

        finishQuiz();

    } else {

        loadQuizQuestion();

    }
}


/* =========================================================
   19. FINISH QUIZ
   ========================================================= */

function finishQuiz() {

    if (!currentQuiz) {
        return;
    }


    const total =
        currentQuiz.questions.length;


    const percentage =
        Math.round(
            (quizCorrect / total) * 100
        );


    user.quizzesCompleted++;

    user.questionsSolved += total;

    user.correctAnswers +=
        quizCorrect;


    if (
        user.questionsSolved > 0
    ) {

        user.accuracy =
            Math.round(
                (
                    user.correctAnswers /
                    user.questionsSolved
                ) * 100
            );

    }


    const previousQuizCount =
        user.quizzesCompleted - 1;


    if (
        previousQuizCount === 0
    ) {

        user.averageScore =
            percentage;

    } else {

        user.averageScore =
            Math.round(
                (
                    (
                        user.averageScore *
                        previousQuizCount
                    ) +
                    percentage
                ) /
                user.quizzesCompleted
            );

    }


    if (
        percentage >
        user.bestScore
    ) {

        user.bestScore =
            percentage;

    }


    saveUser();

    updateUserUI();

    checkAchievements();


    closeQuiz();


    const resultModal =
        document.getElementById(
            "resultModal"
        );


    setText(
        "resultScore",
        percentage + "%"
    );


    setText(
        "resultCorrect",
        quizCorrect
    );


    setText(
        "resultQuestions",
        total
    );


    setText(
        "resultXp",
        "KNOWLEDGE CHECK"
    );


    setText(
        "resultText",
        getResultMessage(percentage)
    );


    resultModal?.classList.add(
        "open"
    );
}


function closeQuiz() {

    document
        .getElementById(
            "quizModal"
        )
        ?.classList.remove(
            "open"
        );
}


function closeResult() {

    document
        .getElementById(
            "resultModal"
        )
        ?.classList.remove(
            "open"
        );
}


function getResultMessage(
    percentage
) {

    if (percentage === 100) {

        return "PERFECT RUN. YOUR KNOWLEDGE IS SHARP.";

    }


    if (percentage >= 80) {

        return "EXCELLENT WORK. KEEP BUILDING YOUR KNOWLEDGE.";

    }


    if (percentage >= 60) {

        return "GOOD PROGRESS. KEEP PRACTICING.";

    }


    return "KEEP LEARNING. EVERY ATTEMPT HELPS YOU IMPROVE.";
}


/* =========================================================
   20. ACHIEVEMENTS
   ========================================================= */

function checkAchievements() {

    unlock(
        "quiz",
        user.quizzesCompleted >= 1
    );


    unlock(
        "streak",
        user.streak >= 7
    );


    unlock(
        "tenquiz",
        user.quizzesCompleted >= 10
    );


    unlock(
        "project",
        user.projects >= 1
    );
}


function unlock(
    id,
    condition
) {

    const card =
        document.querySelector(
            `[data-achievement="${id}"]`
        );


    if (!card) {
        return;
    }


    card.classList.toggle(
        "unlocked",
        condition
    );
}


/* =========================================================
   21. AI DEMO
   ========================================================= */

function setupAI() {

    document
        .querySelectorAll(".ai-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    handleAI(
                        button.dataset.ai
                    );

                }
            );

        });
}


function handleAI(action) {

    const response =
        document.getElementById(
            "aiResponse"
        );


    if (!response) {
        return;
    }


    const responses = {

        "ASK NEXORA AI":
            "NEXORA AI: Ask a learning question and I will help you understand it step by step.",

        "GET STUDY HELP":
            "NEXORA AI: Choose one topic, learn one concept at a time, then test your understanding.",

        "EXPLAIN THIS":
            "NEXORA AI: Select a concept or provide the topic you want explained in beginner-friendly language.",

        "DEBUG MY CODE":
            "NEXORA AI: Provide your code and error message to identify the problem and understand the fix."

    };


    response.textContent =
        responses[action] ||
        "NEXORA AI IS READY.";


    if (
        response.animate
    ) {

        response.animate(
            [
                {
                    opacity: 0
                },

                {
                    opacity: 1
                }
            ],
            {
                duration: 400
            }
        );

    }
}


/* =========================================================
   22. BUTTONS
   ========================================================= */

function setupButtons() {

    const logoutButton =
        document.getElementById(
            "logoutBtn"
        );


    logoutButton?.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "nexoraUser"
            );


            showToast(
                "LOGGING OUT..."
            );


            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 800);

        }
    );


    const notificationButton =
        document.getElementById(
            "notificationBtn"
        );


    notificationButton?.addEventListener(
        "click",
        () => {

            showToast(
                "NO NEW SYSTEM ALERTS"
            );

        }
    );


    const settingsButton =
        document.getElementById(
            "settingsBtn"
        );


    settingsButton?.addEventListener(
        "click",
        () => {

            showToast(
                "SETTINGS MODULE READY"
            );

        }
    );


    const profileButton =
        document.getElementById(
            "profileNavBtn"
        );


    profileButton?.addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "profileModal"
                )
                ?.classList.add(
                    "open"
                );

        }
    );


    const projectButton =
        document.getElementById(
            "newProjectBtn"
        );


    projectButton?.addEventListener(
        "click",
        () => {

            showToast(
                "PROJECT CREATOR READY"
            );

        }
    );
}


/* =========================================================
   23. REVEAL ANIMATIONS
   ========================================================= */

function setupRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        !elements.length ||
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.08
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );
}


/* =========================================================
   24. TOAST
   ========================================================= */

let toastTimer = null;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);
}


/* =========================================================
   25. ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {
            return;
        }


        document
            .querySelectorAll(
                ".modal-overlay.open"
            )
            .forEach(modal => {

                modal.classList.remove(
                    "open"
                );

            });

    }
);


/* =========================================================
   26. MODAL BACKDROP CLICK
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !event.target.classList.contains(
                "modal-overlay"
            )
        ) {
            return;
        }


        event.target.classList.remove(
            "open"
        );

    }
);


/* =========================================================
   27. GLOBAL PROJECT / TOPIC DATA
   ========================================================= */

window.NEXORA_TOPICS =
    LEARNING_TOPICS;


window.NEXORA_PROJECTS =
    DOMAIN_PROJECTS;


/* =========================================================
   28. SYSTEM READY
   ========================================================= */

console.log(
    "%c NEXORA STUDENT SYSTEM ONLINE ",
    "background:#fff;color:#000;padding:8px 15px;font-weight:bold;"
);