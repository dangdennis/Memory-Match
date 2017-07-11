
$(document).ready(function() {
	var app = new App();
	app.init();
});

// App is the primary controller between model and view
function App() {
	var self = this;
	this.model = new MemoryMatchModel(this);
	this.view  = new MemoryMatchView(this);

	this.init = function() {
		this.view.displayCards(this.model.getDeck());
		this.setUpHandlers();
	};

	this.setUpHandlers = function() {
		console.log('setting up handlers');
		self.addCardClickListeners();
	};

	this.addCardClickListeners = function(deck) {
		$(".card").on("click",function() {
			self.handleFlip($(this));
			self.updateStats();
		})
	}

	this.handleFlip = function(card) {
		self.model.flipCard(card);
		self.view.flipCard(card);
	}

	this.updateStats = function() {
		self.view.displayStats(self.model.getStats());
	}

}