// plate coral, branch coral, 

let currentQuestion = 0;
let finalType = "";

const scores = {
    "branch": 0,
    "brain": 0,
    "mushroom": 0,
    "elkhorn": 0,
    "pillar": 0,
    "table": 0,
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
const resultImage = document.getElementById('result-image');
const restartBtn = document.getElementById('restart-btn');
const shareButton = document.getElementById('share-btn');


let currentQuestionIndex = 0;
let answers = [];

const questions = [
  {
    question: "1) A tourist in flippers is river-dancing on fragile staghorn corals, humming 'Baby Shark.' What do you do?",
    options: [
      { text: "Tell them off politely, like a patient teacher.", corals: ["brain"] },
      { text: "Ignore it, drifting away with zen detachment.", corals: ["mushroom"] },
      { text: "Blast your dive horn and drag them out, shouting 'CORAL MURDERER!'", corals: ["fire"] },
      { text: "Kindly show them how to float properly, turning them into a friend.", corals: ["branch"] }
    ],
    id: 1
  },
  {
    question: "2) A giant washing machine floats by like Poseidon's abandoned furniture. A turtle eyes it suspiciously. How do you react?",
    options: [
      { text: "Scoop it up silently and sit on it like an ocean monarch.", corals: ["pillar"] },
      { text: "Drag it ashore and repaint it as funky art.", corals: ["soft"] },
      { text: "Yell at the speedboat that tossed it, threatening to curse them with barnacles.", corals: ["fire"] },
      { text: "Shrug and let the current take it.", corals: ["mushroom"] }
    ],
    id: 2
  },
  {
    question: "3) At dinner, your uncle brags about shark fin soup, and your aunt sings about turtle egg omelettes.",
    options: [
      { text: "Calmly explain biodiversity with a PowerPoint on your phone.", corals: ["brain"] },
      { text: "Slam the table and flip the soup dramatically.", corals: ["fire"] },
      { text: "Offer them your plant-based 'mock turtle curry' instead.", corals: ["table"] },
      { text: "Start a lively group debate and make everyone laugh, changing hearts with humor.", corals: ["branch"] }
    ],
    id: 3
  },
  {
    question: "4) Your village is holding a coral-planting day, complete with gamelan music and snacks.",
    options: [
      { text: "Grab a hammer and become team leader, planting corals like a boss.", corals: ["elkhorn"] },
      { text: "Arrange corals into smiley-face patterns, just for fun.", corals: ["soft"] },
      { text: "Join in quietly, focused on one coral frame at a time.", corals: ["pillar"] },
      { text: "Wander off to explore tide pools alone instead.", corals: ["mushroom"] }
    ],
    id: 4
  },
  {
    question: "5) A dive boat drops anchor smack on a coral bommie, shattering Porites like dropped pottery.",
    options: [
      { text: "Leap onto the boat and deliver a Shakespearean rant about mooring buoys.", corals: ["fire"] },
      { text: "Help the crew move the anchor gently, teaching them along the way.", corals: ["elkhorn"] },
      { text: "Take notes and submit a polite letter to the harbormaster.", corals: ["brain"] },
      { text: "Dive down and silently prop up the corals without saying a word.", corals: ["pillar"] }
    ],
    id: 5
  },
  {
    question: "6) Friends at the beach laugh: 'Corals are doomed anyway, so let's grill fish and forget it.'",
    options: [
      { text: "Show inspiring reef-restoration videos to give hope.", corals: ["table"] },
      { text: "Sketch a cartoon reef uprising where corals overthrow humans.", corals: ["soft"] },
      { text: "Sip your coconut in silence and stare at the horizon.", corals: ["mushroom"] },
      { text: "Shout: 'THE OCEAN WILL RISE AND SWALLOW YOUR GRILL!'", corals: ["fire"] }
    ],
    id: 6
  },
  {
    question: "7) A leaking tanker turns the sea rainbow-black. Flying fish are slip-n-sliding like bumper cars.",
    options: [
      { text: "Rally villagers to collect hair, leaves, and even coconuts to mop up the oil.", corals: ["elkhorn"] },
      { text: "Climb the ship mast and declare yourself 'Captain Cleanup.'", corals: ["fire"] },
      { text: "Analyze the currents, planning where to deploy booms for maximum effect.", corals: ["brain"] },
      { text: "Paint the oil drums with murals so people never forget.", corals: ["soft"] }
    ],
    id: 7
  },
  {
    question: "8) The community holds a 'Trash Alchemy Day,' where waste must be turned into something useful.",
    options: [
      { text: "Weave plastic strips into stylish tote bags.", corals: ["table"] },
      { text: "Glue bottle caps into a coral-shaped mosaic.", corals: ["soft"] },
      { text: "Build a compost pile and explain nutrient cycles with wild hand gestures.", corals: ["brain"] },
      { text: "Sneak off to nap under a mangrove tree cause where got time.", corals: ["mushroom"] }
    ],
    id: 8
  },
  {
    question: "9) A massive ghost fishing net drifts like a sea monster, trapping unlucky parrotfish.",
    options: [
      { text: "Rally your dive buddies and cut the net piece by piece.", corals: ["elkhorn"] },
      { text: "Work silently and tirelessly until every fish is freed.", corals: ["pillar"] },
      { text: "Haul the net up and dramatically set it on fire (on land).", corals: ["fire"] },
      { text: "Reuse the net to crochet hammocks for the community.", corals: ["soft"] }
    ],
    id: 9
  },
  {
    question: "10) Les Village holds a wacky eco-festival: people strut the runway in costumes made of recycled materials shaped like corals. What role do you play?",
    options: [
      { text: "Dress up as a flamboyant Sea Fan with swishing fabric.", corals: ["soft"] },
      { text: "Help everyone coordinate their outfits backstage.", corals: ["branch"] },
      { text: "Design a clever outfit that educates about coral bleaching.", corals: ["table"] },
      { text: "Sit in the audience, clapping politely while enjoying popcorn.", corals: ["mushroom"] }
    ],
    id: 10
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
    questionImage.src = "assets/question_images/scenario" + currentQ.id + ".png";
  
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
    finalType = coralType;

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

    resultImage.src = "assets/score_cards/" + coralType + ".png";
    resultImage.alt = coralType;

    resultSection.style.display = "flex";
}

startBtn.onclick = () => {
    landingScreen.style.display = "none";
    questionSection.style.display = "block";
    renderQuestion();
};
  

shareButton.addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Coral Personality Quiz",
        text: "Look I'm a " +  finalType + " coral.\nTry the Coral Personality quiz and see if we're friends or enemies!",
        url: "" // Or your specific results URL
      });
      // Optionally, thank the user or log analytics here
    } catch (err) {
      // Optionally handle share errors
      console.error('Error sharing:', err);
    }
  } else {
    // Provide a fallback (e.g., copy link or show manual app share buttons)
    alert('Sharing is not supported on this device or browser.');
  }
});