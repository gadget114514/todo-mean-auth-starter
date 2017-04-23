angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/todo/api/todos');
			},
			create : function(todoData) {
				return $http.post('/todo/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/todo/api/todos/' + id);
			}
		}
	}]);
