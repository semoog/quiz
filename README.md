Day 1
--


## D1) Folder Structure
### Explanation
####
The first thing we want to do is create our folder structure.  Proper and consistent folder structure can save you and your team hours of work.  The most important rule of folder structure is consistency.  After that there is more than one correct way to structure the files in an application.  For this project we will be using a feature based approach for our files.

### Code
####
* Fork and clone this repository
* Create the following files in this structure in your project folder

```
index.html
app.js
/components
  /home
    homeCtrl.js
    homeView.html
  /quiz
    quizCtrl.js
    /views
      quizContainerView.html
      questionListWrapperView.html
      questionDetailView.html
  /results
    resultsCtrl.js
    resultsView.js
  /services
    quizService.js
/public
  /css
    styles.css
  /images
    (already included)
```

## Create and test your app 

### Setup the App

#### 

We want to get our angular app set up and make sure it works.
Setup a basic app using ui-router.  Name your app `quizApp`.
Setup 3 controllers : `homeCtrl`, `quizCtrl`, `resultsCtrl`
 
#### 
* Create your html file and add references to
  * angular.js (Get this from the cdn)
  * ui-router (Google `angular ui-router cdn`)
  * all of your controllers you made in step 1
  * your stylesheet


* Setup your angular app and name it `quizApp`
  * Do this in app.js using the `angular.module` syntax
  * Add your ng-app to your page referencing your app
  * Run your page in the browser and check the console for errors

* Create your controllers in `homeCtrl.js`, `quizCtrl.js`, and `resultsCtrl.js`.  Match the controller name to the file name, without the extension.

#### 
TODO


### Creating our first Route

#### 

Set up your first route using the `homeView` and `homeCtrl`

#### 

ui-router is a library that will swap out the content of elements we specify based on the state of our application.  To make this works we need to do three things: 
- Bring the library into our page, 
- tell it where we want things to be swapped out, 
- give it instructions for what to swap and when

We bring the library in by adding a reference in index.html and then adding it as a dependency in the module declaration (hint: square brackets).

We add a `ui-view` tag in our index to tell it where to swap things out.

We setup routing instructions by adding a config to our module and giving it `.state`s

We also want to add a $urlRouteProvider.otherwise call.  This will force any visitors to the state/route specified if they try to go anywhere we haven't defined.

##### Overview of routing concepts

UI Routing works based off of a 'state'.  The state in this case is represented as a string.  We will have 3 primary states in our application : `home`, `quiz`, `results`

Each state can also have substates.  In this application we will have 1 substate `quiz.view`.  This is still a string, but we are designating a substate by using a period to separate it from its parent.

#### 

##### Bring the Library in
We already added a reference to ui-router in our `index.html`

###### Code
_Next_ : Tell angular to inject ui-router into our app/module.
This is done by including `ui.router` in the array we make when declaring a module like so :
`angular.module('quizApp', ['ui.router'])`


##### Tell it where we want things swapped out

The `<ui-view></ui-view>` tag is a placeholder telling ui-router where we want things swapped out.

We are also going to add a header that is not inside the `ui-view` tag. Because of this, it will be visible on all pages.  It contains a link with a `ui-sref` (UI state reference).  We use this for internal navigation links instead of the usual href.  The ui-router library contains code watching for this attribute

The other part of this is placing the content we want to display in the correct template file. We need to add content into `homeView.html`.  For now let's use mustache brackets to show a `test` property inside of a div.

###### Code
Go into the `index.html` and add the following code in the body

```
<header>
  <ul>
    <li><a ui-sref="home">HOME</a></li>
  </ul>

</header>

<ui-view></ui-view>
```

##### Give it instructions of when to swap when

Once we have the state we can tell the router which template/templateUrl, controller, and other properties to use when the state changes.

* url - The url property specifies what we want the sub-url to look like.  The sub-url is the part of the url after the # symbol.
* templateUrl - This property provides the path (from the index.html file) to another .html file.  The content of this file will be replace all existing content inside the the `<ui-view></ui-view>` element we made previously
* controller - This property tells ui-router the name of the controller to use.  This works just like ng-controller and only needs the name.
* resolve - This property will prevent the app from routing until all of the data is retrieved.  This data will be passed into the controller.


###### Code

Open `app.js`

