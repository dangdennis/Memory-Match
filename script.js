// **** Initialize global variables **** //
var first_card_clicked = null;
var second_card_clicked = null;
var clickable = true;
var numberOfCards = 18;
var total_possible_matches = 9;
var match_counter = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

// Document Ready //
$(document).ready(function(){
	generateCards();
	Handlers();
	CountDown();
});

function Handlers(){
	$(".card").on("click",function(){
		flip($(this));
		cardMatcher($(this));
	});
	$("#reset").on("click",function(){
		resetGame();
		displayStats();
	})
}


// **** Immutable array of src values to be used later **** //
function newDeck(){
	var img_src = [
	{id: "1", url: "pictures/backs/back1.jpg"},
	{id: "2", url: "pictures/backs/back2.jpg"},
	{id: "3", url: "pictures/backs/back3.jpg"},
	{id: "4", url: "pictures/backs/back4.jpg"},
	{id: "5", url: "pictures/backs/back5.jpg"},
	{id: "6", url: "pictures/backs/back6.jpg"},
	{id: "7", url: "pictures/backs/back7.jpg"},
	{id: "8", url: "pictures/backs/back8.jpg"},
	{id: "9", url: "pictures/backs/back9.jpg"},
	{id: "1", url: "pictures/backs/back1.jpg"},
	{id: "2", url: "pictures/backs/back2.jpg"},
	{id: "3", url: "pictures/backs/back3.jpg"},
	{id: "4", url: "pictures/backs/back4.jpg"},
	{id: "5", url: "pictures/backs/back5.jpg"},
	{id: "6", url: "pictures/backs/back6.jpg"},
	{id: "7", url: "pictures/backs/back7.jpg"},
	{id: "8", url: "pictures/backs/back8.jpg"},
	{id: "9", url: "pictures/backs/back9.jpg"}
	];
	return img_src;
}

// **** The array of src value are shuffled here **** //
var newDeckArray = newDeck();
var randomized_img_src = shuffleArray(newDeckArray);

// ***** Function to shuffle the array of image src files ***** //
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// ***** Primary function for matching ***** //
function cardMatcher(card) {
    if (clickable) {
        if (first_card_clicked === null) {
            first_card_clicked = card;
            console.log("first card set:" + first_card_clicked);
            console.log("first card set but as 'this':" + card);
			var flipTimer = setTimeout(function(){
					if(second_card_clicked !== null){
						clearTimeout(flipTimer);
					} else {
						console.log("timer for still running after timer supposedly cleared");
						attempts++;
						first_card_clicked.toggleClass("flipped");
						first_card_clicked = null;
						displayStats();
					}
				},1400);
			card.off("click");
			var addClickTimer = setTimeout(function(){
				card.on("click",function(){
					flip(card);
					cardMatcher(card);
					console.log("on click re-added for first time");
				});
				},1400);
        } else {
            second_card_clicked = card;
            if ( first_card_clicked.children(".back").children("img").attr("id") !== second_card_clicked.children(".back").children("img").attr("id") ) {
                stopClick();
                resetFlips();
                attempts++;
                displayStats();
                console.log("cards don't match");
            } else {//( first_card_clicked.children(".back").children("img").attr("id") === second_card_clicked.children(".back").children("img").attr("id") )
                console.log("this is the first card after second card is clicked" + first_card_clicked);
                console.log(first_card_clicked);
	            $(".clickable").off("click");
	            first_card_clicked.removeClass("clickable");
	            second_card_clicked.removeClass("clickable");
	            $(".clickable").on("click");
                console.log("cards did match");
            	stopClick();
                first_card_clicked = null;
                second_card_clicked = null;
                attempts++;
	            console.log("more attempts made");
                match_counter++;
                if (match_counter === total_possible_matches) {
                    displayStats();
                }
                displayStats();
            }
        }
    }
}
// ***** Regulates user's clicks ****** //
function stopClick(){
    clickable = false;
    setTimeout(resetClickable,1000);
}
function resetClickable(){
    clickable = true;
}
// *****  Generates cards onload ***** //
function generateCards(){
	// One loop per row of cards //
	for(var i=0;i<numberOfCards;i++) {
		// ***** div.cardContainer -> div.card -> div.front + div.back -> img ***** //
		var obj = randomized_img_src.pop();
		var cardContainer = $("<div>").addClass("cardContainer").appendTo(".row");
		var newCard = $("<div>").addClass("card").appendTo(cardContainer);
		var newBack = $("<div>").addClass("back").appendTo(newCard);
		var newBackImg = $("<img>").attr("id", obj.id).css('background-image', 'url(' + obj.url + ')').appendTo(newBack);
		var newFront = $("<div>").addClass("front").appendTo(newCard);
		var newFrontImg = $("<img>").attr("src", "pictures/legend_cardback.png").appendTo(newFront);
	}
}
// *****  Function to animate card flips  ***** //
function flip(el) {
	if(clickable){
	    el.toggleClass('flipped');
	}
}

// *****  function displayStats  ***** //
function displayStats(){
	accuracy = match_counter/attempts.toFixed(0);
	$("#games-played").text(games_played);
	$("#attempts").text(attempts);
	$("#accuracy").text((accuracy * 100).toFixed(0) +"%");
}

// ***** Reset Functions ***** //
function resetFlips(){
	setTimeout(function(){
		first_card_clicked.toggleClass("flipped");
		second_card_clicked.toggleClass("flipped");
		first_card_clicked = null;
		second_card_clicked = null;
	},1000)
}
function resetGame(){
	match_counter = 0;
	attempts = 0;
	accuracy = 0;
	games_played++;
	$(".row1").html("");
	$(".row2").html("");
	$(".row3").html("");
	randomized_img_src = shuffleArray(newDeck());
	generateCards();
	Handlers();
	displayStats();
}

function CountDown(elem) {
	this.countdownSecs = 0;
	this.timer = 0;
	this.startTime = 0;
	this.elapsedSecs = 0;
	this.secsLeft = 0;
	this.$displayElem = elem;

	this.SecondsLeft = function() {
		return this.countdownSecs - this.elapsedSecs;
	}

	this.ElapsedSeconds = function() {
		return Math.floor((new Date() - this.startTime) / 1000);
	}

	this.StartTimer = function(startTme) {
		this.StopTimer();
		if (this.countdownSecs == 0) return;
		if (startTme) this.startTime = startTme;
		else this.startTime = new Date();
		this.CountdownTick();
		this.timer = window.setInterval(function() {this.CountdownTick()}.bind(this), 1000);
	}

	this.StopTimer = function() {
		if (this.timer == 0) return;
		window.clearInterval(this.timer);
		this.timer = 0;
		this.elapsedSecs = Math.floor((new Date() - this.startTime) / 1000);
		this.secsLeft = this.countdownSecs - this.elapsedSecs;
	}

	this.CountdownTick = function() {
		this.elapsedSecs = Math.floor((new Date() - this.startTime) / 1000);
		var left = this.countdownSecs - this.elapsedSecs;
		if (left < 0) {
			this.StopTimer();
			$(this).trigger("tick", [0]);
			return;
		}
		if (left % 10 == 0) $(this).trigger("tick", [left]);

		var mins = Math.floor(left / 60);
		var secs = left % 60;
		if (secs < 10) secs = "0" + secs.toString();

		this.$displayElem.text(mins + ":" + secs);
	}
}


