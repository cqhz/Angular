
/**
 * 页面配置参数
 * @return {[type]} [description]
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('registrationData', registrationData);

    // 根控制器
    function registrationData ($scope, $http) {
    	$scope.getData = function () {
    		$http.get("data/registrationData.json")
    		.success(function (response) {
    			$scope.names = response.records;
    			$scope.countNumber = 0;
    			$scope.countIncome = 0;
    			for(var i in $scope.names){
    				$scope.countNumber += $scope.names[i].number;
    				$scope.countIncome += $scope.names[i].income;
    			}
    		});
			
    	}
    	$scope.getData();
    }
}());
