
spaceInvaders = function ()
{
	// how many columns and rows of aliens?
	this.alienCounts = [8,5];
	// how many buildings
	this.buildingCounts = 4;
	this.buildingParts = 12;

	this.aliensMoveSpeed = 10;
	this.aliensDropSpeed = 15;
	this.aliensMoveDelay = 500;
	this.fighterMoveSpeed = 2;
	this.fighterMoveDelay = 5;
	this.fighterShootDelay = 500;
	this.shotSpeed = 850;
	this.firing = false;

	this.welcomeScreen;
	this.gameplayScreen;
	this.gameWinScreen;
	this.gameLoseScreen;

	this.gameplayScreenWidth;

	this.currentScore = 0;

	this.fighterMoveInterval;
	this.fighterWidth;
	this.fighterLeftPosition;
	this.missileInterval;

	this.aliensMoveInterval;
	this.aliensWidth;
	this.aliensHeight;
	this.aliensLeftPosition = 0;
	this.aliensTopPosition = 0;

	this.alienColumns = [];
	this.aliensLeft = 0;

	this.groundPosition;

	this.pointsPerHit = 100;

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
	__this.gameWinScreen = $("#gameWin");
	__this.gameLoseScreen = $("#gameLose");
	__this.pointsBlock = $("#points");
	__this.sky = $("#sky");
	__this.mothership = $("#mothership");
	__this.aliens = $("#aliens");
	__this.buildings = $("#buildings");
	__this.ground = $("#ground");
	__this.fighter = $("#fighter");
	__this.playBtn = $("#playBtn");
	__this.playAgainBtns = $(".playAgainBtn");

	__this.gameplayScreenWidth = __this.gameplayScreen.width();


	__this.fighterWidth = __this.fighter.width();
	__this.fighterLeftPosition = ( __this.gameplayScreenWidth / 2 ) - ( __this.fighterWidth / 2 );
	__this.fighter.css('left',__this.fighterLeftPosition+"px");

	__this.playBtn.click(function(){ __this.showGamePlay(); });
	__this.playAgainBtns.click(function(){ __this.resetGame(); });

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
	__this.groundPosition = __this.ground.position();

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

spaceInvaders.prototype.removeGameListeners = function()
{
	__this = this;

	$(document).unbind("keydown");
	$(document).unbind("keyup");

	clearInterval(__this.aliensMoveInterval);

}

spaceInvaders.prototype.keydownListener = function(event)
{
	__this = this;
	event.preventDefault;
	if(event.which == 32)
	{
		if(__this.firing==true) return false;
		__this.fireMissile();
		__this.firing = true;
		__this.missileInterval = setInterval(function(){ __this.fireMissile(); }, __this.fighterShootDelay);
		return false;
	}
	if(event.which == 37)
	{
		clearInterval(__this.fighterMoveInterval);
		__this.fighterMoveInterval = setInterval(function(){ __this.moveFighter("left") },__this.fighterMoveDelay)
		return false;
	}
	if(event.which == 39)
	{
		clearInterval(__this.fighterMoveInterval);
		__this.fighterMoveInterval = setInterval(function(){ __this.moveFighter("right") },__this.fighterMoveDelay)
		return false;
	}
}

spaceInvaders.prototype.keyupListener = function(event)
{
	__this = this;
	event.preventDefault;
	if(event.which == 32)
	{
		clearInterval(__this.missileInterval);
		__this.firing = false;
		return false;
	}
	if(event.which == 37)
	{
		clearInterval(__this.fighterMoveInterval);
		return false;
	}
	if(event.which == 39)
	{
		clearInterval(__this.fighterMoveInterval);
		return false;
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
	__this.aliensHeight = __this.aliens.height();

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

	for (var i = 0; i < __this.alienCounts[0]; i++) {
		__this.alienColumns[i] = ((__this.aliensWidth * .125) * i) + __this.aliensLeftPosition;
	}

	if((__this.aliensHeight + __this.aliensTopPosition) > __this.groundPosition.top)
	{
		__this.gameOver("lose");
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
			__this.aliensLeft++;
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


spaceInvaders.prototype.fireMissile = function ()
{
	__this = this;

	var fighterPosition = __this.fighter.position();

	var newMissile = $('<div/>').addClass('missile');
	newMissile.css({"top":fighterPosition.top+"px","left":fighterPosition.left+(__this.fighterWidth/2)+"px"});
	__this.gameplayScreen.append(newMissile);
	$(newMissile).animate({"top":"-20px"},{
		duration: __this.shotSpeed,
		easing: "linear",
		progress: function(){ __this.alienHitTest(this); },
		complete:function(){ $(this).remove(); },
	});


}

spaceInvaders.prototype.alienHitTest = function (missile)
{
	__this = this;
	var missilePosition = $(missile).position();
	if(missilePosition.left < __this.aliensLeftPosition
		|| missilePosition.left > (__this.aliensLeftPosition + __this.aliensWidth)
		|| missilePosition.top > (__this.aliensTopPosition + __this.aliensHeight)
		|| missilePosition.top < __this.aliensTopPosition)
		return false;

	var whichHit = 0;
	for (var i = 0; i < __this.alienCounts[0]; i++) {
		if(missilePosition.left > __this.alienColumns[i]) whichHit = i;
		else break;
	}
	var hitColumn = __this.aliens.find(".alien-column")[whichHit];
	$(hitColumn).find(".alien").each(function(index,element) {
		var alienPosition = $(element).position();
		var alienHeight = $(element).height();
		if(missilePosition.top > (__this.aliensTopPosition + alienPosition.top) && missilePosition.top < (__this.aliensTopPosition + alienPosition.top + alienHeight))
		{
			__this.updateScore(__this.pointsPerHit);
			__this.aliensLeft--;
			$(missile).stop(false,false).remove();
			$(element).remove();
			if(__this.aliensLeft==0)
			{
				__this.gameOver("win");
			}
		}
	});
}

spaceInvaders.prototype.gameOver = function (result)
{
	__this = this;

	__this.removeGameListeners();

	__this.gameplayScreen.hide();
	if(result == "win")
	{
		__this.gameWinScreen.find(".endpoints").text(__this.currentScore);
		__this.gameWinScreen.show();
	}
	if(result == "lose")
	{
		__this.gameLoseScreen.find(".endpoints").text(__this.currentScore);
		__this.currentScore = 0;
		__this.updateScore(0);
		__this.gameLoseScreen.show();
	}
}

spaceInvaders.prototype.resetGame = function (result)
{
	__this = this;

	__this.aliens.empty();
	__this.buildings.empty();
	__this.aliensLeftPosition = 0;
	__this.aliensTopPosition = 0;
	__this.aliens.css({"top": __this.aliensTopPosition+"px","left": __this.aliensLeftPosition+"px"});
	__this.addAliens();
	__this.addBuildings();
	__this.addGameListeners();
	__this.gameWinScreen.hide();
	__this.gameLoseScreen.hide();
	__this.gameplayScreen.show();
}
