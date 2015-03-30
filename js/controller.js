angular
	.module("app")
	.controller("MainController", MainController);

	function MainController(){
		var self = this;
		
		
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
		
		
	//we are using a variable "count" to determine who gets to move next
			if (count % 2 === 0){
				if (self.spaces[index].space === "") {
				square.space = "X";
				count ++;
				}
		console.log(count);
			} else if (count % 2 != 0) {
				if (self.spaces[index].space === "") {
				square.space = "O";	
				count ++;
				}
			}	
		console.log(count);
		
	}







}/*end main controller*/















