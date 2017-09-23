
/**
 * 页面配置参数
 * @return {[type]} [description]
 */
(function () {
    'use strict';
    angular
        .module('app')
        .controller('channelInformationCtrl', channelInformationCtrl);

    // 根控制器
    function channelInformationCtrl ($scope,$http,$interval,popup) {
		//获取验证码
		var second = 49,timePromise;
		  $scope.verificationButton = '获取验证码';
		  $scope.codeBtn = '';
		  $scope.getCode = function(){
		    $http.get('json/code.json', {
		    	
		    }).success(function (data) {
		        console.log(data);
		    });
		    $scope.codeing = true;
		    timePromise = $interval(function(){
		      if(second <= 0){
		        $interval.cancel(timePromise);
		        timePromise = undefined;
		        second = 49;
		        $scope.verificationButton = "获取验证码";
		        $scope.codeing = false;
		      }else{
		        $scope.verificationButton = second + "秒后可重发";
		        second--;
		      }
		    },1000)
		  }
		  
	//复制链接
	
		$scope.Copy=function(str) {
	      	var save = function(e) {
	        e.clipboardData.setData('text/plain', str);
	        e.preventDefault();
      	}

	      //检测是否是ie浏览器
	      if(!!window.ActiveXObject || "ActiveXObject" in window) {
	        console.log("aa");
	        window.clipboardData.setData("text", str);
	      } else {
	        console.log("bb");
	        document.addEventListener('copy', save);
	      }
	      document.execCommand('copy');
    }
	//弹出框
	$scope.hide=function(){
		$scope.display=false
	}
	$scope.alertModel=function(){
		$scope.display=true
	}
	//绑定公会
	$scope.sociatyid=" "
	$scope.bind=function(){	
		if($scope.sociatyid==" "){
			$scope.nullval=true;
			$scope.remdisplay=true;
		}else if($scope.sociatyid!=sociatyid){
			$scope.changedisplay=true;
			$scope.changeval=true;
		}else{
			$scope.isright=true;//正确id提示显示
			$scope.nullval=false;
			$scope.binddisplay=true;//正确的id弹框
		}
	}
	//点击隐藏
	$scope.hide=function(){
		$scope.binddisplay=false
	}
	//点击确认绑定
	$scope.confirm=function(){
		$scope.binddisplay=false;
		$scope.sociatyid=sociatyid;//输入一次后，id注入到input中
	}
	//点击解绑
	$scope.removebind=function(){
		$scope.remdisplay=false;
	}
	
	
	
	
  }
}());
