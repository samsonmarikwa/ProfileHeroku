$(document).ready(function() {

    var score = 0;
    var wins = 0;
    var losses = 0;

    // audio clips
    var clappingAudio = new Audio("assets/soundclip/Click2.wav");
    var disappointedAudio = new Audio("assets/soundclip/DisappointedCrowd.mp3");
    var upliftMusic = new Audio("assets/soundclip/Happytune.wav");
    var clickSound = new Audio("assets/soundclip/Click6.wav");
    var click1Sound = new Audio("assets/soundclip/Click5.wav");
    var click2Sound = new Audio("assets/soundclip/Click3.wav");
    var click3Sound = new Audio("assets/soundclip/Click4.wav");
    var click4Sound = new Audio("assets/soundclip/Click6.aiff");

    /* var btns = $("body").find("#imageBtn"); This statement can also be used to traverse the
    DOM tree to find the specified descendant of the selector preceding the .find() */
    var btns = $("#imageBtn");

    var randomNum = 0;
    var numOfCrystals = 4; // number of images known as 4.

    /*
    This function generates a random number and returns it to the calling statement. The random number chosen for the
    computer should be between 19 and 120 whereas that for the crystals should be 1 and 12.
    */
    function generateRandomNum(minNum, maxNum) {
        var randomNo = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
        return randomNo;
    }

    /*
    This function displays all the four numbers on the UI based on the type of number
    which can be the random number, win, loss or score passed through the displayType parameter
    */
    function displayUINumbers(displayType, num) {
        var spanTag = "<span>" + num + "</span>";
        var selector = "";
        if (displayType === "R") {
            selector = $(".random-blk");
        } else {
            if (displayType === "S") {
                selector = $(".score");
            } else {
                if (displayType === "W") {
                    selector = $(".wins");
                } else
                if (displayType === "L") {
                    selector = $(".losses")
                }
            }
        }
        selector.html("<span>" + num + "</span>");
    }

    /*
     * The on-click event which is attached to the crystal images will be fired
     * when one of the images is clicked. When each button is clicked, we read
     * a random number attribute. This is added to the score and the funtion checks
     * if there is a win or loss and restarts the game.
     */
    btns.on("click", ".image", function() {
        upliftMusic.pause();
        console.log($(this).attr('crystal-num'));

        switch ($(this).attr('crystal-num')) {
            case '1':
                {
                    clickSound.play();
                    break;
                }
            case '2':
                {
                    click1Sound.play();
                    break;
                }
            case '3':
                {
                    click2Sound.play();
                    break;
                }
            case '4':
                {
                    click3Sound.play();
                    break;
                }
            default:
                {
                    click4Sound.play();
                    break;
                }
        }


        var crystalRandomVal = $(this).attr('crystal-random-num'); // read random value
        console.log(crystalRandomVal);

        score += parseInt(crystalRandomVal); // increment score with crystal random value
        displayUINumbers("S", score);

        // test for win or loss and display the stats
        if (score === randomNum) {
            clickSound.pause();
            clappingAudio.play();
            wins++; // increment wins counter
            displayUINumbers("W", wins);
            $("img").remove(); // delete the crystal image element
            $(".notify").html("<h1>Win ... Game Restarting !!!</h1>"); // notify player game restarting
            setTimeout(main, 5000); // restart game in 5 secs
        } else {
            if (score > randomNum) {
                clickSound.pause();
                disappointedAudio.play();

                losses++; // increment losses counter
                displayUINumbers("L", losses);
                $("img").remove(); // delete the crystal image element
                $(".notify").html("<h1>Loss ... Game Restarting !!!</h1>");
                setTimeout(main, 5000); // restart game in 5 secs
            }
        }
        upliftMusic.play();
    });

    /*
     * The main function will create the crystals and initialise the random numbers and score.
     */
    function main() {
        upliftMusic.play();
        // generate target random number and display to UI
        randomNum = generateRandomNum(19, 120);
        displayUINumbers("R", randomNum);

        // initialise score to zero and display to UI
        score = 0;
        displayUINumbers("S", score);

        // create four crystals and add them to the UI one by one in a for loop.
        for (var x = 1; x <= numOfCrystals; x++) {

            // create an image tag for a crystal
            var crystalImg = $("<img>");

            // apply class image to style the crystal image
            crystalImg.addClass("image");

            // assign a source attribute for the image, that is the file name of the image.
            crystalImg.attr("src", "assets/imgs/crystal" + x + ".png");

            // assign a random number value to an attribute crystal-random-num
            crystalImg.attr("crystal-random-num", generateRandomNum(1, 12));

            // assign a number value to an attribute crystal-num
            crystalImg.attr("crystal-num", x);

            // Add the image attribute to the web page.
            btns.append(crystalImg);

        }

        $(".notify").html(""); // remove notification messages

    }

    main();

});