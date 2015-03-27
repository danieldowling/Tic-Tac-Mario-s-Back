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
			console.log(self.spaces)

		self.showX = showX;


	function showX(square){
		console.log("working");
		square.space = "X";
	}
		 
}

