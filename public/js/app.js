
var app = angular.module('mean-auth-starter', [
  'ui.router',
  'satellizer',
  'ct.ui.router.extras',
  'todoController',
  'todoService'
]);

app.run(function($state, $rootScope, $location) {
  $rootScope.$state = $state;
  $rootScope.$location = $location;
})


app.config(function($stateProvider, $stickyStateProvider, $urlRouterProvider, $authProvider){
	// satellizer config
	// $authProvider.facebook({
	// 	clientId: 'Facebook App ID'
	// });

    // define routes
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "templates/main.html",
      controller: 'MainCtrl',
      sticky: true,
      dsr: true
    })
		.state('register', {
			url: "/register",
			templateUrl: "templates/register.html",
			controller: 'AuthCtrl',
			resolve: {
			  skipIfLoggedIn: skipIfLoggedIn
			}
		})
		.state('login', {
			url: "/login",
			templateUrl: "templates/login.html",
			controller: 'AuthCtrl'
		})
		.state('logout', {
			url: '/logout',
			template: null,
			controller: 'LogoutCtrl'
		})
		.state('profile', {
			url: '/profile',
			templateUrl: 'templates/profile.html',
			controller: 'ProfileCtrl',
			resolve: {
				loginRequired: loginRequired
			}
		}).state('appimpl', {
			url: '/appimpl',
			templateUrl: 'templates/appimpl.html',
			controller: 'AppimplCtrl',
			resolve: {
				loginRequired: loginRequired
			}
		});



  
  $stateProvider.state('tabs.account', {
    url: '/account',
    sticky: true,
    dsr: true,
    views: {
      'account': {
        templateUrl: 'account.html'
      }
    },
  });

  $stateProvider.state('tabs', {
    url: '/tabs',
    templateUrl: 'tab-viewport.html',
      sticky: true,
      dsr: true
  });
  
  $stateProvider.state('tabs.account.stuff', {
    url: '/stuff',
    template: "<h3>Here's my stuff:</h3><ul><li>stuff 1</li><li>stuff 2</li><li>stuff 3</li></ul>"
  });
  $stateProvider.state('tabs.account.things', {
    url: '/things',
    template: "<h3>Here are my things:</h3><ul><li>thing a</li><li>thing b</li><li>thing c</li></ul>"
  });
  $stateProvider.state('tabs.survey', {
    url: '/survey',
    sticky: true,
    views: {
      'survey': {
        templateUrl: 'survey.html'
      }
    }
  });
    
  
	$urlRouterProvider.otherwise("/");

	// Resolve functions
	function skipIfLoggedIn($q, $auth) {
      var dfd = $q.defer();
      if ($auth.isAuthenticated()) {
        dfd.reject();
      } else {
        dfd.resolve();
      }
      return dfd.promise;
    }
    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }

  $stickyStateProvider.enableDebug(true);
});
