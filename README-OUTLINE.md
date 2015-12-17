Day 1
--


## Folder Structure
#### Explanation
The first thing we want to do is create our folder structure.  Proper and consistent folder structure can save you and your team hours of work.  The most important rule of folder structure is consistency.  After that there is more than one correct way to structure the files in an application.  For this project we will be using a feature based approach for our files.

#### Instructions
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

#### Explanation

Next we want to get our angular app set up and make sure it works.

#### Instructions

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

## Creating our first Route

#### Explanation

ui-router is a library that will swap out the content of elements we specify based on the state of our application.  To make this works we need to do three things: Bring the library into our page, tell it where we want things to be swapped out, give it instructions for what to swap and when

#### Instructions

### _Include the library_

We already added a reference to ui-router in our `index.html`

_Next_ : Tell angular to inject ui-router into our app/module.
This is done by including `ui.router` in the array we make when declaring a module like so :
`angular.module('quizApp', ['ui.router'])`

### _Tell it where we want things swapped out_

#### Explanation

The `<ui-view></ui-view>` tag is a placeholder telling ui-router where we want things swapped out.

We are also going to add a header that is not inside the `ui-view` tag. Because of this, it will be visible on all pages.  It contains a link with a `ui-sref` (UI state reference).  We use this for internal navigation links instead of the usual href.  The ui-router library contains code watching for this attribute

The other part of this is placing the content we want to display in the correct template file. We need to add content into `homeView.html`.  For now let's use mustache brackets to show a `test` property inside of a div.

#### Instructions
Go into the `index.html` and add the following code in the body

```
<header>
  <ul>
    <li><a ui-sref="home">HOME</a></li>
  </ul>

</header>

<ui-view></ui-view>
```

### _Give the router instructions_

#### Explanation

UI Routing works based off of a 'state'.  The state in this case is represented as a string.  We will have 3 primary states in our application : `home`, `quiz`, `results`

Each state can also have substates.  In this application we will have 1 substate `quiz.view`.  This is still a string, but we are designating a substate by using a period to separate it from its parent.

Once we have the state we can tell the router which template/templateUrl, controller, and other properties to use when the state changes.

* url - The url property specifies what we want the sub-url to look like.  The sub-url is the part of the url after the # symbol.
* templateUrl - This property provides the path (from the index.html file) to another .html file.  The content of this file will be replace all existing content inside the the `<ui-view></ui-view>` element we made previously
* controller - This property tells ui-router the name of the controller to use.  This works just like ng-controller and only needs the name.
* resolve - This property will prevent the app from routing until all of the data is retrieved.  This data will be passed into the controller.

#### Instructions

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
