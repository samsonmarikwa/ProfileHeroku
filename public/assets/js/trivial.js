$(document).ready(function() {
    //declare variables
    var randomNum; // pick random questions from questions array
    var correctAnsCnt; // count correct answers
    var incorrectAnsCnt; // count incorrect answers
    var unAnsQuestionCnt; // count unanswered questions
    var choice; // record the answer index number selected by the user
    var timerId; // timerId to wait for the user to choose answer
    var secondsElapsed; // seconds elapsed counter

    // init variables
    correctAnsCnt = 0;
    incorrectAnsCnt = 0;
    unAnsQuestionCnt = 0;
    timerId = 0;
    secondsElapsed = 10;

    // declare questions array
    var questions = [];

    // declare two dimensional array for answers. Each question has 4 multiple choices.
    var answers = [];

    // declare array with correct answers index numbers to the answers array
    var CorrectChoice = [];

    // declare array with image sources of the correct answers
    var Images = [];


    /*
     * The function allows the user to select an answer from a ul. The answer will be check
     * if its correct and a feedback function is called with a parameter. A respective counter
     * is accumulated. The function calls start so the next question is prepared.
     */
    function selectAnswer() {

        // set choice to index number of the clicked li element
        choice = $(this).index();

        // check if the answer is correct
        if (choice === CorrectChoice[randomNum]) {
            correctAnsCnt++; // increment correct answers counter 

            displayFeedback("CORRECT"); // display feedback on correct answer

        } else {

            displayFeedback("INCORRECT");

            incorrectAnsCnt++; // increment incorrect answers counter
        }

        // since a selection has been made, clear the interval and delay the start of the next question
        // so as to display the feedback for 5 seconds
        clearInterval(timerId);
        var messageTimer = setTimeout(function() {
            clearTimeout(messageTimer);
            start();
        }, 5000);
    }

    /*
     * Retrieves the correct answer from the answers array using the random number which
     * was used to pull out the question.
     */
    function getAnswer(num) {
        return answers[num][CorrectChoice[num]];
    }

    /*
     * Retrieves the image matching the answer using the random number which
     * was used to pull out the question.
     */
    function getImage(num) {
        return Images[num];
    }

    /*
     * function display feedback on the answer selected or when the user does not
     * respond in time to the question.
     */
    function displayFeedback(fdbk) {

        // hide answers-div
        $(".answers-div").css("display", "none");

        // display feedback div
        $(".feedback-div").css("display", "block");
        $("#seconds-elapsed").html("<strong>Time Remaining: " + secondsElapsed + " seconds</strong>");

        if (fdbk === "TIMEOUT") {
            $("#feedback1").html("<h2><strong>" + secondsElapsed + "secs - Out of Time !!!</strong></h2>");

            //display correct answer
            $("#feedback2").html("<h2><strong>The correct answer is: " + getAnswer(randomNum) + " </strong></h2>");
        } else if (fdbk === "CORRECT") {
            $("#feedback1").html("<h2>" + secondsElapsed + "secs - Correct!!!</h2>");
            $("#feedback2").html("<h2><strong>The correct answer is: " + getAnswer(randomNum) + " </strong></h2>");
        } else {

            $("#feedback1").html("<h2><strong>" + secondsElapsed + "secs - Nope!!!</strong></h2>");

            //display correct answer
            $("#feedback2").html("<h2><strong>The correct answer is: " + getAnswer(randomNum) + " </strong></h2>");
        }
        //display image
        $("#image").html("<img src='" + getImage(randomNum) + "' height='280' width='350'>");

        // a processed question should be deleted from the questions array
        deleteQuestion(randomNum);

    }

    /*
     * Delete an asked question from the questions array and all related elements from the
     * other arrays.
     */
    function deleteQuestion(num) {

        questions.splice(num, 1);
        answers.splice(num, 1);
        CorrectChoice.splice(num, 1);
        Images.splice(num, 1);

    }

    /*
     * display results from the test
     */
    function results() {

        $(".answers-div").css("display", "none");
        $(".feedback-div").css("display", "none");

        $(".start-over-div").css("display", "block");

        $("#correct").html("<strong>" + correctAnsCnt + "</strong>");
        $("#incorrect").html("<strong>" + incorrectAnsCnt + "</strong>");
        $("#unanswered").html("<strong>" + unAnsQuestionCnt + "</strong>");

    }

    /*
     * executed when the Start utton is clicked. Function can also be initiated without
     * a button click in order to pick up the next question. When the function is initiated
     * through a button click.
     */
    function start() {

        if (questions.length != 0) {

            getQuestion();
            secondsElapsed = 10;
            timerId = setInterval(function() {

                $("#seconds-elapsed").html("<strong>Time remaining: " + secondsElapsed + " seconds</strong>");
                secondsElapsed--; //  decrement seconds counter

                if (secondsElapsed === 0) {
                    unAnsQuestionCnt++;

                    displayFeedback("TIMEOUT");
                    clearInterval(timerId);
                    var messageTimer = setTimeout(function() {
                        clearTimeout(messageTimer);
                        start();
                    }, 5000);
                }
            }, 1000); // delay 1 second with the results displayed
        } else {
            results();
        }

    }


    /*
     * executes when the restart button is clicked. variables and arrays are re-initialized.
     * the function then calls the start function.
     */
    function restart() {
        correctAnsCnt = 0;
        incorrectAnsCnt = 0;
        unAnsQuestionCnt = 0;

        populateArrays();
        clearInterval(timerId);
        start();

    }


    /*
     * retrieve a question from the questions array using a random number and display multiple
     * choice answers.
     */
    function getQuestion() {

        // get random number to pick up question from array
        randomNum = Math.floor(Math.random() * questions.length);

        // hide answers, feedback and start-over divs
        $(".start-div").css("display", "none");
        $(".feedback-div").css("display", "none");
        $(".start-over-div").css("display", "none");

        // display questions div
        $(".answers-div").css("display", "block");
        $("#question").html("<h2>" + questions[randomNum] + "</h2>");

        // display multiple choice answers
        $("#answers-choice").html("<ul id='choice'>");
        for (let answer of answers[randomNum]) {
            $("ul").append("<li id='selection'><a href='#'>" + answer + "</a></li>");
        }
    }


    /*
     * Put data into the arrays
     */
    function populateArrays() {

        questions = ["Who is Chuck Noris?",
            "Who is Taylor Swift?",
            "What is Barack Obama known for?",
            "Who was Albert Einstein?",
            "Where is Cecil John Rhodes buried?",
            "Which is out of place?",
            "Donald Trump inaugurated as President of The United States?",
            "The first team to land on the moon",
            "American champion who fought in Rumble of the jungle",
            "How many states are there in the USA as of 2018?"
        ];

        answers = [
            ["An Actor", "A Singer", "The Massachusets Former Governor", "A Lakewood Church Pastor"],

            ["An Olympic Gold Medalist", "A Tennis No.1 seed", "A Singer", "The US Ambassador to United Nations"],

            ["An Actor", "The Inventor of Linux Operating System", "The US Ambassador to United Nations", "The President of United States"],

            ["A Theoretical physicist", "A Germany Evangelist", "A German Chancellor", "A Bulb Inventor"],

            ["Zimbabwe Matopo Hills", "St George's Chapel, Windsor Castle", "Andrew Johnson National Cemetery", "Queen Victoria Falls, Zimbabwe"],

            ["North Carolina", "New York", "London", "New Jersey"],
            ["November 2016", "January 2017", "December 2016", "January2016"],
            ["Neil Armstrong, Mike Collins & Buzz Aldrin", "Lance Armstrong, Mike Collins & Neil Armstrong", "John F Kennedy, Niel Armstrong & Mike Collins", "Yuri Gagarin, Neil Armstrong & Buzz Aldrin"],
            ["Mike Tyson", "Muhammad Ali", "Evander Holyfield", "Floyd Mayweather Jnr"],
            ["52 states", "51 states", "53 states", "50 states"]
        ];

        CorrectChoice = [0, 2, 3, 0, 0, 2, 1, 0, 1, 3];

        Images = ["assets/imgs/ChuckNorris.gif", "assets/imgs/Taylor.gif", "assets/imgs/Obama.gif", "assets/imgs/Albert.gif", "assets/imgs/Matobo.jpg", "assets/imgs/London.gif", "assets/imgs/Trump.jpg", "assets/imgs/astronauts.jpg", "assets/imgs/rumble.jpg", "assets/imgs/usamap.png"];

    }


    populateArrays(); // populate arrays with data

    // listen for button clicks
    $("body").on("click", "#btn-start", start);
    $("body").on("click", "#selection", selectAnswer);
    $("body").on("click", "#btn-restart", restart);

});