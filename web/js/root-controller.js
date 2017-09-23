
/**
 * 页面配置参数
 * @return {[type]} [description]
 */
(function (app) {
    'use strict';

    app.controller('rootCtrl', rootCtrl);

    // 根控制器
    function rootCtrl ($rootScope, $scope,$http,$location) {
    	  
    	//加载之前判断
		$scope.load=function(){
			$http.get("data/getMerchantState.json",{}).success(function(rep){
				$scope.cause=rep.message;
				$scope.name=rep.nickname;
				$scope.ispe=rep.ispore;//判断个人或者企业
				
				switch(rep.data.state) {
					case -1:
						$location.path('/404');
					break;
					case 0:
						$location.path('/perfectInformation');
					break;
					case 1:
						$location.path('/beingAuditedTS');
					break;
					case 2:
						$location.path('/nopassed');	
					break;
					case 4:
						$location.path('/accountFreezeTS');	
					break;
					case 5:
						$location.path('/sidebar');	
					break;
					default:
						$location.path('/404');   
					
				}
			})
		}
		$scope.load();
		//js截取时间
		var date=new Date;
		 var year=date.getFullYear(); 
		 var month=date.getMonth()+1;
		 month =(month<10 ? "0"+month:month); 
		 var mydate = (year.toString()+month.toString());
         $scope.yeardate=year.toString();
         $scope.monthdate=month.toString();
         
         
         //获取昨天日期
    	function GetDateStr(AddDayCount) {
		    var dd = new Date();
		    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
		    var y = dd.getFullYear();
		    var m = dd.getMonth()+1;//获取当前月份的日期
		    var d = dd.getDate();
		    return y+"-"+m+"-"+d;
		    
		}
    	$scope.totaydata=GetDateStr(0);
    	$scope.yesterday=GetDateStr(-1);
    	$scope.tenday=GetDateStr(-9)
         
		//判断跳转
		var url = $location.url(); 
		if(url==""||url=="/"){
			$scope.load();
		}
         
        // app
        $rootScope.app = $rootScope.app || {};

        // 标题
        $rootScope.app.name = '游戏猫渠道站';

        // loading
        $rootScope.loading = true;

        // 是否启用主要内容
        $rootScope.app.isMain = true;

        // 是否启用面包屑
        $rootScope.app.isPosition = true;

        // 是否启用侧边栏
        $rootScope.app.isSidebar = true;

        // 是否启用头部
        $rootScope.app.isHeader = true;

        // 是否启用尾部
        $rootScope.app.isFooter = true;
    }
}(app));
