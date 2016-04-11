angular.module('quizApp')
  .controller('homeCtrl', function($scopequizList) {
  	console.log(pastQuizList);
  	$scope.quizzes = quizList;
  });
