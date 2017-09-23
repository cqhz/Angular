
/**
 * 页面配置参数
 * @return {[type]} [description]
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('gameManagementCtrl',['$scope', '$http', '$rootScope', '$timeout', 'storm', 'popup', gameManagementCtrl]);

    // 根控制器
    function gameManagementCtrl ($scope,$http,$rootScope, $timeout,storm,popup) {
    	$scope.getData=function(){
    		$http.get("data/gameManagement.json").success(function(response){
    			$scope.names=response.records;
    			
    		});
    	}

		$scope.names=[];
		$scope.page = 0;
		$scope.gameDate = function() {
			$scope.page = $scope.page + 1;
			$http.get("data/gameManagement.json")
				.success(function(response) {
					$scope.names = $scope.names.concat(response.records);
					$scope.downloadurl=response.loadurl
//					console.log($scope.downloadurl)
				});
		};
		$scope.gameDate();
		
		//下拉加载
		var gameTable=document.getElementsByClassName("gametable");
    		storm.pullLoad(gameTable[0],function(){
				$scope.gameDate();
				
    	})
		// 复制链接
		$scope.Copy = function() {
			var str = $scope.downloadurl;
			var save = function(e) {
				e.clipboardData.setData('text/plain', str);
				e.preventDefault();
			}

			// 检测是否是ie浏览器
			if (!!window.ActiveXObject || "ActiveXObject" in window) {
				window.clipboardData.setData("text", str);
			} else {
				document.addEventListener('copy', save);
			}
			document.execCommand('copy');
			popup.alert({
				body : '复制成功',
			});
		}
		//点击用户查询里的查询
		$scope.isBelong=function(){
			$scope.belong=true;
		}
    	
    	//点击查询弹框
    	$scope.userQuery = function() {
			$scope.display = true
		}
    	// 点击关闭，关闭弹框
		$scope.hide = function() {
			$scope.display = false
		}
    	
    	
    }
}());
