angular.module('mean-admin.users').controller('UsersController', ['$scope', '$routeParams', '$location', 'Global', 'Users',
    function($scope, $routeParams, $location, Global, Users) {
        $scope.global = Global;
        $scope.roles = ['user', 'admin'];

        $scope.add = function() {
            if (!$scope.users) $scope.users = [];

            var user = new Users({
                firstName: this.firstName,
                lastName: this.lastName,
                username: this.username,
                email: this.email,
                password: this.password,
                role: this.role
            });

            user.$save(function(response) {
                $scope.users.push(response);
            });

            this.firstName = this.lastName = this.username = this.email = this.password = this.role = "";
        };

        $scope.remove = function(user) {
            for (var i in $scope.users) {
                if ($scope.users[i] == user) {
                    $scope.users.splice(i, 1);
                }
            }

            user.$remove();
        };

        $scope.update = function(user) {
            user.$update();
        };

        $scope.init = function() {
            Users.query({}, function(users) {
                $scope.users = users;
            });
        };

        $scope.getRoleName = function(user) {
            for (var i in $scope.roles) {
                if (user.role == $scope.roles[i]) {
                    return $scope.roles[i];
                }
            }

            return "None";
        };
    }
]);