
/**
 * 页面配置参数
 * @return {[type]} [description]
 */
(function (app) {
    'use strict';

    angular
        .module('app')
        .controller('sidebarCtrl', sidebarCtrl);

    // 根控制器
    function sidebarCtrl ($scope,$http) {
    		$http.get("data/indexData.json").success(function(response){
    			for (var i in response.records) {
    				$scope['show' + response.records[i]] = true;
    			}
    			//首页动画兼容ie9
    			 var b = response.records.length;
				 //console.log(b)
				 
				switch(b) {
					case 1:
						$("#navList li").css("width","100%");
					break;
					case 2:
						$("#navList li").css("width","50%");
						$("#navList li").hover(function () {
						        $(this).css("width","66.667%").siblings().css("width","33.3333%");
						      },function () {
     							  $("#navList li").css("width","50%");
      						  }
						   )
					break;
					case 3:
						$("#navList li").css("width","33.333333%");
						$("#navList li").hover(function () {
						        $(this).css("width","50%").siblings().css("width","25%");
						      },function () {
     								$("#navList li").css("width","33.333333%");
      						  }
						   )
					break;
					case 4:
						$("#navList li").css("width","25%");
						$("#navList li").hover(function () {
						        $(this).css("width","40%").siblings().css("width","20%");
						      },function () {
     								$("#navList li").css("width","25%");
      						  }
						   )
					break;
					case 5:
						$("#navList li").css("width","20%");
						$("#navList li").hover(function () {
						        $(this).css("width","33.33333%").siblings().css("width","16.666667%");
						      },function () {
     								$("#navList li").css("width","20%");
      						  }
						   )
					break;
					case 6:
						$("#navList li").css("width","16.666667%");
						$("#navList li").hover(function () {
						        $(this).css("width","28.57%").siblings().css("width","14.28%");
						      },function () {
     								$("#navList li").css("width","16.666667%");
      						  }
						   )
					break;
					case 7:
						$("#navList li").css("width","14.28%");
						$("#navList li").hover(function () {
						        $(this).css("width","25%").siblings().css("width","12.5%");
						      },function () {
     								$("#navList li").css("width","14.28%");
      						  }
						   )
					break;
					case 8:
						$("#navList li").css("width","12.5%");
						$("#navList li").hover(function () {
						        $(this).css("width","22.22%").siblings().css("width","11.11%");
						      },function () {
     								$("#navList li").css("width","12.5%");
      						  }
						   )
					break;
					default:
						 
					
				}
    			
    			
    			
    			
    		});
			
    		
    		
    	
    }
}(app));
