angular
	.module("app")
	.controller("MainController", MainController);

	function MainController(){
		var self = this;
		
////////////////////////////////////////////
/////////////////variables//////////////////
////////////////////////////////////////////



		self.spaces = [{space: ""}, 
					{space: ""}, 
					{space: ""},
					{space: ""},
					{space: ""},
					{space: ""},
					{space: ""},
					{space: ""},
					{space: ""},
					];	

		
		self.playGame = playGame;
		var count = 0;
		



/////////////////////////////////////////////
//////////////////functions//////////////////
/////////////////////////////////////////////

	//this function off sets turns, X goes then O goes
	function playGame(square){
		console.log("working");
		var index = self.spaces.indexOf(square);
		
			if (count % 2 === 0){
				if (self.spaces[index].space === "") {
				square.space = true;
				count ++;
				}
		console.log(count);
			} else if (count % 2 != 0) {
				if (self.spaces[index].space === "") {
				square.space = false;	
				count ++;
				}
			}	
		console.log(count);
		
	};//we are using a variable "count" to determine who gets to move next




}/*end main controller*/















