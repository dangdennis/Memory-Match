

function MemoryMatchModel(parent){
	this.mainController = parent;
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

	this.makeNewCard = function(id,front,back) {
		this.id = id;
		this.front = front;
		this.back = back;
		this.clicked = false;
		this.matched = false;
	}

	this.makeNewDeck = function(numOfCards,picObj){
		var deck = [];
		while(deck.length < numOfCards){
			for(var i=0; i < numOfCards/2; i++) {
				var card = new this.makeNewCard(i,picObj.front,picObj.back[i]);
				deck.push(card);
			}
		};
		return deck;
	}

	this.shuffleDeck = function(deck) {
	    for (var i = deck.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = deck[i];
	        deck[i] = deck[j];
	        deck[j] = temp;
	    }
	    return deck;
	}

	var currentDeck = this.makeNewDeck(18,this.pictureObj);
	this.deck = this.shuffleDeck(currentDeck);

}



