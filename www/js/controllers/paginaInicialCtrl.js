angular.module("doceriaApp").controller('paginaInicialCtrl', function ($scope, $stateParams, $timeout,$state) {
    $scope.abrirCardapio = function () {
        $state.go("app.cardapio");
        console.log('acessou');
    }

})
