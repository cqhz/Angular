/**
 * 应用路由, 所有页面都会加载该页!
 * @description: 单页面应用路由
 * @author: Storm
 * @date: 2016-07-19
 */
(function () {
    'use strict';
    angular
        .module('app')
        .config(routeConfig)
        .run(routeChangeEvent);

    // 路由配置
    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function routeConfig ($stateProvider, $urlRouterProvider) {
    	
    	
        $urlRouterProvider.otherwise("/sidebar");

        // root
        $stateProvider.state('root',{
            url: '/',
            title: '首页',
            views: {
                'layout': {
                    templateUrl: 'main.html'
                },
                'header@root': {
                    templateUrl: 'header.html'
                },
                'footer@root': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'js/header-controller.js',
                        'js/footer-controller.js'
                    ]);
                }]
            }
        })
          
        .state('root.sidebar', {
            url: 'sidebar',
            title: '管理首页',
            views: {
                'main@root': {
                    templateUrl: 'sidebar.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'js/sidebar-controller.js'
                    ]);
                }]
            }
        })

        // one
        .state('root.activationData', {
            url: 'activationData',
            title: '激活数据',
            views: {
                'main@root': {
                    templateUrl: 'view/activationData/activationData.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'view/activationData/activationData.css',
                        'view/activationData/activationData-controller.js'
                    ]);
                }]
            }
        })

        // two
        .state('root.registrationData', {
            url: 'registrationData',
            title: '注册数据',
            views: {
                'main@root': {
                    templateUrl: 'view/registrationData/registrationData.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'view/registrationData/registrationData.css',
                        'view/registrationData/registrationData-controller.js'
                    ]);
                }]
            }
        })
        // three
        .state('root.gameManagement', {
            url: 'gameManagement',
            title: '游戏管理',
            views: {
                'main@root': {
                    templateUrl: 'view/gameManagement/gameManagement.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'view/gameManagement/gameManagement.css',
                        'view/gameManagement/gameManagement-controller.js'
                    ]);
                }]
            }
        })
        // addthree
        .state('root.addgameManagement', {
            url: 'addgameManagement',
            title: '新增游戏',
            views: {
                'main@root': {
                    templateUrl: 'view/gameManagement/addgameManagement.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'view/gameManagement/gameManagement.css',
                        'view/gameManagement/addgameManagement-controller.js',
                        'view/gameManagement/webuploader.html5only.min.js'
                    ]);
                }]
            }
        })
        // four
        .state('root.gameData', {
            url: 'gameData',
            title: '游戏数据',
            views: {
                'main@root': {
                    templateUrl: 'view/gameData/gameData.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'view/gameData/gameData.css',
                        'view/gameData/gameData-controller.js'
                    ]);
                }]
            }
        })
         // five
         
        .state('root.pushManagement', {
            url: 'pushManagement',
            title: '推送管理',
            views: {
                'main@root': {
                    templateUrl: 'view/pushManagement/pushManagement.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'view/pushManagement/pushManagement.css',
                        'view/pushManagement/pushManagement-controller.js'
                    ]);
                }]
            }
        })
         
        // six
        .state('root.userData', {
            url: 'userData',
            title: '用户数据',
            views: {
                'main@root': {
                    templateUrl: 'view/userData/userData.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'view/userData/userData.css',
                        'view/userData/userData-controller.js'
                    ]);
                }]
            }
        })
         // 个人游戏收益
        .state('root.gameIncomeP', {
            url: 'gameIncomeP',
            title: '游戏收益',
            views: {
                'main@root': {
                    templateUrl: 'view/gameIncomeP/gameIncomeP.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'view/gameIncomeP/gameIncomeP.css',
                        'view/gameIncomeP/gameIncomeP-controller.js'
                    ]);
                }]
            }
        })
         // 企业游戏收益
        .state('root.gameIncomeE', {
            url: 'gameIncomeE',
            title: '游戏收益',
            views: {
                'main@root': {
                    templateUrl: 'view/gameIncomeE/gameIncomeE.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'view/gameIncomeE/gameIncomeE.css',
                        'view/gameIncomeE/gameIncomeE-controller.js'
                    ]);
                }]
            }
        })
         // eight
        .state('root.channelInformation', {
            url: 'channelInformation',
            title: '渠道资料',
            views: {
                'main@root': {
                    templateUrl: 'view/channelInformation/channelInformation.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'view/channelInformation/channelInformation.css',
                        'view/channelInformation/channelInformation-controller.js'
                    ]);
                }]
            }
        })
        //个人结算平台页
		.state('root.setPlatformpageP', {
            url: 'setPlatformpageP',
            title: '渠道资料',
            views: {
                'main@root': {
                    templateUrl: 'view/setPlatformpageP/setPlatformpageP.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'view/setPlatformpageP/setPlatformpageP.css',
                        'view/setPlatformpageP/setPlatformpageP-controller.js'
                    ]);
                }]
            }
        })
        //企业结算平台页
		.state('root.setPlatformpageE', {
            url: 'setPlatformpageE',
            title: '渠道资料',
            views: {
                'main@root': {
                    templateUrl: 'view/setPlatformpageE/setPlatformpageE.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'view/setPlatformpageE/setPlatformpageE.css',
                        'view/setPlatformpageE/setPlatformpageE-controller.js'
                    ]);
                }]
            }
        })
		//公告详情页
		.state('root.announcePage', {
            url: 'announcePage',
            title: '公告详情',
            views: {
                'main@root': {
                    templateUrl: 'view/announcePage/announcePage.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'view/announcePage/announcePage.css',
                        'view/announcePage/announcePage-controller.js'
                    ]);
                }]
            }
        })
         //验证码
        .state('root.validateCode', {
            url: 'validateCode',
            title: '游戏数据',
            views: {
                'main@root': {
                    templateUrl: 'validateCode/validateCode.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'validateCode/validateCode.css',
                        'validateCode/validateCode.js'
                    ]);
                }]
            }
        })
        
        //渠道资料完善
        .state('root.perfectInformation', {
            url: 'perfectInformation',
            title: '渠道资料完善',
            views: {
                'main@root': {
                    templateUrl: 'view/perfectInformation/perfectInformation.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'view/perfectInformation/perfectInformation-controller.js'
                    ]);
                }]
            }
        })
        //账号冻结路由
         .state('root.accountFreezeTS', {
            url: 'accountFreezeTS',
            title: '账号已冻结',
            views: {
                'main@root': {
                    templateUrl: 'view/tipsPage/accountFreezeTS.html'
                }
            }
        })
         //资料正在审核中
         .state('root.beingAuditedTS', {
            url: 'beingAuditedTS',
            title: '资料审核中',
            views: {
                'main@root': {
                    templateUrl: 'view/tipsPage/beingAuditedTS.html'
                }
            }
        })
        //手机未绑定
         .state('root.boundPhoneTS', {
            url: 'boundPhoneTS',
            title: '手机号未绑定',
            views: {
                'main@root': {
                    templateUrl: 'view/tipsPage/boundPhoneTS.html'
                }
            }
        })
         
         // 没有权限
        .state('root.tipsPage', {
            url: '404',
            title: '权限未开启',
            views: {
                'main@root': {
                    templateUrl: 'view/tipsPage/404.html'
                }
            }
        })
         // 审核未通过
         .state('root.nopassed', {
            url: 'nopassed',
            title: '审核未通过',
            views: {
                'main@root': {
                    templateUrl: 'view/tipsPage/nopassed.html'
                }
            }
        })
        
        
    }

    // 路由更改事件
    routeChangeEvent.$inject = ['$rootScope'];
    function routeChangeEvent ($rootScope) {
        $rootScope.$on('$stateChangeStart', stateChangeStart);

        function stateChangeStart (event, toState) {

            // 设置页面标题
            $rootScope.title = toState.title;
            
        }
    }


}());
