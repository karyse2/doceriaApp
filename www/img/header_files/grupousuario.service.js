(function() {
    'use strict';

    angular
        .module('devionnAdmin')
        .service('GrupoUsuarioService', GrupoUsuarioService);

    /** @ngInject */
    function GrupoUsuarioService($http, $localStorage) {
        var baseUrl = 'http://localhost:8081';

        var _getTodos = function() {
            return $http.get(baseUrl + '/ws/grupousuario/getTodos');
        }

        var _salvar = function(grupousuario) {
            return $http.post(baseUrl + '/ws/grupousuario/salvar', grupousuario);        
        }

        return {
            getTodos: _getTodos,
            salvar: _salvar
        }
    }
})();
