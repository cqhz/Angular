/**
 * 页面配置参数
 * @return {[type]} [description]
 */
(function() {
	'use strict';

	angular
		.module('app')
		.controller('gameIncomePCtrl', ['$scope', '$http','popup', gameIncomePCtrl]);

	// 根控制器
	function gameIncomePCtrl($scope, $http,popup) {
		$scope.getData = function() {
			$http.get("data/gameIncome.json").success(function(response) {
				$scope.names = response.data;
			})
		}
		$scope.getData();

		//多选
		$scope.isCheck = [];
		$scope.hasCheckStatus = 0;
		$scope.isShow = false;
		$scope.timeString = [];
		$scope.changeBandleCheck = function(meal, val) {
				console.log(meal);
				console.log(val);
				if(val == true) {
					$scope.isCheck.push(meal);
					$scope.timeString.push(meal.time);
				} else {
					for(var i = 0; i < $scope.isCheck.length; i++) {
						if($scope.isCheck[i] == meal) {
							$scope.isCheck.splice(i, 1);
							$scope.timeString.splice(i, 1);
						}
					}
					
				}
				$scope.batch=$scope.timeString.join(',');
				console.log($scope.batch);
				console.log($scope.isCheck);
				if($scope.isCheck.length >= 2) {
					$scope.isShow = true;
				} else {
					$scope.isShow = false;
				}
				
			}
			
			//全选
		$scope.allChecked = function(m,n) {
			console.log(m);
			console.log(n);
			$scope.isCheck = [];
			$scope.timeString = [];
			if(m) {
				$scope.isShow = true;
				for(var j = 0; j < n.length; j++) {
					if(n[j].setstatus == -1) {
						$scope.isCheck.push(n[j]);
						$scope.timeString.push(n[j].time);
						$scope.hasCheckStatus ++;
					}
				}
			} else {
				$scope.isShow = false;
				$scope.isCheck = [];
				$scope.timeString = [];
			}
			$scope.batch=$scope.timeString.join(',');
			console.log($scope.batch);
			console.log($scope.isCheck);
			
		}
		//点击批量结算
		$scope.moreS = function() {
			$scope.selectState=true;
			$scope.display = true;
			$scope.selectState="true";
		}
		
		//点击查看弹框
		$scope.viewDetails=function(rep){
			$scope.setways=rep.setway;
//			console.log($scope.setways)
			$scope.viewdisplay=true;
		}
		
		//点击结算弹框
    	$scope.setAccounts = function(val) {
			$scope.display = true;
			$scope.selectState="true";
			$scope.batch=val.time;
			
		}
    	// 点击关闭，关闭弹框
		$scope.hide = function() {
			$scope.display = false;
			$scope.setdisplay=false;
			$scope.viewdisplay=false;
		}
		//点击确认结算
		$scope.setConf=function(){
			$scope.display = false;
			if ($scope.selectState=="false") {
				$scope.setdisplay=true;
			}else{
				$scope.miaodisplay=true;
				$scope.setdisplay=false;
			}
//			popup.alert({
//            body: '结算失败，请重新发起申请！',
//            confirm: function () {
//                
//            }
//        	});
			
			
		}
		//微信结算确认
		$scope.confirm=function(){
			$scope.setdisplay=false;
		}
		//喵点结算确认
		$scope.miaofirm=function(){
			$scope.miaodisplay=false;
		}
	}
}());