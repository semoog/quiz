angular.module('quizApp').directive('questionList', function(){
    return {
        templateUrl: 'components/quiz/partials/quizListView.html',
        scope: {
            questions: '=',
            answers: '=',
            results: '=',
            currentQuestion: '=',
            setCurrentQuestion: '&'
        }
    }
})