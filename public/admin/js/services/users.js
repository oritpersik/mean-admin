//Users service used for users REST endpoint
angular.module('mean-admin.users').factory("Users", ['$resource', function($resource) {
    return $resource('users/:userId', {
        userId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);