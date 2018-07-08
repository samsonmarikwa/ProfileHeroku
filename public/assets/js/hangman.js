$(function() {

    // audio clips
    var clappingAudio = new Audio("assets/soundclip/AudienceClapping.mp3");
    var disappointedAudio = new Audio("assets/soundclip/DisappointedCrowd.mp3");
    var spangledBanner = new Audio("assets/soundclip/TheStarSpangledBanner.mp3");
    var upliftMusic = new Audio("assets/soundclip/UpliftingBackgroundMusic.mp3");

    spangledBanner.play();

    var statesWon = 0; // number of states the user got right
    var statesLost = 0; // number of states the user got wrong
    var trialsAllowed = 0;
    var correctLettersPicked = 0;
    var correctLetters = [];

    var statePicked = "";
    var stateNameVar = "";
    var letters = "";

    var guessControl = 0;
    var quarantine = [];

    var statesRemaining = 0; // number of games remaining before the game ends.
    // This is the number of states in the array.

    var statesArray = []; // create global array of states
    var alphabets = [];

    /*
    This function initializes all variables
    */
    function init() {

        statePicked = ""; // initialize global variable of state picked name
        statesWon = 0; // number of states the user got right
        statesLost = 0; // number of states the user got wrong    
        statesRemaining = 0; // number of games remaining before the game ends.
        // This is the number of states in the array.
        correctLettersPicked = 0;
        trialsAllowed = 0;
        guessControl = 0;

        document.getElementById("guess-remaining").innerHTML = statesRemaining.toString();
        document.getElementById("wins").innerHTML = statesWon.toString();
        document.getElementById("losses").innerHTML = statesLost.toString();

        quarantine = [];
        letters = "";
        initAlphabets("quarantined");

        statesArray = []; // create global array of states
        initStates(['DELAWARE', 'PENNSYLVANIA', 'NEW JERSEY', 'GEORGIA', 'CONNECTICUT',
            'MASSACHUSETTS BAY', 'MARYLAND', 'SOUTH CAROLINA', 'NEW HAMPSHIRE', 'VIRGINIA',
            'NEW YORK', 'NORTH CAROLINA', 'RHODE ISLAND AND PROVIDENCE PLANTATIONS'
        ]); // create global array of states)
        alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];

        letters = alphabets.join("");

        initAlphabets("available");

    }

    /*
    This function creates the alphabetic array and calls the function to update the user interface
    */
    function initAlphabets(pool) {

        // populate the letters list on the UI

        if (pool == "available") {
            document.getElementById("letters-availed").innerHTML = "";
            document.getElementById("letters-availed").innerHTML = letters;
        } else if (pool == "quarantined") {
            document.getElementById("quarantined-letters").innerHTML = "";
            document.getElementById("quarantined-letters").innerHTML = letters;
        }
    }

    /*
    This function populates the statesArray with the 13 states to be played in the game
    */
    function initStates(array) {
        statesArray = array;
        statesRemaining = statesArray.length; // number of games remaining before the game ends.
        // This is the number of states in the array.
    }

    /*
    This function displays the state name the user got right to the State List
    */
    function addTableRow(correctStateName) {
        var table = document.getElementById("t01");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = correctStateName;
    }

    /*
    This function allows the computer to pick a random state and formats the input area
    with dashes equivalent to the length of the state picked. The picked state is removed
    from the array so that it is not picked again.
    */
    function pickRandomState() {
        // pick up a random state
        /*********** need to trap errors. ***** */

        var stateName = "";
        var placeHolder = "";
        try {
            stateName = statesArray[Math.floor(Math.random() * statesArray.length)];

            correctLetters.splice(0, correctLetters.length); // remove elements

            for (var count = 0; count < stateName.length; count++) {
                correctLetters[count] = "-  ";
            }

            placeHolder = correctLetters.join("");

            document.getElementById("input").innerHTML = "";
            document.getElementById("input").innerHTML = placeHolder;

            /* set the number of errors the user is allowed before the computer displays the random picked state
            and picks the next state. The user will be allowed the number of characters as the chance to enter the correct state picked.
            */

            // sort state name and retain unique characters to determine the correct count

            var sortState = stateName.split("").sort();
            sortState = sortState.filter(function(item, index, self) {
                return self.indexOf(item) == index;
            });
            var newVar = sortState.join("").trim();

            trialsAllowed = newVar.length; // to determine correct count
            guessControl = newVar.length;
            correctLettersPicked = 0;

            statesRemaining = statesArray.length; // reset the statesRemaining
            document.getElementById("guess-remaining").innerHTML = statesRemaining.toString();
            document.getElementById("message").innerHTML = trialsAllowed.toString() + " Typed Wrong Letters Allowed For The State Picked By The Computer";


            statesArray.splice(statesArray.indexOf(stateName), 1); // find position of the stateName in the statesArray and remove it

        } catch (err) {
            statesRemaining = 0;

        } finally {

            return stateName;
        }
    }

    /*
    This function handles the user guess by allowing the user to enter the letters
    in the state picked by the computer
    */
    function userGuess(typedLetter, stateName) {

        var newStateVar = "";

        try { // trap errors
            // capture the key the user has typed

            // check if key is in quarantine
            if (quarantine.indexOf(typedLetter) > -1) {
                throw "You cannot type a quarantined letter as it is not in the state name picked";
            }

            // check if key is in correct letters
            if (correctLetters.indexOf(typedLetter) > -1) {
                throw "You cannot type a letter that is in the input already";
            }

            if (alphabets.indexOf(typedLetter) <= -1) {
                throw "Letter is not in the Available letters pool";
            }

            if (stateName.indexOf(typedLetter) > -1) {
                /*
                Typed letter exist in the statePicked string variable
                */

                for (var count = 0; count < statePicked.length; count++) {
                    if (typedLetter == statePicked.substr(count, 1)) {
                        if (correctLetters[count] == "-  ") {
                            correctLetters[count] = typedLetter + "  ";
                        }
                    }
                }

                placeHolder = correctLetters.join("");

                document.getElementById("input").innerHTML = "";
                document.getElementById("input").innerHTML = placeHolder;
                // split the statePicked into an array separated by the typed letter

                for (var y = 0; y <= stateName.length; y++) {
                    if (stateName.substr(y, 1) != typedLetter) {
                        newStateVar = newStateVar + stateName.substr(y, 1);
                    }
                }
                stateName = newStateVar;

                ++correctLettersPicked;

                // put letter in the correct position of the input prompt area to match
                // where the letter occurs in the state        

            } else {
                /*
                Typed letter does not exist in the statePicked string variable
                */

                quarantine.push(typedLetter); // add the typed letter to the quarantine
                letters = quarantine.join("");
                initAlphabets("quarantined"); // display letters in quarantine

                --trialsAllowed;
                //display trialsAllowed
                document.getElementById("message").innerHTML = "You now have " + trialsAllowed + " guesses left";
            }

            if ((correctLettersPicked >= guessControl) || (trialsAllowed <= 0)) {
                if (correctLettersPicked >= guessControl) {
                    clappingAudio.play();
                    ++statesWon;
                    addTableRow(statePicked); // list the state the user got right on the UI

                    document.getElementById("wins").innerHTML = statesWon;
                }
                if (trialsAllowed <= 0) {

                    disappointedAudio.play(); // play crowd disappointment soundclip
                    ++statesLost;
                    document.getElementById("losses").innerHTML = statesLost;
                    document.getElementById("message").innerHTML = "The computer picked: " + statePicked;
                }
                statePicked = pickRandomState();
                stateNameVar = statePicked;
                stateName = statePicked;
                quarantine = [];
                alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
                ];
                letters = alphabets.join("");
                initAlphabets("available");
                letters = "";
                initAlphabets("quarantined");
            } else {
                // remove typed letter from the pool of alphabets so it is not available
                alphabets.splice(alphabets.indexOf(typedLetter), 1);
                letters = alphabets.join("");
                initAlphabets("available");

            }
        } catch (err) {
            document.getElementById("message").innerHTML = err;
        } finally {

            return stateName;
        }
    }

    /*
    Main process
    */

    document.onkeyup = function(event) {

        document.getElementById("message").innerHTML = "";

        var keyTyped = event.keyCode || event.which;

        document.getElementById("guess-remaining").innerHTML = statesRemaining;

        if (keyTyped == 16) {
            var numberOfRows = document.getElementById("t01").getElementsByTagName("tr").length;
            console.log("Number of rows in table: " + numberOfRows);
            for (var x = numberOfRows - 1; x > 0; x--) {
                if (numberOfRows > 0) {
                    console.log("row to be deleted: " + x);
                    document.getElementById("t01").deleteRow(x);
                }
            }
            document.getElementById("game-result-txt").innerHTML = "";
            init();
            statePicked = pickRandomState();
            stateNameVar = statePicked;
        }

        if (keyTyped >= 65 && keyTyped <= 90) {
            stateNameVar = userGuess(String.fromCharCode(keyTyped).toUpperCase(), stateNameVar);
        }

        if (statesWon >= 13 && statesRemaining <= 0) {
            spangledBanner.play();
            document.getElementById("game-result-txt").innerHTML = "WINNER - All states played. You the champion!!!";
            document.getElementById("guess-remaining").innerHTML = statesRemaining.toString();
            document.getElementById("wins").innerHTML = statesWon.toString();
            document.getElementById("losses").innerHTML = statesLost.toString();
        }

        if (statesLost > 0 && statesRemaining <= 0) {
            upliftMusic.play();
            document.getElementById("game-result-txt").innerHTML = "LOST GAME - Some states were not correct";
            document.getElementById("guess-remaining").innerHTML = statesRemaining.toString();
            document.getElementById("wins").innerHTML = statesWon.toString();
            document.getElementById("losses").innerHTML = statesLost.toString();
        }
    }

});