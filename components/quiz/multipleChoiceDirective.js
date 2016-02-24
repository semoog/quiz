angular.module('quizApp').directive('multipleChoice', function(){
    return {
        templateUrl: 'components/quiz/partials/multipleChoiceTmpl.html',
        restrict: 'AE',
        replace: true,
        scope: {
            question: '=',
            answers: '=',
            save: '&'
        },
        controller: function($scope){
            $scope.$watch('question', function(){
                $scope.selected = "";
            })
            
            $scope.update = function (choice) {
                $scope.selected = choice;
            }
            
            $scope.saveAnswer = function(selected){
                $scope.save({
                    id: $scope.question.id,
                    answer: $scope.selected
                })
            }
        }
    }
})