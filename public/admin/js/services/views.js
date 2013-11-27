//Views service used for sources REST endpoint
angular.module('mean-admin.system').factory("Views", function($resource){
	return $resource('cms/views/:viewId', {viewId:'@viewId'}, {update: {method: 'PUT'}});
});