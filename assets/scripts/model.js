

function MemoryMatchModel(){
	var self = this;

	var gameStats = {
		attempts: 0,
		match_counter: 0,
		games_played: 0,
		accuracy: 0,
		total_possible_matches: 9
	};
	this.getStats = function() {
		return gameStats;
	}

	this.pictureObj = {
		front: "assets/pictures/legend_cardback.png",
		back: [
			"assets/pictures/backs/back1.jpg",
			"assets/pictures/backs/back2.jpg",
			"assets/pictures/backs/back3.jpg",
			"assets/pictures/backs/back4.jpg",
			"assets/pictures/backs/back5.jpg",
			"assets/pictures/backs/back6.jpg",
			"assets/pictures/backs/back7.jpg",
			"assets/pictures/backs/back8.jpg",
			"assets/pictures/backs/back9.jpg",
			]
	};

	this.newCard = function(id,front,back) {
		this.id = id;
		this.front = front;
		this.back = back;
		this.clicked = false;
		this.matched = false;
		this.handleFlip = function() {
			this.on("click", function() {
				if(this.clicked === false && card.matched === false) {
					this.clicked = true;
				} else {
					this.clicked = false;
				}
			})
		}
	}

	this.flipCard = function(card) {
		console.log('model card', card);
	}

	this.makeNewDeck = function(numOfCards,picObj){
		var deck = [];
		while(deck.length < numOfCards){
			for(var i=0; i < numOfCards/2; i++) {
				var card = new self.newCard(i,picObj.front,picObj.back[i]);
				deck.push(card);
			}
		};
		for (var i = deck.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = deck[i];
	        deck[i] = deck[j];
	        deck[j] = temp;
	    };
		return deck;
	}

	this.calculateAccuracy = function() {
		var accuracy = (gameStats.match_counter/gameStats.attempts).toFixed(0);
		return accuracy;
	}

	var currentDeck = this.makeNewDeck(18,this.pictureObj);
	this.getDeck = function() {
		return currentDeck;
	}

}



