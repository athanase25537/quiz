const progressBar = document.querySelector('.img .progress .innerProgress');

// Questions
class Question
{
    constructor(question, choices, answer)
    {
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrect (choice) 
    {
       return choice === this.answer.trim(); 
    }
}

class Quiz
{
    constructor(questions)
    {
        this.questions = questions;
        this.score = 0;
        this.currentIndex = 0;
    }

    getCurrentQuestion()
    {
        return this.questions[this.currentIndex];
    }

    gameEnd()
    {
        return this.currentIndex == this.questions.length;
    }

    guess(answer)
    {
        if(answer === this.getCurrentQuestion().answer){
            this.score++;
            this.currentIndex++;
            return true;
        }

        this.currentIndex++;
        return false;
    }
}

const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
    data = JSON.parse(this.responseText);
    let max = data.length
    let questions = [];

    for(i=0; i<max; i++) {
        d = data[i];
        questions[i] = new Question(d.question, d.choices.split(','), d.answer);
}

    let quiz = new Quiz(questions);
    let endCont = document.querySelector('#end');

    function display (id, content){
        let element = document.getElementById(id);
        element.textContent = content;
    }

    quizApp = () => {
        if(quiz.gameEnd()){
            let container = document.querySelector('.container');
            container.style.display = 'none';
            endCont.style.opacity = '1';
            endCont.style.zIndex = '2';
            endCont.style.display = 'flex';
            scoreToDisplay = quiz.score * 100 / quiz.questions.length;
            display('score', scoreToDisplay.toFixed(0));
        }else{
            display('progress', 'Question ' + (quiz.currentIndex + 1) + '/' + quiz.questions.length);
            progressBar.style.height = (quiz.currentIndex + 1) * 100 / quiz.questions.length + '%'
            display('q', quiz.getCurrentQuestion().question);

            let choices = quiz.getCurrentQuestion().choices;
            for(let i=0; i<choices.length; i++){
                let choix = document.getElementById('c' + i);
                choix.onclick = (e) => {
                    let a = quiz.guess(choices[i].trim());
                    if(a) className = 'success';
                    else className = 'failure';
                    e.target.classList.add(className);

                    choix.parentElement.style.zIndex = -2; // to make click invalid

                    setTimeout(() => {
                        e.target.classList.remove(className);
                        quizApp();
                        choix.parentElement.style.zIndex = 1;
                    }, 1000);
                }
                display('c' + i, choices[i]);
            }
            
        }
    }

    quizApp();
}
xhttp.open("GET", "questions.php");
xhttp.send();

function reStart() {
    location.reload();
}