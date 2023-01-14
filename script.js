let cancelIcon = `
<svg class= 'icon times' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>`

let correctIcon = `
<svg class= 'icon correct' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>`

//data
let Questions = [
    {
        id: 1,
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language"
        ]
    },
    {
        id: 2,
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheet",
        options: [
            "Common Style Sheet",
            "Colorful Style Sheet",
            "Computer Style Sheet",
            "Cascading Style Sheet"
        ]
    },
    {
        id: 3,
        question: "What does PHP stand for?",
        answer: "Hypertext Preprocessor",
        options: [
            "Hypertext Preprocessor",
            "Hypertext Programming",
            "Hypertext Preprogramming",
            "Hometext Preprocessor"
        ]
    },
    {
        id: 4,
        question: "What does SQL stand for?",
        answer: "Structured Query Language",
        options: [
            "Stylish Question Language",
            "Stylesheet Query Language",
            "Statement Question Language",
            "Structured Query Language"
        ]
    },
    {
        id: 5,
        question: "What does XML stand for?",
        answer: "extensible Markup Language",
        options: [
            "executable Multiple Language",
            "exTra Multi-Program Language",
            "extensible Markup Language",
            "examine Multiple Language"
        ]
    },
];


const start = document.querySelector('.start');
const rules = document.querySelector('.rules');
const exitBtn = document.querySelector('.btn-exit');
const continueBtn = document.querySelector('.btn-continue');
const quizTab = document.querySelector('.quiz-tab');
const time = document.querySelector('.time');
const question = document.querySelector('.question');
const track = document.querySelector('.track');
const answers= document.querySelector('.answers');
const nxtQuizBtn = document.querySelector('.nxtQuiz');
const points = document.querySelector('.points');
const done = document.querySelector('.done');
const quit = document.querySelector('.quit-btn')

let value = 0;
let ques = Questions[value];
let alreadyClicked= false;
let count;
let timer;


start.addEventListener('click', () => {
  start.style.display= 'none';
  rules.style.display= 'block';
})

exitBtn.addEventListener('click', () => {
  rules.style.display= 'none';
  start.style.display = 'block'
} )

continueBtn.addEventListener('click', () => {
  rules.style.display= 'none';
  count = 0;
  generateQuiz()
})

function generateQuiz() {
  question.textContent = ques.question;
  answers.innerHTML= ''
  ques.options.forEach( item => {
    answers.innerHTML += `<p class= "answer">${item}</p>`
  })
  quizTab.style.display= 'block';
  track.textContent= `${value + 1} of ${Questions.length} Questions`
  setTime()

  const answerOptions= document.querySelectorAll('.answer');
  answerOptions.forEach(item => {
    alreadyClicked = false;
    //
    item.addEventListener('click', () => {
      nxtQuizBtn.style.display = 'block';
      if(item.textContent === ques.answer && !alreadyClicked){
        item.classList.remove('answer');
        item.classList.add('answer-correct');
        item.innerHTML += correctIcon;
        alreadyClicked = true;
        count += 1;
      } else if(item.textContent !== ques.answer && !alreadyClicked){
        item.classList.remove('answer');
        item.classList.add('answer-wrong');
        item.innerHTML += cancelIcon;
        alreadyClicked = true;
        answerOptions.forEach(item => {
          if(item.textContent === ques.answer){
            item.classList.remove('answer');
            item.classList.add('answer-correct');
            item.innerHTML += correctIcon;
          }
        })
      }
    }) 
  })
}

//next button click event 
nxtQuizBtn.addEventListener('click', nxtFunction)

function nxtFunction(){
  clearInterval(timer)
  value = value + 1;
  ques = Questions[value];
  
  if(value == Questions.length) {
    quizTab.style.display= 'none';
    done.style.display= 'block'
    points.textContent= `${count} out of ${Questions.length}`
    value = 0;
    ques = Questions[value];
  } else {
    generateQuiz();
    nxtQuizBtn.style.display= 'none';
  }
}

//quit button click event
quit.addEventListener('click', () => {
  done.style.display = 'none';
  start.style.display= 'block'
})

function setTime() {
  timeCount= 16;
  timer = setInterval(() => {
    timeCount -= 1
    time.textContent= timeCount;
    if (timeCount == 0){
      clearInterval(timer)
      nxtFunction()
    }
  }, 1000)
}
