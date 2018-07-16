var app = angular.module('app', ['ui.router','ngCookies'] );

app.config( function( $stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/angularjs/index.html');
    $locationProvider.html5Mode(true);

    // 定義 $state
    $stateProvider
        .state('home', {
            url: '/angularjs/index.html',
            templateUrl: '/angularjs/list.html',
            controller:(function($scope, $http,user) {
                $scope.users = "";
                $http.get("/angularjs/list.php")
                    .success(function (resp) {
                        if(user.isUserLoggedIn()) {
                            $scope.out = '登出';
                            $scope.admin = user.getName();
                            $scope.users = resp;
                        }else{
                            $scope.users = resp;
                        }

                    });
            })
        })
        .state('logged', {
            resolve: {
                check: function($location, user) {
                    if(!user.isUserLoggedIn()) {
                        $location.path('login');
                    }
                },
            },
            url: '/logged',
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
            url: '/angularjs/login.html',
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
                                    $location.path('logged');
                                }else{
                                    alert("帳號或密碼錯誤");
                                }
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
                    $location.path('home');
                }
            }
        })
        .state('up', {
            url: '/angularjs/up.html',
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
            url: '/angularjs/detail.html',
            params:{'id':null},
            templateUrl: '/angularjs/main.html',
            controller:('title', function ($scope, $stateParams,$http, user) {
                $scope.id = ($stateParams.id);
                    $scope.main = "";
                    $http.post("/angularjs/main.php",$stateParams)
                        .success(function (resp) {
                            $scope.upbtn = resp.w_id;
                            $scope.main = resp;
                            if(user.isUserLoggedIn()) {
                                $scope.out = '登出';
                                $scope.admin = user.getName();
                                $scope.users = resp;
                            }else{
                                $scope.users = resp;
                            }
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




app.controller('MyInsert', function($scope, $http, $location, user, $state){

    $scope.title = '';
    $scope.word = '';
    //$http的post传送的参数是JSON格式的，php后端获取的是JSON数据，不能用$POST_['...']
    $scope.add = function() {
        if (!user.isUserLoggedIn()) {
            alert("請先登入!");
        } else {
            $http.post('/angularjs/insert.php', {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                title: $scope.title,
                word: $scope.word
            }).then(function (response) {
                if (response.data.status == 'loggedin') {
                    user.saveData(response.data);

                    $state.reload();
                }

            })
        }
    }
});

app.controller('insert', function($scope, $http, $location, user, $stateParams){

    $scope.word = '';
    $scope.id = ($stateParams.id);
    //$http的post传送的参数是JSON格式的，php后端获取的是JSON数据，不能用$POST_['...']
    $scope.listadd = function() {
        if (!user.isUserLoggedIn()) {
            alert("請先登入!");
        } else {
            $http.post('/angularjs/listinsert.php', {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                word: $scope.word,
                id:$scope.id
            }).then(function (response) {
                if (response.data.status == 'loggedin') {
                    user.saveData(response.data);
                    $location.path('home');
                }
            })
        }
    }
});

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

app.controller('up', function($scope, $stateParams,$http,$location) {
    $scope.title = '';
    $scope.word = '';
    $scope.id = ($stateParams.id);
    $scope.update = function(){
        //location.href = 'index.html' ;
        $http.post('/angularjs/up.php',{
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            title:$scope.title,
            word:$scope.word,
            id:$scope.id
        })
        .success(function(resp){
            if(resp.success){
                $location.path('home');
            }else{
                console.log(resp);
            }
        })
    }
});

app.controller('del', function($scope, $stateParams,$http,$location){
    $scope.del = function() {
        $scope.id = ($stateParams.id);
        $http.post("/angularjs/del.php", $stateParams)
            .success(function (resp) {
                $location.path('home');
            });
    }
});

app.controller('del2', function($scope, $stateParams,$http,$location){
    $scope.del2 = function() {
        $scope.id = ($stateParams.id);
        $http.post("/angularjs/del2.php", $stateParams)
            .success(function (resp) {
                $location.path('home');
            });
    }
});

app.controller('logbtn', function ($scope, user){
    if (!user.isUserLoggedIn()) {
        $scope.in = true;
    } else {
        $scope.out = true;
        $scope.out = '登出';
    }

});

app.controller('upbtn', function ($scope, $stateParams,$http){
    $scope.id = ($stateParams.id);
    if(!!localStorage.getItem('login')) {
        $http.post("/angularjs/check.php", $stateParams)
            .then(function (response)
                {
                    if(response.data.status == 'loggedin'){
                        $scope.show = true;
                    }else{
                        $scope.show = false;
                    }
                }
                ,function error(response)
                {
                    $scope.show = false;
                }) ;
    }else{
        $scope.show = false;
    }
})

app.controller('upbtn2', function ($scope, $stateParams,$http){
    $scope.myVar = true;
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    }
    $scope.id = ($stateParams.id);
    if(!!localStorage.getItem('login')) {
        $http.post("/angularjs/check2.php", $stateParams)
            .then(function (response)
                {
                    if(response.data.status == 'loggedin'){
                        $scope.show2 = true;
                    }else{
                        $scope.show2 = false;
                    }
                }
                ,function error(response)
                {
                    $scope.show2 = false;
                }) ;
    }else{
        $scope.show2 = false;
    }
})

app.controller('upbtn3', function($scope,$http,$location) {
    $scope.myVar = true;
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    }
    $scope.upword = function(){
        $http.post('/angularjs/up2.php',{
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            word:$scope.x.w2_word,
            id:$scope.x.w2_seq
        })
            .success(function(resp){
                if(resp.success){
                    $location.path('home');
                }else{
                    console.log(resp);
                }
            })
    }
});