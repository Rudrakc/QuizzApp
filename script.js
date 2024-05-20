let questions = [
    {
      question: "How is the shortest in our group?",
      choice1: "Manjari",
      choice2: "Kushagra",
      choice3: "Param",
      choice4: "Rudra",
      answer: 3,
    },
    {
      question: "Who likes Avacardo the most?",
      choice1: "Param",
      choice2: "Manjari",
      choice3: "Rudra",
      choice4: "Ankur",
      answer: 4,
    },
    {
      question: "Which one of them reads questionable mangas/manhwas?",
      choice1: "Kushagra",
      choice2: "Manjari",
      choice3: "Rudra",
      choice4: "Ankur",
      answer: 2,
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let availableQuestions = [...questions];
  
  const questionText = document.getElementById("question-text");
  const options = Array.from(document.getElementsByClassName("option"));
  const questionNumberText = document.querySelector(".question-number");
  const scoreText = document.querySelector(".score-number");
  const progressBar = document.getElementById("progress-bar");
  const totalQuestions = questions.length;
  
  const loadNewQuestion = () => {
    if (availableQuestions.length === 0) {
      localStorage.setItem("mostRecentScore", score);
      return window.location.assign("endPage.html");
    }
  
    currentQuestionIndex++;
    questionNumberText.innerText = `${currentQuestionIndex}/${questions.length}`;
    updateProgressBar();
  
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionText.innerText = currentQuestion.question;
  
    options.forEach((option) => {
      const number = option.dataset["number"];
      option.innerText = currentQuestion["choice" + number];
    });
  
    availableQuestions.splice(questionIndex, 1);
  };
  
  const updateProgressBar = () => {
    const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  };
  
  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      console.log(e.target);
      const selectedOption = e.target;
      const selectedAnswer = selectedOption.dataset["number"];
      console.log(selectedAnswer);
      if (selectedAnswer == currentQuestion.answer) {
        score += 10;
        selectedOption.style.backgroundColor = "#72d673";
      } else {
        selectedOption.style.backgroundColor = "#f7655f";
      }
  
      scoreText.innerText = score;
  
      setTimeout(() => {
        selectedOption.style.backgroundColor = "#F0F0F0";
        loadNewQuestion();
      }, 1000);
    });
  });
  
  loadNewQuestion();
  