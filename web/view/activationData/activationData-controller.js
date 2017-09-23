
/**
 * 页面配置参数
 * @return {[type]} [description]
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('activationDataCtrl', activationDataCtrl);

    // 根控制器
     function activationDataCtrl ($scope, $http) {
    	
    	$scope.getData = function () {
    		$http.get("data/actvaData.json")
    		.success(function (response) {
    			$scope.names = response.records;
    			$scope.retratnumber=0;
    			$scope.retratincome=0;
    			for(var i in $scope.names){
    				$scope.retratnumber += $scope.names[i].number;
    				$scope.retratincome += $scope.names[i].income;
    			}
    		});
    	}
    	
    	$scope.getData();
//		 var date=new Date;
//		 var year=date.getFullYear(); 
//		 var month=date.getMonth()+1;
//		 month =(month<10 ? "0"+month:month); 
//		 var mydate = (year.toString()+month.toString());
//		
//       $scope.yeardate=year.toString();
//       $scope.monthdate=month.toString();
         
//       console.log($scope.yeardate)
         
    	//点击查询
//  	$scope.inquiry=function(){
//    		  	$http({
//			          method: 'get',
//			          url: 'data/code.json',
//			          params: {
//			            "time": $scope.records.time
//			          }
//			    }).success(function(res) {
//			          if(res.code == "000") {
//			            cuntDown();
//			          } else {
//			            alert(res.message);
//			          }
//			    }).error(function() {
//			          alert("网络错误");
//			    })
//  	}

    }
}());
