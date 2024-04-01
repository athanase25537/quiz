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
        this.life = 3;
        this.lvl = 1;
        this.lvlMax = 3;
    }

    getCurrentQuestion()
    {
        return this.questions[this.currentIndex];
    }

    gameEnd()
    {
        return this.currentIndex == this.questions.length || this.life == 0;
    }

    guess(answer)
    {
        if(answer === this.getCurrentQuestion().answer){
            this.score++;
            this.currentIndex++;
            return true;
        } else this.life--;

        this.currentIndex++;
        return false;
    }

    nextLvl()
    {
        return this.lvl++;
    }
}

const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
    data = JSON.parse(this.responseText);
    let quiz = new Quiz(makeQuestion(data));
    let endCont = document.querySelector('#end');

    quizApp(quiz, endCont);
    return;
}
xhttp.open("GET", "src/lvl/lvl1.php");
xhttp.send();


function quizApp(quiz, endCont) {

    if(quiz.gameEnd()){
        console.log(quiz.lvl);
        container = document.querySelector('.container');
        container.classList.add('hide');
        endCont.classList.add('show');
        scoreToDisplay = quiz.score * 100 / quiz.questions.length;
        display('score', scoreToDisplay.toFixed(0));
        let btn = document.querySelector('#end button');

        if(quiz.life>0 && quiz.lvl < quiz.lvlMax) {
            btn.textContent = 'Niveau Suivant';
            nextLevel(quiz);
        }else if(quiz.life == 0) {
            btn.textContent = 'Reessayer';
        }else {
            btn.textContent = 'Recommencer';
        }

        btn.addEventListener('click', () => {
            container.classList.remove('hide');
            endCont.classList.remove('show');
            if(btn.textContent == 'Niveau Suivant') {

                xhttp.onload = function() {
                    data = JSON.parse(this.responseText);
                    quiz.questions = makeQuestion(data);
                    quiz.currentIndex  = 0;
                    quiz.score = 0;
                    quizApp(quiz, endCont);
                };
                xhttp.open("GET", `src/lvl/lvl${quiz.lvl}.php`);
                xhttp.send();
            }else if(btn.textContent === 'Reessayer') {
                quiz.score = 0;
                quiz.currentIndex = 0;
                quiz.life = 3;
                quizApp(quiz, endCont);
            } else reStart();
        });

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
                    quizApp(quiz, endCont);
                    choix.parentElement.style.zIndex = 1;
                }, 500);
            }
            display('c' + i, choices[i]);
        }
        
    }
}


function display (id, content){
    let element = document.getElementById(id);
    element.textContent = content;
}

function reStart() {
    location.reload();
}

function nextLevel(quiz) {
    quiz.nextLvl();
}

function makeQuestion(data) {
    let max = data.length
    let questions = [];

    for(i=0; i<max; i++) {
        d = data[i];
        questions[i] = new Question(d.question, d.choices.split(','), d.answer);
    }

    return questions;
}