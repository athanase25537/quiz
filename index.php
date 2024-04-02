<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz</title>
    <link rel="stylesheet" href="src/css/style.css">
    <link rel="stylesheet" href="src/css/all.css">
</head>
<body>
   

    <div class="container">
        <div class="img">
            <div class="progress">
                <div class="innerProgress"></div>
            </div>
            <img src="src/imgs/quiz.jpg" alt="">
        </div>

        <div class="text">  
            <div id="question">
                <h3 id="progress"></h3>
                <h1 id="q"></h1>
            </div>
            <section id="choices">
                <div class="choice" id="c0"></div>
                <div class="choice" id="c1"></div>
                <div class="choice" id="c2"></div>
                <div class="choice" id="c3"></div>
            </section>
        </div>
    </div>

    <div id="end">
        <div class="img"></div>
        <div class="content">
            <h1>Merci d'avoir fait ce quiz</h1>
            <p>Vous avez obtenu <strong id="score"></strong>%</p>
            <button class="btn">Next Level</button>
        </div>
    </div>


    <script src="src/js/script.js"></script>
</body>
</html>