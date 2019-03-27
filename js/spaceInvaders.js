
spaceInvaders = function ()
{
	// how many columns and rows of aliens?
	this.alienCounts = [8,5];
	// how many buildings
	this.buildingCounts = 4;

	this.fighterMoveSpeed = 5;
	this.fighterShootDelay = 5;
	this.shotSpeed = 5;
	this.alienMoveSpeed = 5;

	this.welcomeScreen;
	this.gameplayScreen;

	// these will hold the objects later
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
	__this.sky = $("#sky");
	__this.mothership = $("#mothership");
	__this.aliens = $("#aliens");
	__this.buildings = $("#buildings");
	__this.ground = $("#ground");
	__this.fighter = $("#fighter");

	__this.addAliens();
}

spaceInvaders.prototype.addAliens = function ()
{
	__this = this;

	for (var i = 0; i < __this.alienCounts[0]; i++) {
		var newColumn = $('<div/>').addClass("alien-column");
		for (var j = 0; j < __this.alienCounts[1]; j++) {
			var newAlien = $('<div/>').addClass("alien");
			newColumn.append(newAlien);
		}
		__this.aliens.append(newColumn);
	}
}

spaceInvaders.prototype.addBuildings = function ()
{
	__this = this;
}
