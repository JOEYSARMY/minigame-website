class Clicker
{
	constructor()
	{
		this.level = 1
		this.price = 20;

		this.level_display = document.getElementById("clicker_level");
		this.price_display = document.getElementById("clicker_price");
		this.productivity_display = document.getElementById("clicker_productivity");

		this.renew_display();
	}

	click()
	{
		acorns += this.get_production_value();
		acorns_produced += this.get_production_value();
		renew_acorns();
	}

	get_production_value()
	{
		return Math.floor(1 + (0.05 * altogether_productivity * (this.level - 1)) + (this.level - 1));
	}

	improve()
	{
		if(acorns >= this.price)
		{
			acorns -= this.price;
			this.level += 1;
			this.price *= 2;
			this.renew_display();
		}
		else
		{
			alert("Gather More Acorns!");
		}
	}

	renew_display()
	{
		this.level_display.innerHTML = this.level;
		this.price_display.innerHTML = this.price;
		this.productivity_display.innerHTML = this.get_production_value();
	}
}

class Building
{
	constructor(name, productivity, price)
	{
		this.name = name;
		this.level = 0;
		this.price = price;
		this.productivity = productivity;

		// variables for displaying
		// definition of areas
		this.area = document.createElement("span");
		this.area.id = name;

		this.level_display = document.createElement("span");
		this.level_display.id = this.name + "_level";

		this.productivity_display = document.createElement("span");
		this.productivity_display.id = this.name + "_productivity";

		this.price_display = document.createElement("span");
		this.price_display.id = this.name + "_price";

		this.button = document.createElement("button");
		this.button.innerHTML = "Improve";
	        this.button.onclick = this.improve.bind(this);

		// put together
		this.area.append(document.createTextNode(name + " Level: "));
		this.area.append(this.level_display);
		this.area.append(document.createElement("br"));

		this.area.append(document.createTextNode("Acorns per Second: "));
		this.area.append(this.productivity_display);
		this.area.append(document.createElement("br"));

		this.area.append(document.createTextNode("Improvement Price: "));
		this.area.append(this.price_display);
		this.area.append(document.createElement("br"));

		this.area.append(this.button);
		this.area.append(document.createElement("br"));
		this.area.append(document.createElement("br"));

        	setInterval(this.produce.bind(this), 1000);
	}

	get_price()
	{
		return (this.price / 2) * (this.level * this.level + 1) + (this.price / 2) * (this.level + 1)
	}

	improve()
	{
        	if(acorns >= this.get_price())
        	{
        		acorns -= this.get_price();
        		this.level += 1;
        		altogether_productivity += this.productivity;
        		this.renew_display();
        		clicker.renew_display();
        	}
        	else
        	{
			alert("Gather More Acorns!");
		}
	}

	renew_display()
	{
		this.level_display.innerHTML = this.level;
		this.productivity_display.innerHTML = this.get_production_value();
		this.price_display.innerHTML = this.get_price();
	}


	set_visible()
	{
		buildings.append(this.area);
		this.renew_display();
	}

	produce()
	{
		acorns += this.get_production_value();
		acorns_produced += this.get_production_value();
	}

	get_production_value()
	{
		return this.level * this.productivity;
	}
}

// functions

function renew_acorns()
{
	acorns_display.innerHTML = acorns;
	acorns_produced_display.innerHTML = acorns_produced;

	if(this.acorns_produced >= 200 && SquirrelFriend_enabled == 0)
	{
		SquirrelFriend.set_visible();
		SquirrelFriend_enabled = 1;

	}
	if(this.acorns_produced >= 2000 && AcornDetector_enabled == 0)
	{
		AcornDetector.set_visible();
		AcornDetector_enabled = 1;
	}
	if(this.acorns_produced >= 20000 && acorns_magnet_enabled == 0)
	{
		acorns_magnet.set_visible();
		acorns_magnet_enabled = 1;
	}

	if(this.acorns_produced >= 200000 && acorns_ratatoskr_enabled == 0)
	{
		acorns_ratatoskr.set_visible();
		acorns_ratatoskr_enabled = 1;
	}
}

// commands and (global) variables

var acorns = 0;
var acorns_produced = 0;
var altogether_productivity = 0; // counts productivity of buildings except clicker

var acorns_display = document.getElementById("acorns");
var acorns_produced_display = document.getElementById("acorns_produced");

var buildings = document.getElementById("buildings");

SquirrelFriend_enabled = 0;
AcornDetector_enabled = 0;
acorns_magnet_enabled = 0;
acorns_ratatoskr_enabled = 0;

clicker = new Clicker();
MrNuts = new Building("Mr.Nuts", 1, 20);
MrNuts.set_visible();
SquirrelFriend = new Building("Squirrel Friend", 10, 200);
AcornDetector = new Building("Acorn Detector", 100, 2000);
acorns_magnet = new Building("Acorn Magnet", 1000, 20000);
acorns_ratatoskr = new Building("Acorn Ratatoskr", 10000, 200000);

setInterval(renew_acorns, 500);
