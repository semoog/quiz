angular.module('quizApp').controller('homeCtrl', function($scope, quizList){
    $scope.quizzes = quizList;
})