angular
	.module("app")
	.controller("MainController", MainController);

	MainController.$inject = ['$firebaseObject']

	function MainController($firebaseObject) {
		var self = this;
		self.gamePlay = gamePlay();
		self.playerMove = playerMove;



		function gamePlay() {  //"global" function created to push data to firebase
			var ref = new Firebase ('https://tic-tac-mario.firebaseio.com/');
			var gameData = $firebaseObject(ref); //variable being referenced in firebase

			gameData.spaces = [];

			for (i = 0; i < 9; i ++) {
				gameData.spaces.push({move: ''})
			};
				// {move: ''},
				// {move: ''},
				// {move: ''},
				// {move: ''},
				// {move: ''},
				// {move: ''},
				// {move: ''},
				// {move: ''},
				// {move: ''}
			

			gameData.marioTurn = true;
			gameData.luigiTurn = false;

			gameData.$save();

			return gameData;

		}/* end gamePlay */

		function playerMove(square) {

			console.log("hello");
			if (self.gamePlay.marioTurn === true) {
				square.move = true;
				self.gamePlay.marioTurn = false;
				self.gamePlay.$save();
			
			} else if (self.gamePlay.luigiTurn === false) {
				square.move = false;
				self.gamePlay.marioTurn = true;
				self.gamePlay.$save();
			}

			
		}/* end playerMove */

		function getWinner() {
			if (square.move[1],[2],[3] === true){
				
			}
		}











	}/*end MainController*/