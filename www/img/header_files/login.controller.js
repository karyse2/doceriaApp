(function () {
    'use strict';

    angular
        .module('devionnAdmin')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($rootScope, $scope, $http, $location, $localStorage, Sessao) {
        var vm = this;
        activate();

        function activate() {
            vm.logar = logar;
        }

        function logar(usuario) {
            Sessao.login(usuario)
                .success(function (result) {
                    if (result.type == false) {
                        alert(result);
                    } else {
                        $localStorage.token = result.token;
                        $location.path('/medico');
                    }
                })
                .error(function (error, status) {
                    console.log(error);
                    $rootScope.error = 'Falha ao tentar acessar';
                });
        }

        vm.login2 = function() {
            $location.path('/login2');
        }
    }
})();
