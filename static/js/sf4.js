var app = angular.module("app", ["ngRoute"])
    .factory("jsonService", function(){
        var gameJson = {};
        var charListJson = {};

        return gameJson, charListJson
    })
    .run(function($rootScope){
        $rootScope.isGameSelected = false;
        $rootScope.selectedGame = null;
        $rootScope.isCharacterSelected = false;
        $rootScope.selectedCharacter = null;
    })

app.config(function($routeProvider){
    $routeProvider
    .when('/', {
            templateUrl: "/static/snippets/gameslist.html",
            controller: "MainCtrl"
        })
    .when("/:gameId", {
        templateUrl: "/static/snippets/characterlist.html",
        controller: "GameCtrl"
    })
    .when("/:gameId/:characterId/", {
        templateUrl: "/static/snippets/characterlist.html",
        controller: "GameCtrl"
    })
});

app.controller("MainCtrl", function($scope, $http, $rootScope, jsonService){
    console.log("test");
    $rootScope.isGameSelected = false;
    $rootScope.selectedGame = null;
    $rootScope.isCharacterSelected = false;
    $rootScope.selectedCharacter = null;
    $http.get("/static/json/games.json")
        .then(function(res){
            console.log("doing stuff");
            $scope.games = res.data;
            jsonService.gameJson = $scope.games;
            console.log($scope.games);
        });

    $scope.selectGame = function(game){
        console.log(game);
        $rootScope.isGameSelected = true;
        $rootScope.selectedGame = game;
    };
});

app.controller("GameCtrl", function($scope, $routeParams, $http, $location, $rootScope, jsonService){
    $scope.$location = $location;
    console.log($location.path());
    $scope.gameTitle = $routeParams.gameId;
    $scope.selectedChar = null;
    $scope.details = "";
    $scope.tab = null;
    if($routeParams.characterId){
        $scope.selectedChar = $routeParams.characterId;
    }
    $http.get("/static/json/" + $scope.gameTitle + ".json")
        .then(function(res){
            $scope.characters = res.data;
            jsonService.charListJson = $scope.characters;
        })
    if($scope.selectedChar){
        console.log("character selected");
        $http.get("/static/json/" + $scope.selectedChar + ".json")
            .then(function(cdata){
                $scope.characterInfo = cdata.data;
                console.log($scope.characterInfo)
                $scope.tab = 1;
                console.log($scope.characterInfo["game"]);
                $rootScope.isGameSelected = true;
                $rootScope.selectedGame = $scope.characterInfo.game;
                $rootScope.isCharacterSelected = true;
                $rootScope.selectedCharacter = $scope.characterInfo["name"];

            });
        $http.get("/static/json/" + $scope.selectedChar + "-combo.json")
            .then(function(combodata){
                $scope.comboList = combodata.data;
                console.log($scope.comboList);
                var splitCombo = $scope.comboList.combos["combo1"].split(":");
                console.log(splitCombo);
            })
    }

    $scope.setTab = function(setTab){
        $scope.tab = setTab;
    }

    $scope.isTabSet = function(checkTab){
        return checkTab === $scope.tab
    }

})

app.controller("DetailsCtrl", function($scope, $routeParams, jsonService){
    console.log(jsonService.gameJson);
    console.log(jsonService.charListJson);
    $scope.characterId = $routeParams.characterId;
    $scope.charDetails = jsonService.charListJson[$scope.characterId]["details"];

})