Add the following code:
```
.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'components/home/homeView.html',
			controller: 'HomeCtrl',
			resolve: {
				quizList: function (quizService) {
					return quizService.getQuizNames();
				},
				pastQuizList: function (quizService) {
					return quizService.getPastQuizzes();
				}
			}
		})
  })
```

### Run and test your code

#### 
You should be able to run your app at this point and test that everything works.
We used the '/' url path to handle our home page, and we added an otherwise case to force everyone to our set up route.
Run a server (live-server, http-server, brackets, etc) to serve up our files.  This is now necessary because we're getting templates off of the hard disk.
Then open that server url in the browser and you should be redirected to the home page


### Setting up the home Ctrl

#### 
If you haven't yet create your home controller.
Give it an array of quizzes and an array of pastQuizzes.

For now quizzes need to be objects with a name property and that's it.

#### 

```
$scope.quizzes = [{name: 'Angular'}, {name: 'HTML/CSS'}]
$scope.pastQuizzes = []
```

#### 

```
var app = angular.module('quizApp');

app.controller('HomeCtrl', function($scope, quizList, pastQuizList) {
	console.log(pastQuizList)
	$scope.quizzes = quizList;
	$scope.pastQuizzes = pastQuizList;
})
```


### Setting up the home page

#### 

The home page should look like this

<img src="http://i.imgur.com/caJI2mU.png" width="100%" height="100%"></img>


1. Be sure to bind your quizzes to the controller
2. Quizzes in the top section should route to the quiz.view state and pass in their name on the quizName state param
3. For historical quizzes you'll need to nest ng-repeats.  
    Display the name/id of the past quiz.
    Then repeat for each quiz in that category and show the quiz name.
    Lastly route each of the historical quizzes to the results state passing in both quizName and quiz route parameters. (Hint: ng-repeat creates a new scope, so you might need to walk up using $parent to get the correct values)(Hint 2: You can ng-repeat over an object getting the key value pair)
    

#### 

A link to a sub-route is done using ui-sref.  We then invoke the route we want to go to as though it was a function and pass in any stateParams it should know about.

`<a ui-sref="subroute.togoto({idParamStateParam: 'SomeDataIWantToPassIn'})"> Readable Link Text Here </a>`

And a section to view past quizzes bound to `pastQuizzes` on the controller.  

Iterating over an object to get a key value pair:
`ng-repeat="(key, value) in array"`

An example of nested repeats going up to the parent :
```
<div ng-repeat="outer in parentArray" class="centered">
    {{ parent.$id }}
    <div ng-repeat="(k, v) in outer">
        <a ng-if="v.name" ui-sref="results({param1: $parent.outer.$id, param2: k})">{{v.name}}</a>
        <a ng-if="!v.name" ui-sref="results({param1: $parent.outer.$id, param2: k})">{{k}}</a>
    </div>
</div>
```

#### 

The final code should look something like this.  Variable names can be different if you're calling things differently.

```
<div class="quizzes">
  <h1> Choose a quiz! </h1>
<!--  <hr>-->
  <div ng-repeat="item in quizzes">
    <a ui-sref="quiz.view({quizName: item.name})"> {{item.displayName}}</a>
  </div>
</div>

<div class="past-quizzes">
  <h1> View Past Quizzes </h1>
<!--  <hr>-->
  <div ng-repeat="quizName in pastQuizzes" class="centered">
    {{ quizName.$id }}
    <div ng-repeat="(quiz, value) in quizName">
      <a ng-if="value.name" ui-sref="results({quizName: $parent.quizName.$id, quiz: quiz})">{{value.name}}</a>
      <a ng-if="!value.name" ui-sref="results({quizName: $parent.quizName.$id, quiz: quiz})">{{quiz}}</a>
    </div>
  </div>
</div>
```

### Home page done - recap

#### 
We've finished our first route.  We set up our route, injected ng-routing, and told it to use the homeView and homeController files for the home page.

We then worked in those files to bind an array of quizzes to the ui.


## Quiz Page

### Setup Route

#### 
Set up a route to the quiz page using
`/quiz/:quizName`, `quizCtrl`, `quizContainerView.html`

Inside of your controller display the quizName route param somewhere on your page

Once you're done test your route by adding `#/quiz/angular` on the end of your url

