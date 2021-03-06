/**
 * Created by Administrator on 2017/2/21.
 */
angular.module('mapp')
    .config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('home');
        $stateProvider
            .state('home',{
                url:'/home',
                templateUrl:'pages/home.html',
                controller:'homeCtrl',
                data:[1,2,3],
                param:{
                    id:111
                },
                title:'首页'
            })
            .state('list',{
                url:'/list?id&name',
                templateUrl:'pages/list.html',
                controller:'listCtrl',
                param:{
                    id:222
                },
                title:'列表页'
            })
            .state('detail',{
                url:'/detail',
                templateUrl:'pages/detail.html',
                controller:'detailCtrl',
                data:[2,2,2],
                title:'详情页'
            })
    })