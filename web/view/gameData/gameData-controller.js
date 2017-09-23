
/**
 * 页面配置参数
 * @return {[type]} [description]
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('gameDataCtrl', gameDataCtrl);

    // 根控制器
    function gameDataCtrl ($scope,$http,storm) {
//  	$scope.getData=function(){
//	    		$http.get("data/gameData.json").success(function(response){
//	    		$scope.names=response.data;
//  		})
//  	}
//  	$scope.getData();
    	//下拉加载
    	$scope.names=[];
		$scope.page = 0;
       $scope.gameData = function () {
       	
       	   $scope.page = $scope.page + 1;
    		$http.get("data/gameData.json")
    		.success(function (res) {
    			$scope.names =$scope.names.concat(res.data)
				
    		});
    	}
        $scope.gameData();
        
		//详情每日数据table下拉加载
		var gametableList=document.getElementsByClassName("gametableList");
		storm.pullLoad(gametableList[0],function(){
				$scope.gameData()
			
	    })
		//详情游戏查询table下拉加载
		var gameinquTable=document.getElementsByClassName("gameinquTable");
		storm.pullLoad(gameinquTable[0],function(){
				$scope.gameData()
			
	    })
		//弹框游戏查询table下拉加载
		var gamemodeltable=document.getElementsByClassName("gamemodeltable");
		storm.pullLoad(gamemodeltable[0],function(){
				$scope.gameData()
			
	    })
		//点击查看数据跳出弹框
    	$scope.gameDatamodel=function(){
			$scope.display=true
		}
    	//点击关闭，关闭弹框
    	$scope.hide=function(){
			$scope.display=false
		}
    	
    	//定义弹框宽高

		var Height = window.screen.availHeight;

        var Width = window.screen.availWidth;	

		var myHeight=(Height*0.6)+'px';

		var myWidth=(Width*0.6)+'px';

		document.getElementById("popupview").style.width=myWidth;

		document.getElementById("popupview").style.height=myHeight
   	}
}());
