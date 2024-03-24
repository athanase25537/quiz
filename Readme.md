# Base des donees
    -> base name
        quiz
    -> table name
        question_stat
        --> table colonne
            id: int -> auto-increment
            question -> text: ex: "Quel fruit est jaune?"
            choices -> text: 4 words separated by coma "," ex: "pomme, mangue, peche, banane"
            answer -> text: ex: "banane"