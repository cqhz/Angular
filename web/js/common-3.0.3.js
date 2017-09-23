(function (angular) {
    'use strict';

    var app = angular.module('app', ['ui.router', 'oc.lazyLoad','popup']);

    // 注册storm服务
    app.service('storm', function ($timeout, $rootScope) {

        // userAgent
        var ua = angular.lowercase(navigator.userAgent);

        // 打印日志
        var log = function (str, type) {
            console[type || 'log'](str);
        };

        // 错误输出
        var error = function (str) {
            log(str, 'error');
        };

        var win = window;

        var doc = document;
        
        var _this = this;

        this.error = error;

        this.log = log;

        // URI转码
        this.encode = function (str) {
            return encodeURIComponent(str);
        };

        // 中文URI转码
        this.cnencode = function (str) {
            return str.replace(/[\u4E00-\u9FA5]/g, function (rep) {
                return _this.encodeURIComponent(rep);
            });
        };

        // URI解码
        this.decode = function (str) {
            return decodeURIComponent(str);
        };

        // 判断是否为微信
        this.isWeixin = function () {   
            return /micromessenger/.test(ua);
        };

        // 判断是否为游戏猫
        this.isGamecat = function () {
            return /gamecat/.test(ua);
        };

        // 判断是否为IOS设备
        this.isIOS = function () {
            return /mac os x/.test(ua);
        };

        // 判断是否为iphone
        this.isIphone = function () {
            return /iphone/.test(ua);
        };

        // 判断是否为ipad
        this.isIpad = function () {
            return /ipad/.test(ua);
        };

        // 判断是否为android设备
        this.isAndroid = function () {
            return /android/.test(ua);
        };

        this.isMobile = function () {
            return /mobile/.test(ua);
        };

        // 上拉加载
        this.pullLoad = function (a,callback) {
        	
            a.onscroll = function () {
                if (a.scrollTop + a.clientHeight >= a.scrollHeight) {
                    callback && callback();
                }
            };
        };

//	this.windowpullLoad = function (callback) {
//          win.onscroll = function () {
//              if (scrollY + innerHeight >= doc.body.scrollHeight - 30) {
//                  callback && callback();
//              }
//          };
//      };
        // json数据序列化
        this.param = function (obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += this.param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += this.param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };
    });

    // 依赖注入
    app
        .factory('httpRequestInterceptor', ['storm','popup',httpRequestInterceptor])
        .config(interceptors);

    function httpRequestInterceptor(storm,popup){
        return {
            request : function (config) {
            	
//          	popup.loading();
                if ( config.method !== 'GET' ) {
                    config.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
                }

                config.data = angular.isObject(config.data) && String(config.data) !== '[object File]' ? storm.param(config.data) : config.data;
                return config;
            },
            responseError: function (response) {
                console.log(response.status + ': ' + response.statusText);
                return {};
            }
        };
    }

    // 拦截器
    interceptors.$inject = ['$httpProvider'];
    function interceptors($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
    }

    window.app = app;
	
	
	
    
}(angular));
