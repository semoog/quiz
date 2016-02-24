angular.module('quizApp').directive('fillBlank', function () {
    return {
        templateUrl: 'components/quiz/partials/fillBlankTmpl.html',
        restrict: 'AE',
        replace: true,
        scope: {
            question: '=',
            answers: '=',
            save: '&'
        },
        controller: function ($scope) {
            $scope.$watch('question', function () {
                if ($scope.answers[$scope.question.id]) {
                    $scope.answer = $scope.answers[$scope.question.id];
                } else {
                    $scope.answer = '';
                }
            })

            $scope.handleEnter = function (e, answer) {
                if (e.keyCode === 13) {
                    $scope.saveAnswer(answer)
                }
            }

            $scope.saveAnswer = function (answer) {
                $scope.save({ id: $scope.question.id, answer: answer })

            }
        }
    }
})