#### 
In your app.js file you have a .state('home', ....) state set up.
Mimic that and add a new state that has:
- a state name of quiz
- a url property equal to `/quiz/:quizName`
- a templateUrl property equal to `components/quiz/views/quizContainerView.html`
- a controller property equal to `QuizCtrl` (This needs to match your controller name in quizCtrl.js

Inside of the quizCtrl you will need to inject `$stateParams` to get access to the `quizName` parameter we asked for in our url

#### 
Route config code
```
.state('quiz', {
    url: '/quiz/:quizName',
    templateUrl: 'components/quiz/views/quizContainerView.html',
    controller: 'QuizCtrl'
})
```

Controller code
```
app.controller('QuizCtrl', function ($scope, $stateParams) {
	$scope.quizName = $stateParams.quizName;
```

Once you have these pieces you can bind `{{quizName}}` in the `quizContainerView` to show the quizName

### Setup controller and Getting Data

#### 

Look at the QuizSample object to get an idea of the data you're working with!!!
This will be very important.  Copy this structure when setting up your mocks.


_Your controller needs to accept:_
 the `quizService`, `$scope`, `$stateParams`, and a dependency called `questions`

_Your controller needs to handle the following to start with:_
We need to track our questions that we want to answer.
We need to track our answers
We need to know which question is the 'current' one that we're looking at.
We need to be able to change the current answer.
We need to be able to reset our answers so we can start over.


#### 

_Your controller needs the following properties on it's scope:_
questions - array of `questions`.  These will be passed in as a dependency 
answers - an empty object to start with
currentQuestion - index 0 of the questions array

_Your controller needs to have the following functions to start with:_
`nextQuestion` - Sets the $scope.currentQuestion to the next question if there is one
`setCurrentQuestion` - Sets the $scope.currentQuestion to a passed in function 
`checkMyAnswers` - calls a `checkMyAnswers` function on the service and passes in our questions and our answers.  This will return a promise.
`reset` - sets the answers array to a new empty object and resets the current question to the first question in the questions array

#### 

```
app.controller('QuizCtrl', function ($scope, questions, quizService, $stateParams) {

	$scope.questions = questions;
	$scope.answers = {};
	$scope.currentQuestion = $scope.questions[0];

	$scope.setCurrentQuestion = function (question) {
		$scope.currentQuestion = question;
	}

	$scope.nextQuestion = function () {
		var idx = $scope.questions.indexOf($scope.currentQuestion);
		if ($scope.questions[idx + 1]) {
			$scope.currentQuestion = $scope.questions[idx + 1];
		} else {
			return;
		}
	}

	$scope.checkMyAnswers = function () {
		quizService.checkMyAnswers($scope.questions, $scope.answers).then(function (response) {
			$scope.results = response;
		});
	}

	$scope.reset = function () {
		$scope.answers = {};
		$scope.currentQuestion = $scope.questions[0]
	}

```


### Setup View Container

#### 

Our view is going to look something like this

On the left we have a div that contains our list of questions and on the right we have a div that has our currentQuestion.

Setup a skeleton that looks like this (Don't worry about the data for now, just the div/flow layout)

<img src="http://i.imgur.com/nt00hYW.png" width="100%" height="100%"></img>

Use nested UI-views to do this

#### 

We're going to use nested UI-views to separate our content. 
For the div on the left add a ui-view attribute with a value of list.
For the div on the right add a ui-view attribute with a value of detail

We then need to go add a new sub-route in our config.
Add a new state for `quiz.view`
It has a parent of `quiz`
I has a property called `views` that is an object
Our views object has two properties `'list'` and `'detail'`
Each are an object with a property `templateUrl` pointing to `questionListWrapperView.html` and `questionDetailView.html` respectively

#### 

quizContainerView
```
<div class="quizContainer">
	<div class="list" ui-view="list"></div>
	<div class="detailWrapper">
	<div class="detailContainer">
		<div class="detail" ui-view="detail"></div>
	</div>
	</div>
</div>
```

app.js - state for nested views
```
.state('quiz.view', {
    parent: 'quiz',
    views: {
        'list': {
            templateUrl: 'components/quiz/views/questionListWrapperView.html'
        },
        'detail': {
            templateUrl: 'components/quiz/views/questionDetailView.html'
        }
    }
})
```

### Setup Question List

#### 
Our routes should be set up to hold our question list on the left in questionListWrapperView.html.  Open that and set it up so it looks like the screenshot above.  You'll want all the same buttons and wire it up to the controller.

CheckAnswers and Reset should be made to work

#### 

We nested views, but we did not nest controllers, so we can bind to the parent controller we've already set up (quizCtrl)

The CheckAnswers button will use the checkAnswers function on your controller
The Rest button will use the reset function on your controller
The question list will be bound to our questions array.
It needs to watch the currentQuestion to determine when to bold an item 


#### 

```
questionListWrapperView.html

<div>
	<div ng-if="saving">
		<div ng-include="'components/quiz/partials/saveQuizPrompt.html'"></div>
	</div>
	<div class="buttons">
		<button ng-click="savePrompt()">Save Answers</button>
		<button ng-click="checkMyAnswers()">Check Answers</button>
		<button ng-click="reset()">Reset</button>
		<input name="checkAnswers" type="checkbox" ng-model="obj.instant" ng-click="checkForResults()">
		<label for="checkAnswers">Instant Gratification </label>
	</div>
    <div ng-repeat="question in questions track by question.id">
        <p ng-click="setCurrentQuestion(question)"><span ng-class="{'bold': question === currentQuestion}">{{question.id}}. {{question.title}} </span></p>

        <span ng-if="results.done || obj.instant">
            <span ng-if="results[question.id]"><i class="fa fa-check fa-lg blue"></i></span>
        <span ng-if="!results[question.id] && answers[question.id]"><i class="fa fa-times fa-lg orange"></i></span>
        </span>
        <span> {{answers[question.id]}} </span>
    </div>
</div>
```

### Setup current Question

#### 
Our routes should be set up to hold our current question on the right in questionDetailView.html.  Open that and set it up so it looks like the screenshot above.  There are two question types `multiple` and `blank`. 

We will change how we show the current question based on it's `qType`.

Try and get two layouts† that look like this:


<img src="http://i.imgur.com/OcCraj4.png" width="100%" height="100%"></img>

<img src="http://i.imgur.com/DTmXH15.png" width="100%" height="100%"></img>

#### 
Look back on your code from last week and remember how to do this.  This should be nothing new.

#### 
```
Multiple choice 

<div>
	<div ng-if="question">
		<h2> {{question.title}} </h2>
		<div>
			<div ng-repeat="choice in question.choices">
				<input ng-checked="answers[question.id] === choice" ng-click="update(choice)" name="answer" type="radio"> {{ choice }}
				<br>
			</div>
		</div>
		<br />
		<button class="saveBtn" ng-click="saveAnswer(selected)"> Save and Continue </button>
	</div>
</div>
```

```
fill in the blank

<div>
	<div ng-if="question">
		<h2> {{formattedQuestion}} </h2>

		<br />
		<input type="text" placeholder="Your answer here" ng-model="answer" ng-keyup="handleEnter($event, answer)"/>
		<br />
		<button class="saveBtn" ng-click="saveAnswer(answer)"> Save and Continue </button>
	</div>
</div>
```

### Mocking data in the Service

#### 
Your service needs to mock the ability to 
* getQuizNames - This will turn an array of quiz names.
* getQuestions - given a quizName it can get all questions for that quiz
* checkAnswers - This is not a mock, but given an array of questions and an object of answers it can check if the answer is the correct answer

Each of these will later be swapped to get data from the internet. Create your own promise in each function to return and resolve.

#### 
The structure of each question will be in the same structure as what is in `quizSampleObject.js` .  
* QuizNames are the names of the top level properties on our quizSampleObject.
* getQuestions will return an array of questions - see `quizSampleObject.js` for example
* checkAnswers takes in an array of questions and an answersObject that represents someones answers to those questions
    * Answers is an object where the keys are question ids and the values are the correct answer
    * If you look through the questions you will need to check the question type (multiple or blank)
        * Multiple choice questions need to look inside of question.choices to see if that choice is correct to compare against the answer
        * fill in the blank questions just have a correct property can can be compared against the answer string.
    * Create a results object that tracks each answer by question id. Use the value of true if its correct.
    
#### 

TODO - Make code sample for this - the solution is completed and not mocked.


### Wire it all together

#### 
Your save and continue button should store your answer and proceed to the next question.

Reset should clear out answer and allow you to proceed.

You have mock data you can put in your service to test your code.

#### 
Nope, no further hints.  Give it a solid try before peeking at the solution code or grabbing a mentor.


## D2) QuestionList Directive

### Move the view into a template

#### 
The first thing we want to do is move some code around.

In the quiz folder, create a new folder called `partials`.  
In this new folder create a file called `quizListView.html`

In the quiz folder create a `questionListDirective.js` file.  
Make a directive in that file that uses the view we just created as it's template URL.

Take the bottom half of `questionListWrapperView.html` starting at the div with the ng-repeat and
move it out of that file into the the new partial view we created.

If you test it now it should work exactly as it did before.  We didn't change anything, but we did move some things.  This will come in handy because we're going to re-use this question list on another screen once we can save our results.

#### 

__More in-depth__
My directive is called `question-list` inside of `questionListDirective.js` and it returns an object with a single property : `templateUrl` with a value pointing to the `quizListView.html`.

That quiz list view has the ng-repeat block that used to be found in the quizListWrapper.  

My quiz list wrapper has some buttons to check answers, reset, etc and a directive to handle the actual list of questions.

#### 
```
quizListWrapperView.html

<div>
	<div ng-if="saving">
		<div ng-include="'components/quiz/partials/saveQuizPrompt.html'"></div>
	</div>
	<div class="buttons">
		<button ng-click="savePrompt()">Save Answers</button>
		<button ng-click="checkMyAnswers()">Check Answers</button>
		<button ng-click="reset()">Reset</button>
		<input name="checkAnswers" type="checkbox" ng-model="obj.instant" ng-click="checkForResults()">
		<label for="checkAnswers">Instant Gratification </label>
	</div>
	<question-list></question-list>
</div>
```

```
quizListView.html


<div ng-repeat="question in questions track by question.id">
	<p ng-click="setQuestion(question)"><span ng-class="{'bold': question === currentQuestion}">{{question.id}}. {{question.title}} </span></p>

	<span ng-if="results.done || obj.instant">
		<span ng-if="results[question.id]"><i class="fa fa-check fa-lg blue"></i></span>
	<span ng-if="!results[question.id] && answers[question.id]"><i class="fa fa-times fa-lg orange"></i></span>
	</span>
	<span> {{answers[question.id]}} </span>
</div>
```

```
qestionListDirective.js

var app = angular.module('quizApp');

app.directive('questionList', function () {
	templateUrl: 'components/quiz/partials/questionListView.html',
});

```


### Setup the isolate scope

#### 

Setup an isolate scope in our question list directive that has the following properties:
* questions
* answers
* currentQuestion
* setCurrentQuestion

They should all be two-way bindings except for setCurrentQuestion that is an expression.

Pass in the matching values from the controller

If you ensure the property names on the controller match the ones you use here you won't have to change the template file.  If you want to see the separation, change the property names in various places and find the corresponding place to change to get it working again.

#### 
__isolate scope__
We create an isolate scope by adding a scope property on the object we are returning in our directive (right next to templateUrl).  The value of this property is an object.  For keys we list the properties we are going to want to add to our scope.  For values on those properties we tell the directive how to treat that property.

In this manner we're actually setting up instructions for the scope, not an actual object to be used as scope.

`= means two-way binding`
`& means expression`

__passing in values__
To pass values into our directive we have to pass them in via the html.
Add an attribute to our `<question-list></question-list>` element for every property we added to the scope.  
Give those attributes values equal to the property names on our controller. (Be sure to use kebab case)

So if my isolate scope had a property called `personName` and my controller had a property on its scope called `pName` I would have this in my directive:
```
scope:{
    personName:'='
}
```
and this in my html
`<question-list personName="pName"></question-list>`

This is going to create a two-way binding between the personName property on my directive and the pName property on my controller.  

Lets say I wanted to re-use this question-list using a different person.  All I have to do is change what property on my controller I'm pointing to like this:
`<question-list personName="notPNameButSomethingDifferent"></question-list>`

Follow the same patterns and setup the question list with the attributes listed above.

You should now have a directive that can use any set of questions and report the answers back to any array while tracking their currentQuestion separately. 


#### 
```
questionListDirective.js

var app = angular.module('quizApp');

app.directive('questionList', function () {
	return {
		scope: {
			obj: '=',
			questions: '=',
			results: '=',
			answers: '=',
			currentQuestion: '=',
			setCurrentQuestion: '&?'
		},
		templateUrl: 'components/quiz/partials/questionListView.html'
    }
}
```


## Multiple choice directive

### Create the template

#### 
Create a file called `multipleChoiceTmpl.html` and move your multiple choice html code inside it (from questionDetailView).

Create a directive file called `multipleChoiceDirective.js` and setup a directive using the above file as its templateUrl.

Go back into questionDetailView and add your multipleChoiceDirective into the html

Test it and ensure everything still works

#### 
This should follow the same pattern as above for moving html code into a template.

#### 
```
multipleChoiceTmpl.html

<div>
	<div ng-if="question">
		<h2> {{question.title}} </h2>
		<div>
			<div ng-repeat="choice in question.choices">
				<input ng-checked="answers[question.id] === choice" ng-click="update(choice)" name="answer" type="radio"> {{ choice }}
				<br>
			</div>
		</div>
		<br />
		<button class="saveBtn" ng-click="saveAnswer(selected)"> Save and Continue </button>
	</div>
</div>
```

```
multipleChioceDirective.js

var app = angular.module('quizApp');

app.directive('multipleChoice', function () {
    return {
	   templateUrl: 'components/quiz/partials/multipleChoiceTmpl.html'
    }
})
```

```
questionDetailView.html

<div>
	<div ng-if="currentQuestion.qtype === 'multiple'">
		<multiple-choice></multiple-choice>
		<br />
	</div>
	...
</div>
```

### Isolate the scope

#### 
Once again we want an isolate scope.  
This scope is going to have the following properties:
* question '='  - This is the current question
* save '&' - This is a function we can call to save our selected answer
* answers '=' - This is an array of all the answers we'll use to track and show their answer to the current question

Pass the values in via the html.


#### 

__Isolate scope__
```
		scope: {
			question: '=',
			save: '&',
			answers: '='
		},
```

__Passing values in__
This is going to be done in our questionDetailView.html on our `<multiple-choice>` directive element.

You will need an attribute for every property on the isolate scope bound back to properties on our controller.  It is important to note that this directive is NOT inside our list.  But on the side of it using the same parent controller.  So that is where the bindings for our directive are coming from.

#### 
```
multipleChoiceDirective.js

var app = angular.module('quizApp');

app.directive('multipleChoice', function () {
	return {
		scope: {
			question: '=',
			save: '&',
			answers: '='
		},
		templateUrl: 'components/quiz/partials/multipleChoiceTmpl.html'
    }
})
```


```
questionDetailView.html

<multiple-choice question="currentQuestion" save="saveAnswer(id, answer)" answers="answers">
</multiple-choice>
```

currentQuestion, saveAnswer, and answers are all properties on quizCtrl.
id and answer (for saveAnswer) are going to be passed in from our directive code.

### Restrict and Replace

#### 
Add a property on our directive to restrict the directive to be usable as an attribute or an element.
Add a property on our directive to specify that we want to replace whatever element we are applied to with our template.

#### 
The valid values for the restrict property are:
* 'A'   for attribute
* 'E'   for element
* 'C'   for class

The valid values for replace are:
* true
* false

Both of these properties are added the object that a directive returns (at the same level as templateUrl).

#### 

```
restrict: 'AE',
replace: true,
```

### Controller

#### 
We need our controller to be able to do 3 things:
* watch for the question to change and blank out selected when it does
* update the currently selected answer with a passed in choice
* save our answer back to the controller

#### 
__$watch__
$watch is a utility method on scope that can tell us when a certain property changes.  If I:
`$scope.$watch('cheese', function(){`
The function I pass it will be invoked every time my `$scope.cheese` property is changed.

In this case we want to watch the `question` property.
Inside our function we want to set `$scope.selected` to be an empty string

__update__ 
We want a `$scope.update` function that recieves a `choice` as a parameter.
If choice is truthy
    set `$scope.selected` equal to choice
    
__saveAnswer__
We want a `$scope.saveAnswer` function that receives a `selected` as a parameter

It will invoke `$scope.save` and pass in an object:
```
{
    id: $scope.question.id,
    answer: selected
}
``` 

We are sending the controller's save method the id of the question we're saving an answer for, and what answer they should save for that question id.

`$scope.save` comes from our isolate scope vai 2 way binding.  So this function is really a function that lives on our controller, we just have a pointer to it.

#### 
```
multipleChoiceDirective.js

var app = angular.module('quizApp');

app.directive('multipleChoice', function () {
	return {
		scope: {
			question: '=',
			save: '&',
			answers: '='
		},
		restrict: 'AE',
		replace: true,
		templateUrl: 'components/quiz/partials/multipleChoiceTmpl.html',
		controller: function ($scope, $attrs) {
			$scope.$watch('question', function () {
				$scope.selected = '';
			})
			$scope.update = function (choice) {
				if (choice) {
					$scope.selected = choice;
				}
			}
			$scope.saveAnswer = function(selected) {
				
				$scope.save({id: $scope.question.id, answer: selected});
			}
			
		}


	}
})
```

## Fill in the blank directive

### Follow all the same steps for the multipleChoiceDirective but naming things fillBlankDirective

#### 
Differences :
* Our template file needs to contain the fill in the blank html from questionDetailView instead of the multiple choice code
* The file names are going to be `fillBlankDirective.js` and `fillBlankTmpl.html`
* The controller will work different and is covered in the next step


### The controller on the directive

#### 
`$scope.saveAnswer` works the exact same as it does in the multiple choice directive.

`$scope.handleEnter` needs to take in two parameters: e, answer
If `e.keyCode` is 13  (That's the keycode for the enter key)
    call $scope.saveAnswer with the answer

`$scope.watch('question'` Needs to look in our answers object for the question.id we have on `$scope.question`.   If it exists then we know this question has been answered and we want to set `$scope.answer` equal to the answer from our answers.
    If it doesn't exist we want to set answer equal to an empty string.

#### 
__answers__

`$scope.answers` is an object.  Not an array.  But we don't know our question id at the time of writing the code.  So we need to access it dynamically using square bracket notation.

#### 
```
fillBlankDirective.js

var app = angular.module('quizApp');

app.directive('fillBlank', function () {
	return {
		scope: {
			question: '=',
			save: '&',
			answers: '='
		},
		restrict: 'AE',
		replace: true,
		templateUrl: 'components/quiz/partials/fillBlankTmpl.html',
		controller: function ($scope) {
			$scope.$watch('question', function () {
                $scope.formattedQuestion = $scope.question.title;
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
```

## Testing

### Test
You should be able to test your application with the mock data you set up on day one.

####
__Home Screen Functionality__
You should see a list of quizzes to take (from mock data)
You should be able to open a quiz.
You should see results (unpopulated) section.

__Quiz Screen functionality__
You see a list of questions on the left hand side
You see the current question on the right half of the screen
The correct directive is used based on the question type (multiple choice or fill in the blank)
You can answer a question 
You can click `CheckAnswers` button and it will mark a question as correct or incorrect.
You can click reset and it will blank out all answers.
You can click home and it will go back to the home screen.

## D3) Using firebase in our service

### Note

#### 
For this step we are going to replace existing functions in our service.  Be sure to remove the old mock functionality.

### Create a new firebase app

#### 
Go to firebase and create a new app.  Copy out your app url.

### Upload to your own firebase

Open uploadQuiz.js and paste in the url you just copied.

Open the terminal/command line where you are at. 

Type `node uploadQuiz.js`  (You will need to install nodejs if you haven't yet)

Open your firebase on their website and nagivate your app.  You should see some quiz data.


### Bring in Firebase in your app

Reference the scripts:
```
<script src="https://cdn.firebase.com/js/client/2.3.1/firebase.js"></script>
<script src="https://cdn.firebase.com/libs/angularfire/1.1.3/angularfire.min.js"></script>
```

Add firebase to your module in app.js
`var app = angular.module('quizApp', ['ui.router', 'firebase']);`

Inject the angular fire `$firebaseObject` and `$firebaseArray` into your quizService.
`app.service('quizService', function ($q, $firebaseObject, $firebaseArray) {`

Test your imports by checking the console in the browser for no errors.

### Set up the firebase refs

#### 
Setup your firebase Url on a var.
Create a firebase ref to `quizzes`, a $firebaseObject using that ref.

Create another firebase ref to `answers` and pass that ref into a $firebasearray.  

#### 
Creating a firebase ref looks like this:
`var newRef = new Firebase(urlGoesHere);`

Creating a $firebase object looks like this
`var targetFirebaseObj = $firebaseObject(newRef)` - Notice we are passing in the newRef created above.

This is creating an angular fire link for us so that we have a two way connction between our firebase server and our code.  By changing the url we pass in when we make the ref we can focus on specific parts of our firebase structure.

#### 
Code
```
var firebaseUrl = 'https://quiz-sample.firebaseIO.com'

var quizzes = new Firebase(firebaseUrl + '/quizzes');
var quizzesObj = $firebaseObject(quizzes);
var answers = new Firebase(firebaseUrl + '/answers')
var pastQuizArray = $firebaseArray(answers);
```

### Get available quiz names

#### 
Use our new firebase references to get a list of names of all available quizzes and send them back to the controller in the resolve function of our promise.

Warning: On a firebase object you will get back extra properties.  You'll need to filter these out.
Warning 2: Firebase throws an error if there is a problem.  Use a `.catch` on the promise as well

#### 
__Knowing when we have data__
The primary hook we have into getting our firebase data is the $loaded function.
It is invoked on an firebase object or array and returns a promise.  
It doesn't pass anything in, but when it is invoked we know the firebase object or array we used it on now has more data.

It looks something like this:

```
targetFirebaseObj.$loaded().then(function(){
    //targetFirebaseObj now has some data on it!
})

```

__Filtering out unwanted property names__
We can used two criteria to know if it's one of our properties.
* our object `hasOwnProperty`
* the first character is not a `$`

#### 
__ Code __
```
var getNames = function (list) {
    var names = [];
    for (var key in list) {
        if (list.hasOwnProperty(key) && key.charAt(0) !== '$') {
            names.push({ 'name': key, 'displayName': list[key].name });
        }
    }
    return names;
}

this.getQuizNames = function () {
    var dfd = $q.defer();

    quizzesObj.$loaded().then(function () {
        var names = getNames(quizzesObj);
        dfd.resolve(names);
    })
        .catch(function (err) {
            dfd.reject(err);
        })
    return dfd.promise;
}
```

### Get questions

#### 
The previous step only got us quiz names. We need the actual questions.
This is going to work identically to the step above except:
* We don't have to parse out the quiz name.
* The quiz name will be passed in as a parameter
* We can use the quiz name to get to the exact quiz we want and then get the `.questions` out.

#### 
__Hint code__
`var thingIWant = targetFirebaseObj[propertyKey].thingIWant`

#### 
__Code__
```
this.getQuestions = function (name) {
    var dfd = $q.defer();
    quizzesObj.$loaded().then(function () {
        var questions = quizzesObj[name].questions;
        dfd.resolve(questions);
    })
    .catch(function (err) {
            dfd.reject(err)
        })
    return dfd.promise;
}
```

### Test questions appear in quiz

#### 
If you set up your mock using promises the first time then the rest of your code should just work.
Test it and make sure you can open a quiz, see the quiz questions, and take the quiz.

### save answers

#### 
Now that we have a database we want to save our answers.

In our service, create a new function called `saveMyAnswers`.
It takes in: 
* answers - an array of answers
* quiz - The category of the quiz IE - Angular, HTML.  This is the same value as the key from our quizzesObj
* quizDate - The dateTime this quiz was taken (now)
* quizNickName - A nickname for this quiz (optional and defaulted to 'answers').  This will replace the date and time.

It creates a new firebaseRef using the first 3 parameters above in this format
`firebaseUrl + '/answers/' + quiz + '/' + quizDate + '/answers'`

It saves/sets the data and then resolves the promise with 'answers saved'

#### 
__Pseudo Code__
```
var dfd = defer()
var ref = Firebase( url )

if(nickname)
    ref.parent.set({ name: nickName })

ref.set(actualDataWeWanttoSave)
resolve('...')

return dfd.promise
```

#### 
__Actual Code__
```
var dfd = $q.defer();
var myAnswers = new Firebase(firebaseUrl + '/answers/' + quiz + '/' + quizDate + '/answers');
if (quizNickName) {
    myAnswers.parent().set({name: quizNickName})
}
myAnswers.set(answers);
dfd.resolve('answers saved');

return dfd.promise;
```

## BD) Instant gratification
### When taking a quiz get instant results after answering a questions

#### 
You will need to do the following to finish this black diamond.

1) Make it so that when this checkbox is checked all question answers and graded instantly with results shown in the question list.


## BD) History
### Get the saved questions and show them on the history page

#### 
You will need to do the following to finish this black diamond.

1) The home page will list the nicknames/dates of all answers that have been saved
2) Users can click on the one of the nicknames and go to a new route to see those answers again
3) The new route page uses all of the directives we have created
4) The screen looks exactly like the take a quiz screen except that it is read-only so:
    - No functioning buttons
    - No changing any answers
    - Only browsing/looking at the answers