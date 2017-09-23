/**
 * 弹出框服务
 * @description: 弹出框服务
 * @author: Storm
 * @createTime: 2016年9月12日
 */
(function (angular) {
    'use strict';

    // 注册弹出框服务
    angular
        .module('popup', [])
        .constant('popupOpts', {
            backdropClose: false, // 是否点击背景关闭
            hasBackdrop: false, // 是否有背景
            fullScreen: false, // 是否全屏
            hasBody: true, // 是否拥有body
            hasHeader: false, // 是否有头部
            hasFooter: false, // 是否有尾部

            hasConfirm: false, // 是否有确定按钮
            confirmText: '确定', // 确定按钮文本
            confirm: null, // 确定按钮回调

            hasCancel: false, // 是否有取消按钮
            cancelText: '取消', // 取消按钮文本,
            cancel: null, // 取消按钮回调

            duration: null, // 定时器 number|null
            then: null, // 取消弹出框回调, 不管确定还是取消

            size: 'sm' // 弹出框宽度 xs, sm, md, lg, auto(自动根据内容拓展宽度)
        })
        .service('popup', ['$rootScope', '$timeout', 'popupOpts', function ($rootScope, $timeout, popupOpts) {

            $rootScope.popupList = {};

            /**
             * 弹出框初始化
             * @param data 固定参数
             * @param obj 用户自定义参数
             */
            this.init = function (data, obj) {

                var popupName = 'popup' + new Date().getTime();

                data = angular.extend({}, popupOpts, data, obj);

                /**
                 * 取消弹出框方法
                 */
                data.closeFn = function () {
                    delete $rootScope.popupList[popupName];
                    data.then && data.then();
                };

                /**
                 * 点击背景取消弹出框
                 */
                data.backdropFn = function () {
                    if (data.backdropClose) {
                        data.closeFn();
                    }
                };

                /**
                 * 确定按钮回调
                 */
                data.confirmCallback = function () {
                    data.confirm && data.confirm();
                    data.closeFn();
                };

                /**
                 * 取消按钮回调
                 */
                data.cancelCallback = function () {
                    data.cancel && data.cancel();
                    data.closeFn();
                };

                /**
                 * 定时取消弹出框
                 */
                if (data.duration) {
                    $timeout(function () {
                        delete  $rootScope.popupList[popupName];
                    }, data.duration);
                }

                $rootScope.popupList[popupName] = data;

                return popupName;
            };

            /**
             * 清除所有的弹出框
             * @param name 弹出框名称
             */
            this.clear = function (name) {
                if (name) {
                    delete $rootScope.popupList[name];
                } else {
                    $rootScope.popupList = {};
                }
            };

            /**
             * 确定弹出框
             * @param obj 参数
             * @returns {*} 返回弹出框名称
             */
            this.confirm = function (obj) {
                return this.init({
                    type: 'confirm',
                    hasFooter: true,
                    hasConfirm: true,
                    hasCancel: true,
                    hasBackdrop: true,
                    fullScreen: true,
                    backdropClose: true
                }, obj);
            };

            /**
             * 警告弹出框
             * @param obj 数据
             * @returns {*} 返回弹出框名称
             */
            this.alert = function (obj)  {
                return this.init({
                    type: 'alert',
                    hasFooter: true,
                    hasConfirm: true,
                    hasBackdrop: true,
                    fullScreen: true
                }, obj);
            };

            /**
             * 提示弹出框
             * @param obj 参数
             * @returns {*} 返回名称
             */
            this.hint = function (obj) {
                return this.init({
                    size: 'auto',
                    type: 'hint',
                    duration: 2000
                }, obj);
            };

            /**
             * loading
             * @param obj 参数
             * @returns {*} 返回弹出框名称
             */
            this.loading = function (obj) {
                obj = angular.isUndefined(obj) ? obj = {} : obj;
                obj.body = angular.isUndefined(obj.body) ? '正在加载中...' : obj.body;
                return this.init({
                    size: 'xs',
                    backdrop: true,
                    fullScreen: true,
                    type: 'loading'
                }, obj);
            }
        }])
        .directive('popupContainer', function () {
            return {
                templateUrl: 'popup/popup-ng.html',
                restrict: 'AE',
                transclude: true,
                controller: function () {},
                link: function (scope) {

                    // 监听popupList并及时更新视图
                    scope.$parent.$watch('popupList', function (opts) {
                        scope.popups = opts;
                    });
                }
            };
        });
}(angular));