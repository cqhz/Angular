
/**
 * 页面配置参数
 * @return {[type]} [description]
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('pushManagementCtrl', pushManagementCtrl);

    // 根控制器
    function pushManagementCtrl ($scope,$http) {
    	$scope.getData=function(){
    		$http.get("data/pushManagement.json").success(function(response){
    			$scope.names=response.records;
    		});
    	}
    	$scope.getData();
    	
    	$scope.getdata = function(){
    		console.log($scope.pushtime);
    	};

		
			
		window.pushtimeChange = function (mydate) {
			$scope.$apply(function () {
				$scope.pushtime = mydate.el.value;
			});
		}	
		
		$scope.submit = function() {
			$scope.form = {
				"title" : $scope.heading,
				"content" : $scope.content,
				"datetime" : $scope.pushtime
			}
			
		
	    }
    }
}());
