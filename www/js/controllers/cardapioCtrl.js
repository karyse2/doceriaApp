angular.module("doceriaApp").controller('cardapioCtrl', function ($scope, $stateParams, $timeout, $state,$ionicPopup, $timeout ) {

 // A confirm dialog
 $scope.finalizarCompra = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Confirmar pedido!',
     template: ' Muito bem! O total da sua compra é de R$ 10,50! Deseja confirmar seu pedido?'
   });
   confirmPopup.then(function(res) {
     if(res) {
        console.log('pedido ok');
        $state.go('app.finalizarCompra');
     } else {
       console.log('Pedido Cancelado');
     }
   });
 };
})
