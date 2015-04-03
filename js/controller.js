angular
	.module("app")
	.controller("MainController", MainController);

	MainController.$inject = ['$firebaseObject']

	function MainController($firebaseObject) {
		var self = this;
		self.gamePlay = gamePlay();
		self.playerMove = playerMove;
		self.getWinner = getWinner;
		self.clearBoard = clearBoard;



		function gamePlay() {  //"global" function created to push data to firebase
			var ref = new Firebase ('https://tic-tac-mario.firebaseio.com/');
			var gameData = $firebaseObject(ref); //variable being referenced in firebase

			gameData.spaces = [];

			for (i = 0; i < 9; i ++) {
				gameData.spaces.push({move: ''})
			};
				// {move: ''}, remember
				// {move: ''},
				// {move: ''},
				// {move: ''},
				// {move: ''},
				// {move: ''},
				// {move: ''},
				// {move: ''}
			
			gameData.makeMove = true;
			gameData.$save();
			return gameData;

		}/* end gamePlay */


		///////////////////////////////
		/////////Make Moves////////////
		///////////////////////////////


		function playerMove(square) {

			console.log(square);
			if (self.gamePlay.makeMove === true) {
				if (square.move === "") {
				square.move = true;
				self.gamePlay.makeMove = false;
				self.getWinner();
				self.gamePlay.$save();
				} 
			} else if (self.gamePlay.makeMove === false) {
				if (square.move === "") {
				square.move = false;
				self.gamePlay.makeMove = true;
				self.getWinner();
				self.gamePlay.$save();
				}
			}

		}/* end playerMove */


		//////////////////////////////
		////////Winner Logic//////////
		//////////////////////////////


		function getWinner() {
			//win logic for mario
			if ((self.gamePlay.spaces[0].move === true) && (self.gamePlay.spaces[1].move === true) && (self.gamePlay.spaces[2].move === true)
				|| (self.gamePlay.spaces[3].move === true) && (self.gamePlay.spaces[4].move === true) && (self.gamePlay.spaces[5].move === true) 
				|| (self.gamePlay.spaces[6].move === true) && (self.gamePlay.spaces[7].move === true) && (self.gamePlay.spaces[8].move === true)) {
				self.gamePlay.$save();
				console.log("mario wins row");
					
			} else if ((self.gamePlay.spaces[0].move === true) && (self.gamePlay.spaces[3].move === true) && (self.gamePlay.spaces[6].move === true) 
				|| (self.gamePlay.spaces[1].move === true) && (self.gamePlay.spaces[4].move === true) && (self.gamePlay.spaces[7].move === true) 
				|| (self.gamePlay.spaces[2].move === true) && (self.gamePlay.spaces[5].move === true) && (self.gamePlay.spaces[8].move === true)) {
				self.gamePlay.$save();
				console.log("mario wins column")

			} else if ((self.gamePlay.spaces[0].move === true) && (self.gamePlay.spaces[4].move === true) && (self.gamePlay.spaces[8].move === true)
				|| (self.gamePlay.spaces[2].move === true) && (self.gamePlay.spaces[4].move === true) && (self.gamePlay.spaces[6].move === true)) {
				self.gamePlay.$save();
				console.log("mario wins diagonal")
			}
			//win logic for luigi
			else if ((self.gamePlay.spaces[0].move === false) && (self.gamePlay.spaces[1].move === false) && (self.gamePlay.spaces[2].move === false)
				|| (self.gamePlay.spaces[3].move === false) && (self.gamePlay.spaces[4].move === false) && (self.gamePlay.spaces[5].move === false) 
				|| (self.gamePlay.spaces[6].move === false) && (self.gamePlay.spaces[7].move === false) && (self.gamePlay.spaces[8].move === false)) {
				self.gamePlay.$save();
				console.log("luigi wins row");

			} else if ((self.gamePlay.spaces[0].move === false) && (self.gamePlay.spaces[3].move === false) && (self.gamePlay.spaces[6].move === false) 
				|| (self.gamePlay.spaces[1].move === false) && (self.gamePlay.spaces[4].move === false) && (self.gamePlay.spaces[7].move === false) 
				|| (self.gamePlay.spaces[2].move === false) && (self.gamePlay.spaces[5].move === false) && (self.gamePlay.spaces[8].move === false)) {
				self.gamePlay.$save();
				console.log("luigi wins column")
			
			} else if ((self.gamePlay.spaces[0].move === false) && (self.gamePlay.spaces[4].move === false) && (self.gamePlay.spaces[8].move === false) 
				|| (self.gamePlay.spaces[2].move === false) && (self.gamePlay.spaces[4].move === false) && (self.gamePlay.spaces[6].move === false)) {
				self.gamePlay.$save();
				console.log("luigi wins diagonal")
			} else {
				console.log('tie');
			}
			
		}/* end getWinner */


		////////////////////////////////////
		/////////Reset the Board////////////
		////////////////////////////////////


		function clearBoard(square) {
			for (i = 0; i < 9; i ++) {
				self.gamePlay.spaces[i].move = "";
				self.gamePlay.makeMove = true;
				self.gamePlay.$save();
				console.log("board has been cleared")
			}
		}/* end clearBoard */


		




	}/*end MainController*/