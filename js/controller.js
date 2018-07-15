var app = angular.module('app', ['ui.router','ngCookies'] );

app.config( function( $stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/angularjs/index.html');
    $locationProvider.html5Mode(true);

    // 定義 $state
    $stateProvider
        .state('home', {
            url: '/angularjs/index.html',
            templateUrl: '/angularjs/list.html',
            controller:(function($scope, $http) {
                $scope.users = "";
                $http.get("/angularjs/list.php")
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
            templateUrl: '/angularjs/list.html',
            controller:(function($scope,user,$http) {
                $scope.out = '登出';
                $scope.admin = user.getName();
                $scope.users = "";
                $http.get("/angularjs/list.php")
                    .success(function (resp) {$scope.users = resp;});
            })

        })
        .state('login', {
            url: '/angularjs/login',
            templateUrl: '/angularjs/login.html',
            controller:('login', function($scope, $http,$location,user) {
                $scope.login = function()
                {
                    var m_account = $scope.m_account ;
                    var m_pw = $scope.m_pw ;
                    $http({
                        url:'/angularjs/login.php',
                        method: 'POST',
                        headers:{
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data:'m_account='+m_account+'&m_pw='+m_pw
                    }).then(function (response)
                            {
                                if(response.data.status == 'loggedin'){
                                    user.saveData(response.data);
                                    $location.path('dashboard');
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
        .state('logout', {
            resolve: {
                deadResolve: function($location, user) {
                    user.clearData();
                    $location.path('login');
                }
            }
        })
        .state('up', {
            url: '/angularjs/up',
            params:{'id':null},
            templateUrl: '/angularjs/up.html',
            controller:('title', function ($scope, $stateParams,$http) {
                $scope.id = ($stateParams.id);
                $scope.main = "";
                $http.post("/angularjs/main.php",$stateParams)
                    .success(function (resp) {
                        $scope.main = resp;
                    });
                $scope.main2 = "";
                $http.post("/angularjs/main2.php",$stateParams)
                    .success(function (resp) {
                        $scope.main2 = resp;
                    });
            })
        })
        .state('detail', {
            url: '/angularjs/detail',
            params:{'id':null},
            templateUrl: '/angularjs/main.html',
            controller:('title', function ($scope, $stateParams,$http) {
                $scope.id = ($stateParams.id);
                    $scope.main = "";
                    $http.post("/angularjs/main.php",$stateParams)
                        .success(function (resp) {
                            $scope.main = resp;
                        });
                $scope.main2 = "";
                $http.post("/angularjs/main2.php",$stateParams)
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
        if(!!localStorage.getItem('login')) {
            loggedin = true;
            var data = JSON.parse(localStorage.getItem('login'));
            username = data.username;
            id = data.id;
        }
        return loggedin;
    };

    this.saveData = function (data) {
        username = data.user;
        id = data.id;
        loggedin = true;
        localStorage.setItem('login', JSON.stringify({
            username: username,
            id: id
        }));
    };

    this.clearData = function(){
        localStorage.removeItem('login');
        username = "";
        id = "";
        loggedin = false;
    }
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