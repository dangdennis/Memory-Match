

function MemoryMatchView(){
	this.displayCards = function(deck) {
		for(var i=0;i<deck.length;i++) {
			var cardContainer = $("<div>").addClass("cardContainer").appendTo(".row");
			var card = $("<div>",{
				"class": "card",
				"id": deck[i].id
			}).appendTo(cardContainer);
			var back = $("<div>").addClass("back").appendTo(card);
			var backImg = $("<img>").css('background-image', 'url(' + deck[i].back + ')').appendTo(back);
			var front = $("<div>").addClass("front").appendTo(card);
			var frontImg = $("<img>").attr("src", deck[i].front).appendTo(front);
		}
	}

	this.displayStats = function(statsObj) {
		$("#games-played").text(statsObj.games_played);
		$("#attempts").text(statsObj.attempts);
		$("#accuracy").text(statsObj.accuracy);
	}

	this.flipCard = function(card) {
		console.log('view card', card);
		$(card).toggleClass('flipped');
		
	}


}