$(document).ready(function() { // ensure website has loaded before executing javascript
    /*
    main process
    */
    $("img").tooltip(); //enable tooltip which takes its value from the title of the image

    var topics = ["Barack Obama", "Donald Trump", "Hilary Rhodam Clinton", "Nigel Farage", "Emmanuel Macron", "David Cameron", "Theresa May"];

    // create buttons on the webpage for the topics elements
    for (var x = 0; x < topics.length; x++) {
        var btn = $("<button>");
        btn.text(topics[x]);
        btn.addClass("presetBtn");
        $("#preset-btns").append(btn);
    }

    // populate favorite gifs div from localStorage which the user may have saved
    var images = localStorage.getItem("images");
    var imgs = JSON.parse(images); // images have been stored as an array of strings JSON.stringify, hence need to be converted to array of objects

    //test if not null to avoid runtime errors
    if (imgs) {

        for (var x = 0; x < imgs.length; x++) {

            //create image
            var image = $("<img>");
            image.attr("src", imgs[x].src);
            image.attr("still", imgs[x].still);
            image.attr("animate", imgs[x].animate);
            image.attr("state", imgs[x].state);
            image.attr("title0", imgs[x].title0);
            image.attr("title", imgs[x].title);
            image.attr("rating", imgs[x].rating);
            image.attr("data-toggle", "tooltip");
            image.addClass("imageCls");

            // prepend the image to the div
            $("#favorite-gifs").prepend(image);

        }
    }

    // enable the favorite-gifs div to accept images and also to allow images to be dragged from it
    enableDraggableDroppable();


    /*
    EVENTS
    /*
    /*
    Establish a mouseover event that gets fired when a mouse moves over an image
    to display the image rating
    */
    $(document).on("mouseover", ".imageCls", function() {
        var rating = $(this).val(function() {
            return $(this).attr("rating");
        });
    });

    /*
    Click event on the image to change the status from still to animate
    */
    $(document).on("click", ".imageCls", function() {

        var imgState = $(this).attr("state");

        if (imgState == "still") {
            $(this).attr("state", "animate");
            $(this).attr("src", $(this).attr("animate"));
        } else {
            $(this).attr("state", "still");
            $(this).attr("src", $(this).attr("still"));
        }

    });


    /*
    click event for the Save Your Favorite button
    */
    $("body").on("click", "#savefavorites", function() {

        // get a collection of all images in the favorite-gifs
        var imagesFavorite = document.getElementById("favorite-gifs").getElementsByTagName('img');
        // create and array from the collection
        var imagesArr = Array.from(imagesFavorite);

        var images = []; // an array to hold the image objects

        //clear local storage
        localStorage.clear();

        for (var x = 0; x < imagesArr.length; x++) {

            // create an image object and populate values
            var image = {
                src: imagesArr[x].attributes.src.value,
                still: imagesArr[x].attributes.still.value,
                animate: imagesArr[x].attributes.animate.value,
                state: imagesArr[x].attributes.state.value,
                title0: imagesArr[x].attributes.title0.value,
                title: imagesArr[x].attributes.title.value,
                rating: imagesArr[x].attributes.rating.value,

            }

            images.push(image); // write the image object to the array

        }

        // write the array to localStorage. Objects cannot be written to localStorage without distorting
        // their integrity, so we need to convert the array objects to a string
        localStorage.setItem("images", JSON.stringify(images));

    });

    /*
    click event of the preset gifs buttons to retrieve the gifs from the API.
    The button text is passed as a parameter to the API
    */
    $("body").on("click", ".presetBtn", function() {
        getGifs($(this).text());
    });

    /*
    click event from the Add a politician or fan submit button
    */
    $("body").on("click", "#addButton", function() {
        event.preventDefault(); // prevent the default action of the submit button
        addButtonFan();
    });


    /*
    Functions
    */

    /*
    Enables div contents to be draggable and the divs to allow imgaes to be dropped in it
    */
    function enableDraggableDroppable() {

        $("img", "#preset-gifs").draggable({
            cancel: "a.ui-icon", // clicking an icon won't initiate dragging
            revert: "invalid", // when not dropped, the item will revert back to its initial position
            containment: "document",
            helper: "clone",
            cursor: "move"
        });


        $("img", "#favorite-gifs").draggable({ //
            cancel: "a.ui-icon", // clicking an icon won't initiate dragging
            revert: "invalid", // when not dropped, the item will revert back to its initial position
            containment: "document",
            helper: "clone",
            cursor: "move"
        });

        // Let the favorite-gifs be droppable, accepting the preset-gifs items
        $(".droppable").droppable({
            accept: "#preset-gifs img",
            drop: function(event, ui) {
                deleteImage(ui.draggable);
            }
        });

        // Let the preset-gifs be droppable as well, accepting items from the favorite-gifs
        $(".draggable").droppable({
            accept: "#favorite-gifs img",
            drop: function(event, ui) {
                recycleImage(ui.draggable);
            }
        });
    }

    /*
    update preset-gifs div. The data comes from the API response as a parameter to the function
    */
    function updatePage(giphyData) {

        for (var x = 0; x < giphyData.data.length; x++) {

            //create image
            var image = $("<img>");
            image.attr("src", giphyData.data[x].images.fixed_width_still.url);
            image.attr("still", giphyData.data[x].images.fixed_width_still.url);
            image.attr("animate", giphyData.data[x].images.fixed_width.url);
            image.attr("state", "still");
            image.attr("title0", giphyData.data[x].title);
            image.attr("title", "Rating: " + giphyData.data[x].rating);
            image.attr("rating", giphyData.data[x].rating);
            image.attr("data-toggle", "tooltip");
            image.addClass("imageCls");

            // prepend the image to the div
            $("#preset-gifs").prepend(image);

        }

        enableDraggableDroppable(); // allow the preset-gifs div to be droppable and draggable

    }

    /*
    Delete images from preset-div whilst appending them to favorite-gifs
    */
    function deleteImage($item) {
        $item.fadeOut(function() {
            var $list = $("div", "#favorite-gifs").length ?
                $("div", "#favorite-gifs") :
                $("<div id='preset-gifs'>").appendTo("#favorite-gifs");

            $item.appendTo($list).fadeIn();

        });

    }

    /*
    Delete images from favorite-gifs whilst appending them to preset div
    */
    function recycleImage($item) {
        $item.fadeOut(function() {
            $item
                .find("img")
                .end()
                .appendTo("#preset-gifs")
                .fadeIn();

        });

    }

    /*
    AJAX call to get gifs from the api at giphy.com
    */
    function getGifs(searchName) {

        // query string construction with searchName coming as a parameter
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchName + "&api_key=O22dkNRb0PMFd9dP4PSeAVOXEVNhYR0d&limit=10";

        //Perfoming an AJAX GET request to our queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            updatePage(response);
        });

    }

    /*
    Function to add a button from the submit button event
    */
    function addButtonFan() {
        var politician = $("#addPolitician").val().trim();

        if (politician.length > 0) {
            $("#addPolitician").val("");

            topics.push(politician); // add politician or fan to array

            // add the button to the Preset Gifs buttons
            var btn = $("<button>");
            btn.text(politician);
            btn.addClass("presetBtn");
            $("#preset-btns").append(btn);
        }
    }

});