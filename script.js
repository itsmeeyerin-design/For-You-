const CORRECT_PASSWORD = "바다";

const body = document.body;
const lockScreen = document.getElementById("lock-screen");
const mainContent = document.getElementById("main-content");
const passwordInput = document.getElementById("password-input");
const unlockBtn = document.getElementById("unlock-btn");
const lockMessage = document.getElementById("lock-message");
const lockCard = document.querySelector(".lock-card");

const startBtn = document.getElementById("start-btn");
const daysSection = document.getElementById("days-section");
const dDayEl = document.getElementById("d-day");

const openLetterBtn = document.getElementById("open-letter-btn");
const letterSection = document.getElementById("letter-section");
const sparkles = document.getElementById("sparkles");

body.classList.add("no-scroll");

// D+ 계산
function calculateDays() {
  const startDate = new Date("2025-03-31T00:00:00");
  const today = new Date();

  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = today - startDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;

  dDayEl.textContent = `D+${days}`;
}

// 잠금 해제
function unlockPage() {
  const value = passwordInput.value.trim();

  if (value === CORRECT_PASSWORD) {
    lockMessage.textContent = "정답이야 :)";
    setTimeout(() => {
      lockScreen.style.opacity = "0";
      lockScreen.style.transition = "opacity 0.8s ease";
      setTimeout(() => {
        lockScreen.style.display = "none";
        mainContent.classList.remove("hidden");
        body.classList.remove("no-scroll");
        calculateDays();
        observeFadeIns();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 800);
    }, 300);
  } else {
    lockMessage.textContent = "정답이 아닌 것 같아. 힌트: 내가 제일 자주 부르는 말 :)";
    lockCard.classList.add("shake");
    setTimeout(() => lockCard.classList.remove("shake"), 350);
  }
}

unlockBtn.addEventListener("click", unlockPage);
passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlockPage();
});

// 시작 버튼
startBtn.addEventListener("click", () => {
  daysSection.scrollIntoView({ behavior: "smooth" });
});

// 스크롤 등장 애니메이션
function observeFadeIns() {
  const fadeEls = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  fadeEls.forEach((el) => observer.observe(el));
}

// 편지 열기
openLetterBtn.addEventListener("click", () => {
  letterSection.classList.remove("hidden");
  letterSection.scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    letterSection.querySelector(".letter-card").classList.add("show-letter");
    createSparkles();
  }, 400);
});

// 반짝이 효과
function createSparkles() {
  for (let i = 0; i < 24; i++) {
    const sparkle = document.createElement("span");
    sparkle.classList.add("sparkle");
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${60 + Math.random() * 30}%`;
    sparkle.style.animationDelay = `${Math.random() * 0.8}s`;
    sparkles.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 3000);
  }
}
