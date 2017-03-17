angular.module("doceriaApp").controller('paginaInicialCtrl', function ($scope, $stateParams, $timeout) {
    $scope.paginaInicial = function() {
        $state.go("/app.paginaInicial");
    }

})
