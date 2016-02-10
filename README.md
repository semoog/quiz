Day 1
--


## Folder Structure (Day 1)
### Explanation
####
The first thing we want to do is create our folder structure.  Proper and consistent folder structure can save you and your team hours of work.  The most important rule of folder structure is consistency.  After that there is more than one correct way to structure the files in an application.  For this project we will be using a feature based approach for our files.
####
####

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
####
####

## Create and test your app (Day 1)

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

### Setup fake data in service
TODO

### Home page done - recap

#### 
We've finished our first route.  We set up our route, injected ng-routing, and told it to use the homeView and homeController files for the home page.

We then worked in those files to bind an array of quizzes to the ui.


## Quiz Page (Day 1) 

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

Look at the QuizSample object to get an idea of the data you're working with.


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

#### 

We nested views, but we did not nest controllers, so we can bind to the parent controller we've already set up (quizCtrl)

The CheckAnswers button will use the checkAnswers function on your controller
The Rest button will use the reset function on your controller
The question list will be bound to our questions array.
It needs to watch the currentQuestion to determine when to bold an item 

We don't need to set up anything else for now.  We'll get more functionality into this code tomorrow with directives.

#### 

questionListWrapperView.html
```
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

Try and get two layouts that look like this:


<img src="http://i.imgur.com/OcCraj4.png" width="100%" height="100%"></img>

<img src="http://i.imgur.com/DTmXH15.png" width="100%" height="100%"></img>

#### 
Look back on your code from last week and remember how to do this.  This should be nothing new.

#### 
You really want to see code?  You can find it in the solution branch. 

### Wire it all together

#### 
Your save and continue button should store your answer and proceed to the next question.

Reset should clear out answer and allow you to proceed.

You have mock data you can put in your service to test your code.

#### 
Nope, no further hints.  Give it a solid try before peeking at the solution code or grabbing a mentor.


## Quiz Page (Day 2)

### Quiz List

#### Move

#### Logic


## Multiple choice directive


## Fill in the blank directive



* Setup basic routes
* Take a simple quiz
* Show basic Results
* Style application

Day 2
--
* Move basic quiz into directive

Day 3
--
* Firebase

Day 4
--
* Firebase Auth

Day 5
--
* Review and personal project
