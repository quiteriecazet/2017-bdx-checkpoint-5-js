/*
Create Angular config in app.config module
*/
export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
        'use strict'
        // Define prefix
        $locationProvider.hashPrefix('!');
        // For each url not found redirection to '/'
        $urlRouterProvider.otherwise('/posts/');
        /*
          Define a state with name 'app' this state is abstract and url is empty (root of application)
          template is ui-view it's used to display nested views
        */
        $stateProvider.state('app', {
                url: '',
                abstract: true,
                template: '<navbar /><div class="container"><ui-view></ui-view></div>'
            })
            .state('callback', {
                url: '/auth/callback/:token',
                template: '',
                controller: ['UsersService', '$stateParams', '$state', function (UsersService, $stateParams, $state) {
                    if ($stateParams.token) {
                        UsersService.setToken($stateParams.token).then((user) => {
                            let toastContent = `Welcome ${user.name} !`
                            Materialize.toast(toastContent, 4000, 'toast-success')
                            $state.go('blog.list')
                        })
                    } else {
                        $state.go('blog.list')
                    }
                }]
            });
        $stateProvider.state('algo1', {
            url: '/algo1',
            controller: ['UsersService', '$stateParams', '$state', '$scope', function (UsersService, $stateParams, $state, $scope) {
                    $scope.people = ["Jean", "Sébastien", "Nina", "Léa", "Auguste", "Bernard", "Paul"]
                    $scope.myFriends = [];
                    $scope.getFriends = function() {
                        for (let i = 0; i < $scope.people.length; i++) {
                                if ($scope.people[i].length == 4) {
                                   $scope.myFriends.push($scope.people[i]);      
                            }
                        }
                        console.log($scope.myFriends)
                    }
                    /* Codewars était down quand j'ai fait l'algo, je n'ai donc pas pu tester sur le site et ai fait ma propre petite liste de noms par la même occasion*/
                }],
            template: '<navbar /><div class="container"><ul><li ng-repeat="people in people">{{people}}</li></ul><button ng-click="getFriends(); answer = true">Who are my friends?</button><ul ng-if="answer == true"><li ng-repeat="myFriends in myFriends">{{myFriends}}</li></ul><ui-view></ui-view></div>'
        })
    }]