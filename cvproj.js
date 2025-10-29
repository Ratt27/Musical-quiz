const quizData = {
  Indian_classical: [
    {
      question: "Which raga is typically performed in the early morning?",
      options: ["Raag Bhairavi", "Raag Bhairav", "Raag Yaman", "Raag Bageshree"],
      answer: 1
    },
    {
      question: "Which instrument is NOT used in Hindustani classical music?",
      options: ["Tabla", "Sitar", "Santoor", "Mridangam"],
      answer: 3
    },
    {
      question: "Who is known as the 'Father of Indian Classical Music'?",
      options: ["Tansen", "Ravi Shankar", "Miyan Tansen", "Bismillah Khan"],
      answer: 0
    }
  ],
  Indian_folk: [
    {
      question: "Which Indian state is known for the folk dance Bihu?",
      options: ["Punjab", "Gujarat", "Assam", "Odisha"],
      answer: 2
    },
    {
      question: "Which is a traditional Rajasthani folk music style?",
      options: ["Lavani", "Dandiya", "Maand", "Yakshagana"],
      answer: 2
    },
    {
      question: "Baul music is a folk tradition of which Indian state?",
      options: ["West Bengal", "Maharashtra", "Kerala", "Punjab"],
      answer: 0
    }
  ],
  Rabindrasangeet: [
    {
      question: "Who composed Rabindra Sangeet?",
      options: ["Kazi Nazrul", "Rabindranath Tagore", "Lata Mangeshkar", "Dwijendralal Roy"],
      answer: 1
    },
    {
      question: "Which of these is a popular Rabindra Sangeet theme?",
      options: ["Revolution", "Love and Devotion", "War", "Nature Destruction"],
      answer: 1
    },
    {
      question: "Rabindra Sangeet is primarily sung in which language?",
      options: ["Hindi", "Sanskrit", "Bengali", "Marathi"],
      answer: 2
    }
  ]
};

const quizType = localStorage.getItem("quizType") || "Indian_classical";
const questions = quizData[quizType];
let questionNumber = parseInt(localStorage.getItem("questionNumber")) || 1;
let score = parseInt(localStorage.getItem("score")) || 0;
let hasAnswered = false;

function loadQuestion() {
  const current = questions[questionNumber - 1];
  if (!current) return;

  hasAnswered = false;

  document.getElementById("question").textContent = current.question;
  current.options.forEach((opt, i) => {
    const out = document.getElementById(`option${i + 1}out`);
    const inner = document.getElementById(`option${i + 1}`);
    out.classList.remove("rightanswer", "wronganswer");
    inner.textContent = opt;
  });

  document.getElementById("score").textContent = `${score}/${questions.length}`;
}

function selectoption(index) {
  if (hasAnswered) return;
  hasAnswered = true;

  const current = questions[questionNumber - 1];
  const correctIndex = current.answer;

  if (index === correctIndex) {
    document.getElementById(`option${index + 1}out`).classList.add("rightanswer");
    score++;
    localStorage.setItem("score", score);
  } else {
    document.getElementById(`option${index + 1}out`).classList.add("wronganswer");
    document.getElementById(`option${correctIndex + 1}out`).classList.add("rightanswer");
  }

  document.getElementById("score").textContent = `${score}/${questions.length}`;
}

function nextquestion() {
  if (questionNumber < questions.length) {
    questionNumber++;
    localStorage.setItem("questionNumber", questionNumber);
    loadQuestion();
  } else {
    window.location.href = "score.html";
  }
}

function previousquestion() {
  if (questionNumber > 1) {
    questionNumber--;
    localStorage.setItem("questionNumber", questionNumber);
    loadQuestion();
  }
}

function quitquiz() {
  localStorage.clear();
  window.location.href = "cvproj2.html";
}

window.onload = loadQuestion;

