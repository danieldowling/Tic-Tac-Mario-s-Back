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
		self.displayWinner = displayWinner;

		function gamePlay() {  //"global" function created to push data to firebase
			var ref = new Firebase ('https://tic-tac-mario2.firebaseio.com/');
			var gameData = $firebaseObject(ref); //variable being referenced in firebase

			gameData.spaces = [];

			for (i = 0; i < 9; i ++) {
				gameData.spaces.push({move: ''})
			};
				
			
			gameData.makeMove = true;
			gameData.counter = 0;
			gameData.winner = "";
			
			/*gameData.$loaded(function(){
				gameData.$save();
			})*/

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
				self.gamePlay.counter += 1;
				self.gamePlay.makeMove = false;
				self.getWinner();
				self.displayWinner();
				self.gamePlay.$save();
				} 
			} else if (self.gamePlay.makeMove === false) {
				if (square.move === "") {
				square.move = false;
				self.gamePlay.counter += 1;
				self.gamePlay.makeMove = true;
				self.getWinner();
				self.displayWinner();
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
				
				self.gamePlay.winner = true;
				self.gamePlay.$save();
				
				console.log("mario wins row");
				console.log(self.gamePlay.winner);

				return gamePlay.winner;
					
			} else if ((self.gamePlay.spaces[0].move === true) && (self.gamePlay.spaces[3].move === true) && (self.gamePlay.spaces[6].move === true) 
				|| (self.gamePlay.spaces[1].move === true) && (self.gamePlay.spaces[4].move === true) && (self.gamePlay.spaces[7].move === true) 
				|| (self.gamePlay.spaces[2].move === true) && (self.gamePlay.spaces[5].move === true) && (self.gamePlay.spaces[8].move === true)) {
				
				self.gamePlay.winner = true;
				self.gamePlay.$save();
				
				console.log("mario wins column");
				console.log(self.gamePlay.winner);


			} else if ((self.gamePlay.spaces[0].move === true) && (self.gamePlay.spaces[4].move === true) && (self.gamePlay.spaces[8].move === true)
				|| (self.gamePlay.spaces[2].move === true) && (self.gamePlay.spaces[4].move === true) && (self.gamePlay.spaces[6].move === true)) {
				
				self.gamePlay.winner = true;
				self.gamePlay.$save();

				console.log("mario wins diagonal");
				console.log(self.gamePlay.winner);

			}
			//win logic for luigi
			else if ((self.gamePlay.spaces[0].move === false) && (self.gamePlay.spaces[1].move === false) && (self.gamePlay.spaces[2].move === false)
				|| (self.gamePlay.spaces[3].move === false) && (self.gamePlay.spaces[4].move === false) && (self.gamePlay.spaces[5].move === false) 
				|| (self.gamePlay.spaces[6].move === false) && (self.gamePlay.spaces[7].move === false) && (self.gamePlay.spaces[8].move === false)) {
				
				self.gamePlay.winner = false;
				self.gamePlay.$save();

				console.log("luigi wins row");
				console.log(self.gamePlay.winner);


			} else if ((self.gamePlay.spaces[0].move === false) && (self.gamePlay.spaces[3].move === false) && (self.gamePlay.spaces[6].move === false) 
				|| (self.gamePlay.spaces[1].move === false) && (self.gamePlay.spaces[4].move === false) && (self.gamePlay.spaces[7].move === false) 
				|| (self.gamePlay.spaces[2].move === false) && (self.gamePlay.spaces[5].move === false) && (self.gamePlay.spaces[8].move === false)) {
				
				self.gamePlay.winner = false;
				self.gamePlay.$save();

				console.log("luigi wins column");
				console.log(self.gamePlay.winner);

			} else if ((self.gamePlay.spaces[0].move === false) && (self.gamePlay.spaces[4].move === false) && (self.gamePlay.spaces[8].move === false) 
				|| (self.gamePlay.spaces[2].move === false) && (self.gamePlay.spaces[4].move === false) && (self.gamePlay.spaces[6].move === false)) {
				
				self.gamePlay.winner = false;
				self.gamePlay.$save();

				console.log("luigi wins diagonal");
				console.log(self.gamePlay.winner);

			} else if (self.gamePlay.counter === 9) {
				self.gamePlay.winner = null;
				console.log('tie'); //still need to adjust for a tie
			}
			
		}/* end getWinner */


		///////////////////////////////////////
		////Changes squares to winners face////
		///////////////////////////////////////

		function displayWinner() {
			

			if (self.gamePlay.winner === true) {
				
				for (i = 0; i < 9; i ++){
					self.gamePlay.spaces[i].move = 1;
				}
			} else if (self.gamePlay.winner === false) {
				
				for (i = 0; i < 9; i ++){
					self.gamePlay.spaces[i].move = 2;
				}
			} else if (self.gamePlay.winner === null) {
					
				for (i = 0; i < 9; i ++){
					self.gamePlay.spaces[i].move = 3;
				}
			}
		}


		////////////////////////////////////
		/////////Reset the Board////////////
		////////////////////////////////////


		function clearBoard(square) {
			for (i = 0; i < 9; i ++) {
				self.gamePlay.spaces[i].move = "";
				self.gamePlay.makeMove = true;
				self.gamePlay.winner = "";
				self.gamePlay.counter = 0;
				self.gamePlay.$save();
				console.log("board has been cleared")
			}
		}/* end clearBoard */




	}/*end MainController*/