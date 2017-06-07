var first_src = null;
var second_src = null;
var total_possible_matches = 9;
var match_counter = 0;
// Currently have 4 existing cards onload
var numberOfCards = 18;
var img_src = ["assets/pictures/backs/back1.jpg","assets/pictures/backs/back2.jpg","assets/pictures/backs/back3.jpg","assets/pictures/backs/back4.jpg",
"assets/pictures/backs/back5.jpg","assets/pictures/backs/back6.jpg","assets/pictures/backs/back7.jpg","assets/pictures/backs/back8.jpg",
	"assets/pictures/backs/back9.jpg","assets/pictures/backs/back1.jpg","assets/pictures/backs/back2.jpg","assets/pictures/backs/back3.jpg",
	"assets/pictures/backs/back4.jpg","assets/pictures/backs/back5.jpg","assets/pictures/backs/back6.jpg","assets/pictures/backs/back7.jpg","assets/pictures/backs/back8.jpg",
	"assets/pictures/backs/back9.jpg"];
var randomized_img_src = shuffleArray(img_src);

$(document).ready(function(){
	generateCards();
	// addBackFaces(shuffleArray(img_src));
	$(".flip").on("click",function(){
		// card_clicked(this);
		console.log('you flipped');
		$(function(){
			$(".flip").flip({
				trigger: 'click',
				axis: 'y'
			});
		});
	})
});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Primary function for matching
function card_clicked(card){
	if(first_src === null){
		first_src = $(card).find("div.back img").attr("src");
	}
}

// Generates cards onload
function generateCards(){
	for(var i=0;i<numberOfCards;i++) {
		var newCard = $("<div>").addClass("col-xs-2 card flip");
		var newBack = $("<div>").addClass("back");
		var latestImg = randomized_img_src.pop();
		var newBackImg = $("<img>").attr("src",latestImg);
		var newFront = $("<div>").addClass("front");
		var newFrontImg = $("<img>").attr("src", "assets/pictures/legend_cardback.png");
		newCard.append(newFront);
		newCard.append(newBack);
		newFront.append(newFrontImg);
		newBack.append(newBackImg);
		$(".game-area").append(newCard);
	}
}

function addBackFaces(arr){
	$("div.back").each(function(i){
		var randomImg = arr.pop();{
		$(this).attr("src",randomImg);
		}
	})
}
// function displayUpdate(){
// }

