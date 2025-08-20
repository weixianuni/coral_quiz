// plate coral, branch coral, 

let currentQuestion = 0;

const scores = {
    "branch": 0,
    "brain": 0,
    "mushroom": 0,
    "staghorn": 0,
    "elkhorn": 0,
    "pillar": 0,
    "table": 0,
    "cup": 0,
    "fire": 0,
    "soft": 0
  };
const startBtn = document.getElementById('start-btn');
const landingScreen = document.getElementById('landing-screen');
const questionSection = document.getElementById('question-section');
const bufferScreen = document.getElementById('buffer-screen');
const resultSection = document.getElementById('result-section');
const questionText = document.getElementById('question-text');
const questionImage = document.getElementById('question-image')
const optionsContainer = document.getElementById('options-container');
const resultName = document.getElementById('result-name');
const resultImage = document.getElementById('result-image');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let answers = [];

const questions = [
    {
      question: "You wake up as a tiny coral polyp drifting in the ocean. Where do you settle?",
      options: [
        { text: "On a strong rocky base", corals: ["brain", "pillar"] },
        { text: "On a branch near the surface", corals: ["staghorn", "elkhorn"] },
        { text: "On a wide, flat reef", corals: ["table", "cup"] },
        { text: "Alone on sandy seabed", corals: ["mushroom"] }
      ]
    },
    {
      question: "A school of fish swims by. How do you react?",
      options: [
        { text: "Offer shelter to as many as possible", corals: ["table", "branch"] },
        { text: "Stay hidden and observe quietly", corals: ["brain", "soft"] },
        { text: "Wave your branches to attract them", corals: ["elkhorn", "staghorn"] },
        { text: "Let them pass — you prefer solitude", corals: ["mushroom"] }
      ]
    },
    {
      question: "The tide is getting stronger. What’s your survival strategy?",
      options: [
        { text: "Hold fast and weather the storm", corals: ["pillar", "brain"] },
        { text: "Bend and sway with the currents", corals: ["branch", "staghorn"] },
        { text: "Hide in crevices to stay safe", corals: ["soft", "cup"] },
        { text: "Defend yourself fiercely", corals: ["fire"] }
      ]
    },
    {
      question: "A diver approaches your reef. What do you do?",
      options: [
        { text: "Show off your beauty proudly", corals: ["fire", "cup"] },
        { text: "Remain still, blending in", corals: ["brain", "pillar"] },
        { text: "Wave gently to greet them", corals: ["branch", "soft"] },
        { text: "Stay out of sight", corals: ["mushroom"] }
      ]
    },
    {
      question: "Night falls over the reef. What’s your nighttime activity?",
      options: [
        { text: "Glow softly to attract plankton", corals: ["cup", "soft"] },
        { text: "Rest and store energy", corals: ["pillar", "brain"] },
        { text: "Hunt small prey with stingers", corals: ["fire"] },
        { text: "Float free in the current", corals: ["mushroom"] }
      ]
    },
    {
      question: "An algae bloom is threatening the reef. How do you respond?",
      options: [
        { text: "Team up with other corals to adapt", corals: ["branch", "table"] },
        { text: "Rely on your own resilience", corals: ["brain", "pillar"] },
        { text: "Use your toxins to fight back", corals: ["fire"] },
        { text: "Move away to a cleaner spot", corals: ["mushroom"] }
      ]
    },
    {
      question: "You spot a predator fish nearby. What’s your move?",
      options: [
        { text: "Protect smaller creatures around you", corals: ["elkhorn", "table"] },
        { text: "Hide and hope it passes", corals: ["soft", "cup"] },
        { text: "Fight with your stinging cells", corals: ["fire"] },
        { text: "Detach and drift away", corals: ["mushroom"] }
      ]
    },
    {
      question: "The sun is shining bright today. How do you use the energy?",
      options: [
        { text: "Grow upward quickly", corals: ["staghorn", "elkhorn"] },
        { text: "Strengthen your base", corals: ["pillar", "brain"] },
        { text: "Expand sideways to host more life", corals: ["table", "branch"] },
        { text: "Absorb just enough and rest", corals: ["soft"] }
      ]
    },
    {
      question: "A current brings in new coral larvae. What’s your role?",
      options: [
        { text: "Mentor and protect them", corals: ["elkhorn", "brain"] },
        { text: "Offer them a place to settle", corals: ["table", "branch"] },
        { text: "Let them find their own way", corals: ["mushroom"] },
        { text: "Compete to claim space first", corals: ["fire"] }
      ]
    },
    {
      question: "A storm has damaged part of your reef. What do you do?",
      options: [
        { text: "Rebuild stronger than before", corals: ["pillar", "elkhorn"] },
        { text: "Quickly regrow branches", corals: ["staghorn", "branch"] },
        { text: "Focus on healing slowly", corals: ["soft", "brain"] },
        { text: "Move to a new location", corals: ["mushroom"] }
      ]
    },
    {
      question: "The reef is quiet today. How do you spend your time?",
      options: [
        { text: "Chat with your coral neighbors", corals: ["branch", "table"] },
        { text: "Meditate and think", corals: ["brain", "soft"] },
        { text: "Patrol the area to keep it safe", corals: ["elkhorn", "fire"] },
        { text: "Drift peacefully alone", corals: ["mushroom"] }
      ]
    },
    {
      question: "You’ve been chosen as the reef’s representative. How do you lead?",
      options: [
        { text: "With wisdom and strategy", corals: ["brain", "pillar"] },
        { text: "By inspiring others with beauty", corals: ["cup", "soft"] }, // Note: "star" is not in your scores, remove or replace?
        { text: "By acting decisively in danger", corals: ["fire", "elkhorn"] },
        { text: "By helping everyone feel welcome", corals: ["table", "branch"] }
      ]
    }
  ];
  


