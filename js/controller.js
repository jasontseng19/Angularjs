var app = angular.module('app', ['ui.router','ngCookies'] );

app.config( function( $stateProvider, $urlRouterProvider ,$locationProvider) {

    $urlRouterProvider.otherwise('/');

    // 定義 $state
    $stateProvider
        .state('home', {
            url: '',
            templateUrl: 'list.html',
            controller:(function($scope, $http) {
                $scope.users = "";
                $http.get("list.php")
                    .success(function (resp) {$scope.users = resp;});
            })
        })
        .state('dashboard', {
            resolve: {
                check: function($location, user) {
                    if(!user.isUserLoggedIn()) {
                        $location.path('login');
                    }
                },
            },
            url: '/dashboard',
            params: {'user': null},
            templateUrl: 'dashboard.html',
            controller:(function($scope,user,$http) {
                $scope.admin = user.getName();
                $scope.users = "";
                $http.get("list.php")
                    .success(function (resp) {$scope.users = resp;});
            })

        })
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller:('login', function($scope, $http,$state,user) {
                $scope.login = function()
                {
                    var m_account = $scope.m_account ;
                    var m_pw = $scope.m_pw ;
                    $http({
                        url:'./login.php',
                        method: 'POST',
                        headers:{
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data:'m_account='+m_account+'&m_pw='+m_pw
                    }).then(function (response)
                            {
                                if(response.data.status == 'loggedin'){
                                    user.userLoggedIn();
                                    user.setName(response.data.user);
                                    $state.go('dashboard');
                                }else{
                                    alert("帳號或密碼錯誤");
                                }
                                //location.href = 'index.html' ;
                            }
                            ,function error(response)
                            {
                                alert("帳號或密碼錯誤！") ;
                            }) ;
                }
            })
        })
        .state('up', {
            url: '',
            params:{'id':null},
            templateUrl: 'up.html',
            controller:('title', function ($scope, $stateParams,$http) {
                $scope.id = ($stateParams.id);
                $scope.main = "";
                $http.post("main.php",$stateParams)
                    .success(function (resp) {
                        $scope.main = resp;
                    });
                $scope.main2 = "";
                $http.post("main2.php",$stateParams)
                    .success(function (resp) {
                        $scope.main2 = resp;
                    });
            })
        })
        .state('detail', {
            url: '',
            params:{'id':null},
            templateUrl: 'main.html',
            controller:('title', function ($scope, $stateParams,$http) {
                $scope.id = ($stateParams.id);
                    $scope.main = "";
                    $http.post("main.php",$stateParams)
                        .success(function (resp) {
                            $scope.main = resp;
                        });
                $scope.main2 = "";
                $http.post("main2.php",$stateParams)
                    .success(function (resp) {
                        $scope.main2 = resp;
                    });
            })
        });

});


app.service('user',function () {
    var username;
    var loggedin = false;
    var id;
    this.setName = function(name) {
        username = name;
    };
    this.getName = function() {
        return username;
    };
    this.setID = function(userID) {
        id = userID;
    };
    this.getID = function() {
        return id;
    };
    this.isUserLoggedIn = function() {
        return loggedin;
    };
    this.userLoggedIn = function() {
        loggedin = true;
    };
})




app.controller('MyInsert', function($scope, $http){

    $scope.title = '';
    $scope.word = '';
    //$http的post传送的参数是JSON格式的，php后端获取的是JSON数据，不能用$POST_['...']
    $scope.add = function(){
        $http.post('insert.php', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            title:$scope.title,
            word:$scope.word
        })
        .success(function(resp){
            if(resp.success){
                location.href = 'index.html' ;
            }else{
                console.log(resp);
            }
        })
    }
})
/*
app.controller('Myctrl', function($scope, $http) {
    $scope.op = '';
    $scope.main = function(){
        $http.post('main.php', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            op:$scope.op
        })
            .success(function(resp){
                if(resp.success){
                    //location.href = 'main.html' ;
                    $scope.users = resp;
                }else{
                    console.log(resp);
                }
            })
    }
});
*/

app.controller('up', function($scope, $stateParams,$http) {
    $scope.title = '';
    $scope.word = '';
    $scope.id = ($stateParams.id);
    $scope.update = function(){
        //location.href = 'index.html' ;
        $http.post('up.php',{
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            title:$scope.title,
            word:$scope.word,
            id:$scope.id
        })
        .success(function(resp){
            if(resp.success){
                location.href = 'index.html' ;
            }else{
                console.log(resp);
            }
        })
    }
});

app.controller('del', function($scope, $stateParams,$http){
    $scope.del = function() {
        $scope.id = ($stateParams.id);
        $http.post("del.php", $stateParams)
            .success(function (resp) {
                location.href = 'index.html';
            });
    }
});
/*
app.controller('demo', function ($cookies, $scope) {
    $cookies.myFavorite = 'Cookies 測試';
    $scope.person = $cookies.myFavorite;
})
*/
$locationProvider.html5Mode(true);