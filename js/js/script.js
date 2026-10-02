/* =========================================
   EqualLearn
   JavaScript principal
========================================= */


/* =========================================
   LOGIN
========================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value;

        if (email) {

            localStorage.setItem(
                "EqualLearnUser",
                email
            );

            alert(
                "Login realizado com sucesso!"
            );

            window.location.href = "perfil.html";

        }

    });

}


function demoLogin() {

    localStorage.setItem(
        "EqualLearnUser",
        "demo@EqualLearn.com"
    );

    alert(
        "Modo demonstração ativado!"
    );

    window.location.href = "perfil.html";

}


/* =========================================
   CADASTRO DE TUTOR
========================================= */

const tutorForm =
    document.getElementById("tutorForm");

if (tutorForm) {

    tutorForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;

        const subject =
            document.getElementById("subject").value;

        const studentType =
            document.querySelector(
                'input[name="studentType"]:checked'
            );


        if (!studentType) {

            alert(
                "Selecione seu tipo de estudante."
            );

            return;

        }


        const tutorData = {

            name: name,

            subject: subject,

            studentType:
                studentType.value,

            registered:
                new Date().toISOString()

        };


        localStorage.setItem(
            "tutorData",
            JSON.stringify(tutorData)
        );


        alert(
            "Cadastro realizado com sucesso! Você agora faz parte da rede de tutores."
        );


        window.location.href =
            "banco-horas.html";

    });

}


/* =========================================
   SOLICITAR TUTOR
========================================= */

function requestTutor(name) {

    const confirmed = confirm(

        `Deseja solicitar uma sessão de tutoria com ${name}?`

    );


    if (confirmed) {

        localStorage.setItem(
            "selectedTutor",
            name
        );


        alert(
            `Solicitação enviada para ${name}!`
        );

    }

}


/* =========================================
   FILTRO DE TUTORES
========================================= */

const subjectFilter =
    document.getElementById("subjectFilter");

const levelFilter =
    document.getElementById("levelFilter");


if (subjectFilter && levelFilter) {

    function filterTutors() {

        const subject =
            subjectFilter.value;

        const level =
            levelFilter.value;


        const tutors =
            document.querySelectorAll(
                ".tutor-card"
            );


        tutors.forEach(function(tutor) {

            const tutorSubject =
                tutor.dataset.subject;

            const tutorLevel =
                tutor.dataset.level;


            const subjectMatch =
                subject === "all" ||
                subject === tutorSubject;


            const levelMatch =
                level === "all" ||
                level === tutorLevel;


            if (
                subjectMatch &&
                levelMatch
            ) {

                tutor.style.display =
                    "flex";

            } else {

                tutor.style.display =
                    "none";

            }

        });

    }


    subjectFilter.addEventListener(
        "change",
        filterTutors
    );


    levelFilter.addEventListener(
        "change",
        filterTutors
    );

}


/* =========================================
   HORAS
========================================= */

function getHours() {

    const savedHours =
        localStorage.getItem(
            "EqualLearnHours"
        );


    return savedHours
        ? Number(savedHours)
        : 12;

}


function updateHours() {

    const hours =
        getHours();


    const hoursElement =
        document.getElementById(
            "hoursValue"
        );


    const certificateHours =
        document.getElementById(
            "certificateHours"
        );


    if (hoursElement) {

        hoursElement.textContent =
            hours;

    }


    if (certificateHours) {

        certificateHours.textContent =
            `${hours} horas`;

    }

}


updateHours();


/* =========================================
   CERTIFICADO
========================================= */

const certificateName =
    document.getElementById(
        "certificateName"
    );


if (certificateName) {

    const tutorData =
        localStorage.getItem(
            "tutorData"
        );


    if (tutorData) {

        const data =
            JSON.parse(tutorData);


        if (data.name) {

            certificateName.textContent =
                data.name;

        }

    }

}


/* =========================================
   PERFIL
========================================= */

const profileName =
    document.querySelector(
        ".profile-header h1"
    );


if (profileName) {

    const tutorData =
        localStorage.getItem(
            "tutorData"
        );


    if (tutorData) {

        const data =
            JSON.parse(tutorData);


        if (data.name) {

            profileName.textContent =
                `Olá, ${data.name}!`;

        }

    }

}


/* =========================================
   ANIMAÇÃO SIMPLES
========================================= */

const cards =
    document.querySelectorAll(
        ".step-card, .tutor-card, .impact-card, .metric-card"
    );


cards.forEach(function(card) {

    card.addEventListener(
        "mouseenter",
        function() {

            card.style.transform =
                "translateY(-3px)";

            card.style.transition =
                ".2s";

        }
    );


    card.addEventListener(
        "mouseleave",
        function() {

            card.style.transform =
                "translateY(0)";

        }
    );

});