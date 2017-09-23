/**
 * 模块配置
 * @description: 所有页面都会加载该模块配置文件
 * @author: Storm
 * @createTime: 2016年9月18日
 */

(function (angular) {
    'use strict';

    angular
        .module('datePicker', [])
        .constant('datePickerOpts', {
            readonly: false,
            type: 'click',
            lang: 'zh-cn',
            skin: 'twoer',
            minDate:"1900-01-01 00:00:00",
            maxDate:"2099-12-31 23:59:59",
            dateFmt:"yyyy-MM-dd"
        })
        .directive('datePicker', ['datePickerOpts', function (datePickerOpts) {
            return {
                restrict: 'A',
                require: '?ngModel',
                scope: {
                    opts: '=', // 配置选项
                    dp: '=', // 详细参数
                    picking: '&',
                    picked: '&',
                    clearing: '&',
                    cleared: '&',
                    changing: '&',
                    changed: '&'
                },
                link: function (scope, elem, attr, ngModel) {
                    var opts = angular.extend({}, datePickerOpts, scope.opts);

                    ngModel && elem.val(ngModel.$viewValue);

                    datePickerOpts.readonly && attr.$set('readonly', true);

                    function onpicking (dp) {
                        attr.dp && (scope.dp = dp);
                        ngModel && scope.$apply(function () {
                            ngModel.$setViewValue(dp.cal.getNewDateStr());
                        });
                        scope.picking();
                    }

                    function init ($this) {
                        $this && (opts.el = $this);
                        WdatePicker(angular.extend({
                            onpicking: onpicking,
                            onpicked: scope.picked,
                            onclearing: scope.clearing,
                            oncleared: scope.cleared,
                            onchanging: scope.changing,
                            onchanged: scope.changed
                        }, opts));
                    }

                    if (attr.datePicker === '') {
                        elem.on(opts.type, function () {
                            init(this);
                        });
                    } else if (attr.datePicker === 'this') {
                        opts.eCont = attr.id;
                        init();
                    } else if (typeof attr.datePicker === 'string') {
                        elem.on(opts.type, function () {
                            init(attr.datePicker);
                        });
                    }
                }
            }
        }])
}(angular));