function selectOption(coralList) {
    coralList.forEach(coral => scores[coral]++)
    nextQuestion();
}

function getResult() {
    let winner = Object.keys(scores).reduce((a, b) => corals[a] >= corals[b] ? a : b);
    return winner;
  }

function renderQuestion() {
    const currentQ = questions[currentQuestionIndex];

    questionText.textContent = currentQ.question;
    optionsContainer.innerHTML = "";
    questionImage.src = "assets/placeholder.jpeg"
  
    currentQ.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt.text;
      btn.className = "option-btn";
      btn.onclick = () => selectAnswer(i);
      optionsContainer.appendChild(btn);
    });
}

function selectAnswer(selectedIndex) {
    answers[currentQuestionIndex] = questions[currentQuestionIndex].options[selectedIndex].corals;

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        // Show buffer screen, then show result
        questionSection.style.display = "none";
        bufferScreen.style.display = "block";

        setTimeout(() => {
        bufferScreen.style.display = "none";
        showResult();
        }, 2000); // 2 second delay for effect
    }
}

function calculateResult() {
    const maxScore = Math.max(...Object.values(scores));
    const topCorals = Object.entries(scores)
      .filter(([coral, score]) => score === maxScore)
      .map(([coral]) => coral);
  
    // Pick a random coral if tie, or single coral if only one top scorer
    const winner = topCorals[Math.floor(Math.random() * topCorals.length)];
    return winner;
  }

function showResult() {
    const coralType = calculateResult();

    resultName.textContent = coralType;
    const descriptions = {
        "branch": "You are outgoing and a natural leader, always reaching out and connecting with others. You thrive in lively environments and love to grow fast.",
        "brain": "You are thoughtful and wise, a deep thinker who values stability and problem-solving. Others look to you for guidance and calm in turbulent times.",
        "mushroom": "You are independent and laid-back, comfortable standing alone and moving at your own pace. You value your personal space and freedom.",
        "staghorn": "You are energetic and adventurous, always eager to explore new opportunities and push boundaries. Your enthusiasm is contagious.",
        "elkhorn": "You are protective and dependable, a strong guardian who creates safe spaces for those around you. Loyalty is your hallmark.",
        "pillar": "You are steady and patient, standing tall through challenges. Your perseverance and resilience make you a pillar of strength.",
        "table": "You are welcoming and inclusive, creating spaces where everyone feels at home. Your social nature brings communities together.",
        "cup": "You are creative and unique, bringing color and artistry to your surroundings. Your imagination helps you adapt to any situation.",
        "fire": "You are passionate and bold, unafraid to take risks and stand out. Your fiery spirit inspires and energizes others.",
        "soft": "You are flexible and empathetic, flowing with change while maintaining your core values. You are the peaceful glue in any group."
    };

    /*
      const descriptions = {
        "staghorn": "Ambitious Go-Getter",
        "elkhorn": "Reliable Supporter",
        "finger": "Friendly Networker",
        "mushroom": "Independent Scholar",
        "brain": "Analytical Thinker",
        "carnation": "Visionary Idealist",
        "sea fan": "Social Butterfly",
        "sun": "Optimistic Motivator",
        "sea whip": "Adventurous Spirit",
        "organ pipe": "Organized Planner"
      };
    */

    resultImage.src = `assets/placeholder.jpeg`;
    resultImage.alt = coralType;

    resultSection.style.display = "flex";
}

startBtn.onclick = () => {
    landingScreen.style.display = "none";
    questionSection.style.display = "block";
    renderQuestion();
};
  
restartBtn.onclick = () => {
    currentQuestionIndex = 0;
    answers = [];
    resultSection.style.display = "none";
    landingScreen.style.display = "flex";
};