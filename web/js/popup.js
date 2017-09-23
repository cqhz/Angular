/**
 * popup
 * @description: popup
 * @author: Storm
 * @createTime: 2016年9月18日
 */

(function (angular) {
    'use strict';

    angular
        .module('app.highcharts', ['popup'])
        .controller('popupCtrl', ['$rootScope', 'popup', '$timeout', function ($rootScope, popup, $timeout) {
            var vm = this;

            vm.loading = function () {
                var name = popup.loading();
                console.log(name);

                $timeout(function () {
                    popup.clear(name);
                }, 3000);
            };

            vm.hint = function () {
                popup.hint({
                    body: '服务器错, 误请重试!'
                });
            };

            vm.alert = function () {
                popup.alert({
                    body: '订单错误, 请重试!',
                    confirm: function () {
                        alert('你点击了确定按钮');
                    }
                });
            };

            vm.confirm = function () {
                popup.confirm({
                    body: '你确定要花200喵点购买棒棒糖一支嘛?',
                    then: function () {
                        alert('你点击了确定或者取消按钮');
                    },
                    confirm: function () {
                        alert('你点击了确定按钮');
                    },
                    cancel: function () {
                        alert('你点击了取消按钮');
                    }
                });
            };

            // 隐藏loading
            $rootScope.loading = true;
        }]);
}(angular));