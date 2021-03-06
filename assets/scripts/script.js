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
var clickedInTime = false;
var intervalID = 0;
var tick = 0;

// Document Ready //
$(document).ready(function() {
	generateCards();
	Handlers();
});

function Handlers() {
	$('.card').on('click', function() {
		flip($(this));
		cardMatcher($(this));
	});
	$('#reset').on('click', function() {
		resetGame();
		displayStats();
	});
}

// **** Immutable array of src values to be used later **** //
function newDeck() {
	var img_src = [
		{ id: '1', url: 'assets/pictures/backs/back1.jpg' },
		{ id: '2', url: 'assets/pictures/backs/back2.jpg' },
		{ id: '3', url: 'assets/pictures/backs/back3.jpg' },
		{ id: '4', url: 'assets/pictures/backs/back4.jpg' },
		{ id: '5', url: 'assets/pictures/backs/back5.jpg' },
		{ id: '6', url: 'assets/pictures/backs/back6.jpg' },
		{ id: '7', url: 'assets/pictures/backs/back7.jpg' },
		{ id: '8', url: 'assets/pictures/backs/back8.jpg' },
		{ id: '9', url: 'assets/pictures/backs/back9.jpg' },
		{ id: '1', url: 'assets/pictures/backs/back1.jpg' },
		{ id: '2', url: 'assets/pictures/backs/back2.jpg' },
		{ id: '3', url: 'assets/pictures/backs/back3.jpg' },
		{ id: '4', url: 'assets/pictures/backs/back4.jpg' },
		{ id: '5', url: 'assets/pictures/backs/back5.jpg' },
		{ id: '6', url: 'assets/pictures/backs/back6.jpg' },
		{ id: '7', url: 'assets/pictures/backs/back7.jpg' },
		{ id: '8', url: 'assets/pictures/backs/back8.jpg' },
		{ id: '9', url: 'assets/pictures/backs/back9.jpg' }
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
			var second_clicked = false;

			intervalID = setInterval(function() {
				tick++;
				console.log(tick);
				if (tick == 5) {
					if (intervalID != 0) {
						clearInterval(intervalID);
						first_card_clicked.toggleClass('flipped');
						first_card_clicked = null;
						displayStats();
						tick = 0;
					}
				}
			}, 1000);
			card.off('click');
			var addClickTimer = setTimeout(function() {
				card.on('click', function() {
					flip(card);
					cardMatcher(card);
					console.log('on click re-added for first time');
				});
			}, 1400);
		} else {
			second_card_clicked = card;
			if (
				first_card_clicked.children('.back').children('img').attr('id') !==
				second_card_clicked.children('.back').children('img').attr('id')
			) {
				tick = 0;
				if (intervalID != 0) {
					clearInterval(intervalID);
				}
				stopClick();
				resetFlips();
				attempts++;
				displayStats();
				console.log("cards don't match");
			} else {
				//( first_card_clicked.children(".back").children("img").attr("id") === second_card_clicked.children(".back").children("img").attr("id") )
				first_card_clicked.off();
				second_card_clicked.off();
				console.log(
					'this is the first card after second card is clicked' +
						first_card_clicked
				);
				console.log(first_card_clicked);
				// $(".clickable").off("click");
				// first_card_clicked.removeClass("clickable");
				// second_card_clicked.removeClass("clickable");
				$('.clickable').on('click');
				console.log('cards did match');
				stopClick();
				first_card_clicked = null;
				second_card_clicked = null;
				attempts++;
				console.log('more attempts made');
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
function stopClick() {
	clickable = false;
	setTimeout(resetClickable, 1000);
}
function resetClickable() {
	clickable = true;
}
// *****  Generates cards onload ***** //
function generateCards() {
	// One loop per row of cards //
	for (var i = 0; i < numberOfCards; i++) {
		// ***** div.cardContainer -> div.card -> div.front + div.back -> img ***** //
		var obj = randomized_img_src.pop();
		var cardContainer = $('<div>').addClass('cardContainer').appendTo('.row');
		var newCard = $('<div>').addClass('card').appendTo(cardContainer);
		var newBack = $('<div>').addClass('back').appendTo(newCard);
		var newBackImg = $('<img>')
			.attr('id', obj.id)
			.css('background-image', 'url(' + obj.url + ')')
			.appendTo(newBack);
		var newFront = $('<div>').addClass('front').appendTo(newCard);
		var newFrontImg = $('<img>')
			.attr('src', 'assets/pictures/legend_cardback.png')
			.appendTo(newFront);
	}
}
// *****  Function to animate card flips  ***** //
function flip(el) {
	if (clickable) {
		el.toggleClass('flipped');
	}
}

// *****  function displayStats  ***** //
function displayStats(average) {
	accuracy = match_counter / attempts.toFixed(0);
	$('#games-played').text(games_played);
	$('#attempts').text(attempts);
	$('#accuracy').text((accuracy * 100).toFixed(0) + '%');
}

// ***** Reset Functions ***** //
function resetFlips() {
	setTimeout(function() {
		first_card_clicked.toggleClass('flipped');
		second_card_clicked.toggleClass('flipped');
		first_card_clicked = null;
		second_card_clicked = null;
	}, 1000);
}
function resetGame() {
	match_counter = 0;
	attempts = 0;
	accuracy = 0;
	games_played++;
	$('.row1').html('');
	$('.row2').html('');
	$('.row3').html('');
	randomized_img_src = shuffleArray(newDeck());
	generateCards();
	Handlers();
	displayStats();
}
