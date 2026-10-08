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
            localStorage.setItem("EqualLearnUser", email);
            alert("Login realizado com sucesso!");
            window.location.href = "perfil.html";
        }
    });
}

function demoLogin() {
    localStorage.setItem("EqualLearnUser", "demo@EqualLearn.com");
    alert("Modo demonstração ativado!");
    window.location.href = "perfil.html";
}


/* =========================================
   CADASTRO DE TUTOR
========================================= */

const tutorForm = document.getElementById("tutorForm");

if (tutorForm) {
    tutorForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const subject = document.getElementById("subject").value;
        const studentType = document.querySelector('input[name="studentType"]:checked');

        if (!studentType) {
            alert("Selecione seu tipo de estudante.");
            return;
        }

        const tutorData = {
            name: name,
            subject: subject,
            studentType: studentType.value,
            registered: new Date().toISOString()
        };

        localStorage.setItem("tutorData", JSON.stringify(tutorData));
        alert("Cadastro realizado com sucesso! Você agora faz parte da rede de tutores.");
        window.location.href = "banco-horas.html";
    });
}


/* =========================================
   SOLICITAR TUTOR
========================================= */

function requestTutor(name) {
    const confirmed = confirm(`Deseja solicitar uma sessão de tutoria com ${name}?`);

    if (confirmed) {
        localStorage.setItem("selectedTutor", name);
        alert(`Solicitação enviada para ${name}!`);
    }
}


/* =========================================
   FILTRO DE TUTORES
========================================= */

const subjectFilter = document.getElementById("subjectFilter");
const levelFilter = document.getElementById("levelFilter");

if (subjectFilter && levelFilter) {
    function filterTutors() {
        const subject = subjectFilter.value;
        const level = levelFilter.value;
        const tutors = document.querySelectorAll(".tutor-card");

        tutors.forEach(function(tutor) {
            const tutorSubject = tutor.dataset.subject;
            const tutorLevel = tutor.dataset.level;

            const subjectMatch = subject === "all" || subject === tutorSubject;
            const levelMatch = level === "all" || level === tutorLevel;

            if (subjectMatch && levelMatch) {
                tutor.style.display = "flex";
            } else {
                tutor.style.display = "none";
            }
        });
    }

    subjectFilter.addEventListener("change", filterTutors);
    levelFilter.addEventListener("change", filterTutors);
}


/* =========================================
   HORAS
========================================= */

function getHours() {
    const savedHours = localStorage.getItem("EqualLearnHours");
    return savedHours ? Number(savedHours) : 12;
}

function updateHours() {
    const hours = getHours();
    const hoursElement = document.getElementById("hoursValue");
    const certificateHours = document.getElementById("certificateHours");

    if (hoursElement) {
        hoursElement.textContent = hours;
    }

    if (certificateHours) {
        certificateHours.textContent = `${hours} horas`;
    }
}

updateHours();


/* =========================================
   CERTIFICADO
========================================= */

const certificateName = document.getElementById("certificateName");

if (certificateName) {
    const tutorData = localStorage.getItem("tutorData");
    if (tutorData) {
        const data = JSON.parse(tutorData);
        if (data.name) {
            certificateName.textContent = data.name;
        }
    }
}


/* =========================================
   PERFIL
========================================= */

const profileName = document.querySelector(".profile-header h1");

if (profileName) {
    const tutorData = localStorage.getItem("tutorData");
    if (tutorData) {
        const data = JSON.parse(tutorData);
        if (data.name) {
            profileName.textContent = `Olá, ${data.name}!`;
        }
    }
}


/* =========================================
   ANIMAÇÃO SIMPLES
========================================= */

const cards = document.querySelectorAll(".step-card, .tutor-card, .impact-card, .metric-card");

cards.forEach(function(card) {
    card.addEventListener("mouseenter", function() {
        card.style.transform = "translateY(-3px)";
        card.style.transition = ".2s";
    });

    card.addEventListener("mouseleave", function() {
        card.style.transform = "translateY(0)";
    });
});


/* =========================================
   LÓGICA DE OFENSIVA (STREAK)
========================================= */

function carregarOfensiva() {
    const streak = parseInt(localStorage.getItem('equalLearn_streak') || '0');
    const ultimoAcesso = localStorage.getItem('equalLearn_ultimoAcesso');
    const hoje = new Date().toDateString();
    const btnCheckin = document.getElementById('btn-checkin');
    const streakCountDisplay = document.getElementById('streak-count');

    if (streakCountDisplay) {
        streakCountDisplay.innerText = streak;
    }

    if (btnCheckin) {
        // Atribui a função ao clique do botão
        btnCheckin.onclick = registrarAcessoDiario;

        // Se já marcou presença hoje, desativa o botão
        if (ultimoAcesso === hoje) {
            btnCheckin.innerText = "Concluído Hoje! 🔥";
            btnCheckin.disabled = true;
        }
    }
}

function registrarAcessoDiario() {
    const hoje = new Date();
    const hojeString = hoje.toDateString();

    const ultimoAcessoString = localStorage.getItem('equalLearn_ultimoAcesso');
    let streak = parseInt(localStorage.getItem('equalLearn_streak') || '0');

    if (ultimoAcessoString) {
        const ultimoAcesso = new Date(ultimoAcessoString);
        const diffDias = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));

        if (diffDias === 1) {
            streak += 1;
        } else if (diffDias > 1) {
            streak = 1;
            alert("Que pena! Sua ofensiva foi reiniciada. Comece uma nova sequência hoje!");
        }
    } else {
        streak = 1;
    }

    localStorage.setItem('equalLearn_streak', streak);
    localStorage.setItem('equalLearn_ultimoAcesso', hojeString);

    carregarOfensiva();
}

// Inicializa a verificação assim que a página carrega
document.addEventListener('DOMContentLoaded', carregarOfensiva);