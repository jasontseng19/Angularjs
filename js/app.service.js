/*var app = angular.module('app', ['ui.router']);
(function(){
    app.factory("stateService", function(){
        var state = "none state";
        return {
            setState : function(newState){
                state = newState;
            },
            getState : function(){
                return state;
            }
        };
    });

    app.factory("heroService", function($scope, $http){
        $scope.users = "";
        $http.get("list.php")
            .success(function (resp) {
                var heroList = resp;
            });


    
        return {
            getHeroList : function(){
               return heroList;
            },
            getHeroById : function(id){
                var hero;
                var i;
                for (i = 0 ; i < heroList.length; i++){
                    console.log(typeof id);
                    console.log(typeof heroList[i].id);
                    console.log(id === heroList[i].id);
                    if (id === heroList[i].id){
                        hero = heroList[i];
                        break;
                    }
                }                
                return hero;
            }
        };
    });
})();*/