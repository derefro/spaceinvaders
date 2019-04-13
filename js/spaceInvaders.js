
spaceInvaders = function ()
{
	// how many columns and rows of aliens?
	this.alienCounts = [8,5];
	// how many buildings
	this.buildingCounts = 4;
	this.buildingParts = 12;

	this.fighterMoveSpeed = 5;
	this.fighterShootDelay = 5;
	this.shotSpeed = 5;
	this.alienMoveSpeed = 5;

	this.welcomeScreen;
	this.gameplayScreen;

	this.currentScore = 0;

	// these will hold the objects later
	this.pointsBlock;
	this.sky;
	this.mothership;
	this.aliens;
	this.ground;
	this.buildings;
	this.fighter

	this.init();
}

spaceInvaders.prototype.init = function ()
{
	// set up the game
	__this = this;
	__this.welcomeScreen = $("#welcome");
	__this.gameplayScreen = $("#gamePlay");
	__this.pointsBlock = $("#points");
	__this.sky = $("#sky");
	__this.mothership = $("#mothership");
	__this.aliens = $("#aliens");
	__this.buildings = $("#buildings");
	__this.ground = $("#ground");
	__this.fighter = $("#fighter");
	__this.playBtn = $("#playBtn");

	__this.playBtn.click(function(){ __this.showGamePlay(); })

}

spaceInvaders.prototype.showGamePlay = function ()
{
	__this = this;

	__this.addAliens();
	__this.addBuildings();
	__this.currentScore = 0;
	__this.updateScore(0);
	__this.addGameListeners();
	__this.welcomeScreen.hide();
	__this.gameplayScreen.show();
}

spaceInvaders.prototype.updateScore = function(points)
{
	__this = this;
	__this.currentScore += points;
	__this.pointsBlock.text(__this.currentScore);
}

spaceInvaders.prototype.addGameListeners = function()
{
	__this = this;

	$(document).keydown($.proxy(__this.keydownListener, __this));
	$(document).keyup($.proxy(__this.keyupListener, __this));
}

spaceInvaders.prototype.keydownListener = function(event)
{
	__this = this;
	event.preventDefault;
	if(event.which == 32)
	{
		// fire missile
	}
	if(event.which == 37)
	{
		__this.fighter.css("left","-="+__this.fighterMoveSpeed+"px");
	}
	if(event.which == 39)
	{
		__this.fighter.css("left","+="+__this.fighterMoveSpeed+"px");
	}
}

spaceInvaders.prototype.keyupListener = function(event)
{
	__this = this;
	event.preventDefault;
	if(event.which == 32)
	{
		// stop missile
	}
	if(event.which == 37)
	{
		// stop moveLeft
	}
	if(event.which == 39)
	{
		// stop moveRight
	}

	
}

spaceInvaders.prototype.addAliens = function ()
{
	__this = this;

	for (var i = 0; i < __this.alienCounts[0]; i++) {
		var newColumn = $('<div/>').addClass("alien-column");
		for (var j = 0; j < __this.alienCounts[1]; j++) {
			var newAlien = $('<div/>').addClass("alien");
			var alienNum = Math.ceil(Math.random() * 3);
			newAlien.addClass("alien"+alienNum);
			newColumn.append(newAlien);
		}
		__this.aliens.append(newColumn);
	}
}

spaceInvaders.prototype.addBuildings = function ()
{
	__this = this;

	for (var i = 0; i < __this.buildingCounts; i++) {
		var newBuilding = $('<div/>').addClass("building");
		for (var j = 0; j < __this.buildingParts; j++) {
			var newBuildingPart = $('<div/>').addClass("building-part damage0 part"+j).data('damage',0);
			newBuilding.append(newBuildingPart);
		}
		__this.buildings.append(newBuilding);
	}
}
