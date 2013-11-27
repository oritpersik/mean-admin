angular.module('mean-admin.views').controller('ViewsController', ['$scope', 'Views',
    function($scope, Views) {
        $scope.add = function() {
            if (!$scope.views) $scope.views = [];
            var view = new Views({
                name: this.name
            });
            view.$save(function(response) {
                $scope.views.push(response);
            });

            this.name = this.icon = "";
        };

        $scope.remove = function(view) {
            view.$remove();
            for (var i in $scope.views) {
                if ($scope.views[i] == view) {
                    $scope.views.splice(i, 1);
                }
            }
        };

        $scope.update = function(view) {
            view.$update();
            view.viewId = view.name.toLowerCase().replace(/ /g,'-');
        };

        $scope.init = function() {
            Views.query({}, function(views) {
                $scope.views = views;
            });
        };
    }
]);