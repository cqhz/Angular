
/**
 * 页面配置参数
 * @return {[type]} [description]
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('perfectInformationCtrl', perfectInformationCtrl);

    // 根控制器
    function perfectInformationCtrl ($scope,$interval,$http) {
    	
	    //默认显示第一个radio
		$scope.formChecked1 = true;
		
		//获取表单老数据
		$http.get('data/getData.json', {
	  }).success(function (data) {
	  	
	  	//表单默认选项
	  	$scope.checkedState = data.checkedState;
	  	if($scope.checkedState === 1){
	  		$scope.formChecked1 = true;
	  	}else if($scope.checkedState === 2){
	  		$scope.formChecked2 = true;
	  	}
	    $scope.realName = data.realName;
	    $scope.enterprise = data.enterprise;
	    $scope.phoneNum = data.phoneNum;
	    var reader = new FileReader();
	    if(data.img.length > 0){
	    	for(var i in data.img){
		    	var image_source = "image_source" + (parseInt(i)+1)
		    	$scope[image_source] = data.img[i].pic;
		    }
	    }
	  });
	  
	  //上传表单
	  $scope.goSubmit = function(){
	  	var fileArr = [],
	  	fileObj = {};
	  	if(!$scope.image_source1 || !$scope.image_source2){
	  		alert("请上传证件照");
	  		return false;
	  	}else{
	  		fileObj.file1 = $scope.image_source1;
				fileObj.file2 = $scope.image_source2;
	  	}
	  	if($scope.checkedState === 2){
	  		if(!$scope.image_source3 || !$scope.image_source4){
		  		alert("请上传证件照");
		  		return false;
		  	}else{
		  		fileObj.file3 = $scope.image_source3;
				fileObj.file4 = $scope.image_source4;
		  	}
	  	}
	  	fileArr.push(fileObj);
	  	
	  	$scope.form = {
	  		"checkedState":$scope.checkedState,
	  		"realName":$scope.realName,
	  		"enterprise":$scope.enterprise,
	  		"phoneNum":$scope.phoneNum,
	  		"verification":$scope.verification,
	  		"filePic1":fileArr
	  	}
	  	
	  }
	  
	  //图片上传预览
//		$scope.setFile = function(element,index) {
//		  $scope.currentFile = element.files[0];
//		  var reader = new FileReader();
//		
//		  reader.onload = function(event) {
//		  	var image_source = "image_source"+index;
//		    $scope[image_source] = event.target.result;
//		    $scope.$apply();
//		  }
//		  reader.readAsDataURL(element.files[0]);
//		}
		

	$scope.upload=function(response){
		
		var src = "data:image/png;base64," + response;
		//获取上传图片token
		var qinRep = {
			"fileType": 0, //文件类型:0-图片,1-视频,2-其他
			"uploadType": 1 //上传类型:0-简单上传,1-覆盖上传,2-策略上传:转换GIF格式上传,3-策略上传 : 转 GIF 并解决 gif 倒置问题,4- 策略上传 :  图片 压缩 剪切 120*120
		};
		$http.post(function(res) {
			if(res.code == "000") {
				//上传图片  res.data  七牛token  src图片base64文件格式
				uploadImg(res.data, response);
			} else {
				alert(res.message);
			}
		});
		
		function uploadImg(token, src) {
			
			$http({
				url: 'http://up.qiniu.com/putb64/-1/',//获取七牛的url
				method: 'post',
				data: src
			}).success(function(res) {
					//上传图片成功后操作    
					imgArr.push("http://img.youximao.tv/" + res.key);
					
					for(var i = 0; i < imgArr.length; i++) {
						$scope.picList = [];
						$scope.addPic = function() {
							$scope.picList.push({
								"src":imgArr[i]
							});
						}
					}
			})
		}
	}
					
	  //获取倒计时按钮
	  var second = 49,timePromise;
	  $scope.verificationButton = '获取验证码';
	  $scope.codeBtn = '';
	  $scope.getCode = function(){
	  	$http.get('json/createWechatGoodsOrder.json', {
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
	   }
}());
