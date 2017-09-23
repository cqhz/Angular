
/**
 * 页面配置参数
 * @return {[type]} [description]
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('userDataCtrl', userDataCtrl);

    // 根控制器
    function userDataCtrl ($scope, $http) {
    	$scope.getData = function () {
    		$http.get("data/userData.json")
    		.success(function (response) {
    			$scope.names = response.records;
    			$scope.overallnumber=0;
    			for (var i in $scope.names) {
    				$scope.overallnumber += $scope.names[i].overallnum;
    			}
    		});
    	}
    	
    	$scope.getData();	

    }
}());