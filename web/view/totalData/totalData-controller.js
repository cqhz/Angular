
/**
 * 页面配置参数
 * @return {[type]} [description]
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('totalData', totalData);

    // 根控制器
    function totalData ($scope, $http,storm) {
    	$scope.getData = function () {
    		$http.get("data/totalData.json")
    		.success(function (response) {
    			
    			$scope.gameNum = response.data.gamenum;
				$scope.activaNum = response.data.activanum;
    			$scope.regisNum = response.data.regisnum;
    			$scope.momeyNum = response.data.momey;
    		});
    	}
       $scope.getData();
       
       $scope.names=[];
		$scope.page = 0;
       $scope.gameDetails = function () {
       	
       	   $scope.page = $scope.page + 1;
    		$http.get("data/gameDetailsData.json")
    		.success(function (res) {
    			$scope.names =$scope.names.concat(res.records)
				
    		});
    	}
        $scope.gameDetails();
        
//      详情table下拉加载
		var detailsTable=document.getElementsByClassName("Detailstable");
		storm.pullLoad(detailsTable[0],function(){
				$scope.gameDetails()
			
	    })
        
        $scope.viewname=[];
		$scope.mypage = 0;
        $scope.viewData = function () {
        	$scope.mypage = $scope.mypage + 1;
    		$http.get("data/viewData.json")
    		.success(function (rep) {
    			$scope.viewname =$scope.viewname.concat(rep.records)
				
    		});
    	}
        $scope.viewData();
        //弹框table下拉加载
        var modelTable=document.getElementsByClassName("modeltable");
			storm.pullLoad(modelTable[0],function(){
					$scope.viewData()
				
		    })
        
       //点击查看数据跳出弹框
    	$scope.viewDatamodel=function(){
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
    	//选择日期
    	$scope.choose="选择日期"
    	//获取昨天日期
    	function GetDateStr(AddDayCount) {
		    var dd = new Date();
		    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
		    var y = dd.getFullYear();
		    var m = dd.getMonth()+1;//获取当前月份的日期
		    var d = dd.getDate();
		    return y+"-"+m+"-"+d;
		    
		}
    	$scope.totaydata=GetDateStr(0)
    	$scope.yesterday=GetDateStr(-1)
    }
}());
