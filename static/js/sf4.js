var app = angular.module("app", []);

app.controller("GameCtrl", function($http){
    var t = this;
    $http.get("/static/json/games.json")
        .then(function(res){
            t.games = res.data;
        });


    this.selectGame = function(game){
        console.log(game)
    };
});
