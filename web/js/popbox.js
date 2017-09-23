/**
 * Created by zzjz-pc15 on 2016/8/10.
 */


/**
 * 页面配置参数
 * @return {[type]} [description]
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('headerCtrl', headerCtrl);

    // 根控制器
    function headerCtrl ($scope) {
    	
    	
    	
    }
}());
zzjzWebApp.directive("popBox",["$document","$window",function($document,$window){
    function linkCtrl(){
        return function (scope,element){
            panel_z_index++;
            var backGround = angular.element(element[0].querySelector(".popbox_background"));
            var contentMenu = angular.element(element[0].querySelector(".popbox_container"));
            var contentFrame = angular.element(element[0].querySelector(".poxbox_content"));
            backGround.css({"z-index":panel_z_index});
            contentMenu.css({"z-index":panel_z_index+1});
            var disX = 0;
            var disY = 0;
            backGround.bind("mousedown",function(){
                contentMenu.removeClass("poxbox_shadow");
            });
            backGround.bind("mouseup",function(){
                contentMenu.addClass("poxbox_shadow");
            });
            contentMenu.bind('mousedown', function (event) {
                event.preventDefault();
                disX = event.clientX - contentMenu.prop('offsetLeft');
                disY = event.clientY - contentMenu.prop('offsetTop');
                $document.bind('mousemove', mouseMove);
                $document.bind('mouseup', mouseUp);
            });
            function  initStyle(){
                var contentBody = angular.element(contentFrame.children()[0]);
                contentBody.css({top:"35px","border-top":"none"});
                var cWidth = contentBody.prop("offsetWidth");
                var cHeight = contentBody.prop("offsetHeight");
                var wLeft = ($document[0].body.clientWidth - cWidth)/2;
                var wTop = ($document[0].body.clientHeight-(cHeight+100))/2;
                contentMenu.css({
                    position:"absolute",
                    left:wLeft+"px",
                    top:wTop+"px"
                });
            }
            initStyle();
            angular.element($window).bind("resize",function(){
                setTimeout(function(){
                    initStyle();
                },200)
            });
            function mouseMove(event) {
                var l = event.clientX - disX;
                var t = event.clientY - disY;
                var bHeight = $document[0].body.clientHeight;
                if(l <= 0){
                    l = 0;
                }else if( l > $document[0].body.clientWidth - contentMenu.prop('offsetWidth')){
                    l = $document[0].body.clientWidth - contentMenu.prop('offsetWidth');
                }
                if(t <= 0){
                    t = 0;
                }
                else if(t > bHeight - contentMenu.prop('offsetHeight')){
                    t = bHeight - contentMenu.prop('offsetHeight');
                }
                contentMenu.css({
                    top: t + 'px',
                    left: l + 'px'
                });
            }
            function mouseUp() {
                $document.unbind('mousemove', mouseMove);
                $document.unbind('mouseup', mouseUp);
            }
            scope.destroyPop = function(){
                scope.closeWindow();
                scope.$destroy();
                element.remove();
            }
        }
    }
    var templateDivs = "<div id='popbox_directive_2016' class='popbox_box' >";
    templateDivs += "<div class='popbox_background'></div>";
    templateDivs += "<div class='popbox_container poxbox_shadow'  >";
    templateDivs += "<div class='popbox_nav'><span class='pox_nav_name'>你好</span><span class='popbox_nav_span glyphicon glyphicon-remove' ng-click='destroyPop()'></span></div>";
    templateDivs += "<div class='poxbox_content' ng-transclude>";
    templateDivs += "</div></div></div>";
    return{
        restrict:"EA",
        template:templateDivs,
        transclude:true,
        scope:{
            popName:"=",
            closeWindow:"&"
        },
        link:linkCtrl()
    }
}]);
