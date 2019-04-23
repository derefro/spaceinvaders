
spaceInvaders = function ()
{
	// how many columns and rows of aliens?
	this.alienCounts = [8,5];
	// how many buildings
	this.buildingCounts = 4;
	this.buildingParts = 12;

	this.aliensMoveSpeed = 10;
	this.aliensDropSpeed = 10;
	this.aliensMoveDelay = 1000;
	this.fighterMoveSpeed = 2;
	this.fighterMoveDelay = 5;
	this.fighterShootDelay = 5;
	this.shotSpeed = 5;

	this.welcomeScreen;
	this.gameplayScreen;

	this.gameplayScreenWidth;

	this.currentScore = 0;

	this.fighterMoveInterval;
	this.fighterWidth;
	this.fighterLeftPosition;

	this.aliensMoveInterval;
	this.aliensWidth;
	this.aliensHeight;
	this.aliensLeftPosition;
	this.aliensTopPosition = 0;

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

	__this.gameplayScreenWidth = __this.gameplayScreen.width();


	__this.fighterWidth = __this.fighter.width();
	__this.fighterLeftPosition = ( __this.gameplayScreenWidth / 2 ) - ( __this.fighterWidth / 2 );
	__this.fighter.css('left',__this.fighterLeftPosition+"px");

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

	__this.aliensMoveInterval = setInterval(function(){ __this.moveAliens("right"); },__this.aliensMoveDelay);

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
		clearInterval(__this.fighterMoveInterval);
		__this.fighterMoveInterval = setInterval(function(){ __this.moveFighter("left") },__this.fighterMoveDelay)
	}
	if(event.which == 39)
	{
		clearInterval(__this.fighterMoveInterval);
		__this.fighterMoveInterval = setInterval(function(){ __this.moveFighter("right") },__this.fighterMoveDelay)
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
		clearInterval(__this.fighterMoveInterval);
	}
	if(event.which == 39)
	{
		clearInterval(__this.fighterMoveInterval);
	}


}

spaceInvaders.prototype.moveFighter = function (direction)
{
	__this = this;
	if(direction == "left")
	{
		if(__this.fighterLeftPosition > ( 0 - (__this.fighterWidth / 2 )))
		{
			__this.fighterLeftPosition -= __this.fighterMoveSpeed;
			__this.fighter.css("left", __this.fighterLeftPosition+"px");
		}
	}
	if(direction == "right")
	{
		if(__this.fighterLeftPosition < ( __this.gameplayScreenWidth - (__this.fighterWidth / 2 )))
		{
			__this.fighterLeftPosition += __this.fighterMoveSpeed;
			__this.fighter.css("left", __this.fighterLeftPosition+"px");
		}
	}

}

spaceInvaders.prototype.moveAliens = function (direction)
{
	__this = this;

	__this.aliensWidth = __this.aliens.width();

	if(direction == "left")
	{
		if(__this.aliensLeftPosition > 0)
		{
			__this.aliensLeftPosition -= __this.aliensMoveSpeed;
			__this.aliens.css("left", __this.aliensLeftPosition+"px");
		}
		else
		{
			__this.aliensTopPosition += __this.aliensDropSpeed;
			__this.aliens.css("top", __this.aliensTopPosition+"px");
			clearInterval(__this.aliensMoveInterval);
			__this.aliensMoveInterval = setInterval(function(){ __this.moveAliens("right"); },__this.aliensMoveDelay);
		}
	}
	if(direction == "right")
	{
		if(__this.aliensLeftPosition < ( __this.gameplayScreenWidth - __this.aliensWidth))
		{
			__this.aliensLeftPosition += __this.aliensMoveSpeed;
			__this.aliens.css("left", __this.aliensLeftPosition+"px");
		}
		else
		{
			__this.aliensTopPosition += __this.aliensDropSpeed;
			__this.aliens.css("top", __this.aliensTopPosition+"px");
			clearInterval(__this.aliensMoveInterval);
			__this.aliensMoveInterval = setInterval(function(){ __this.moveAliens("left"); },__this.aliensMoveDelay);
		}
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

	__this.aliensLeftPosition = 0;
	__this.aliens.css('left',__this.aliensLeftPosition+"px");
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
