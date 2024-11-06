const questions =[
  {
    question: "What is correct syntax of for loop",
    answers:[
      {text:"for(initial;condition;increament)", correct: true},
      {text:"for(condition;initial;increament)", correct: false},
      {text:"for(initial;increament;condition)", correct: false},
      {text:"None of the above", correct: false}
    ]
  },
  {
    question: "What is correct syntax of if",
    answers:[
      {text:"if(statement)", correct: false},
      {text:"if(condition)", correct: true},
      {text:"IF(condition)", correct: false},
      {text:"None of the above", correct: false}
    ]
  },
  {
    question: "Find the odd one out",
    answers:[
      {text:"C++", correct: false},
      {text:"Java", correct: false},
      {text:"Python", correct: false},
      {text:"HTML", correct: true}
    ]
  },
  {
    question: "How many pillars does OOPs has",
    answers:[
      {text:"3", correct: false},
      {text:"5", correct: false},
      {text:"4", correct: true},
      {text:"2", correct: false}
    ]
  }
];

const questionElement =document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score=0;

function startQuiz()
{
  currentQuestionIndex=0;
  score=0;
  nextButton.innerHTML="Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex+1;
  questionElement.innerHTML=questionNo+". "+currentQuestion.question;

  currentQuestion.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
      button.dataset.correct=answer.correct;
    }
    button.addEventListener("click",selectAnswer);
  });
}

function resetState(){
  nextButton.style.display="none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e){
  const selectedbtn=e.target;
  const iscorrect=selectedbtn.dataset.correct==="true";
  if(iscorrect){
    selectedbtn.classList.add("correct");
    score++;
  }
  else{
    selectedbtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button=>{
    if(button.dataset.correct==="true"){
      button.classList.add("correct");
    }
    button.disabled=true;
  });
  nextButton.style.display="block";
}

function showScore(){
  resetState();
  questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML="Play Again";
  nextButton.style.display="block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex<questions.length)
    showQuestion();
  else{
    showScore();
  }
}


nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex<questions.length){
    handleNextButton();
  }
  else{
    startQuiz();
  }
})

startQuiz();