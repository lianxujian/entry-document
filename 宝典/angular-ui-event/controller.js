/**
 * Created by Administrator on 2017/2/21.
 */
angular.module('mapp')
    .controller('homeCtrl',function($rootScope,$scope,$state){
        $rootScope.title=$state.current.title;
        console.log($state.current.data)    //从当前路由拿值
        $scope.golist=function(){
            $state.go('list',{  //(transitionTo)将值传到list页面,路由上必须写?id名
                id:333,
                name:'lianxujian'
            })
        }
        //console.log($state.get('list')) //获取路由的对象里的内容
       /* $rootScope.$on("$stateChangeStart",function(event,next,nextParam,prev){
            console.log(event)
            console.log(next)
            console.log(nextParam)
            console.log(prev)
        })*/

    })
    .controller('listCtrl',function($rootScope,$stateParams,$state){
        $rootScope.title=$state.current.title;
        console.log($stateParams)
        //console.log($state.current.param)
        $rootScope.$on("$stateChangeSuccess",function(event,next,nextParam,prev){
            console.log(event)
            console.log(next)
            console.log(nextParam)
            console.log(prev)
        })
    })
    .controller('detailCtrl',function($rootScope){
        $rootScope.title=$state.current.title;
    })