//Setting up route
angular.module('mean-admin').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/users', {
            templateUrl: 'admin/views/users.html'
        }).
        when('/users/:userId', {
            templateUrl: 'admin/views/user.html'
        }).
        when('/', {
            templateUrl: 'admin/views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean-admin').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);