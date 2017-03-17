(function() {
    'use strict';

    angular
        .module('devionnAdmin')
        .service('UsuarioService', UsuarioService);

    /** @ngInject */
    function UsuarioService($http, $localStorage) {
        var baseUrl = 'http://localhost:8081';

        var _getTodos = function() {
            return $http.get(baseUrl + '/ws/usuario/getTodos');
        }

        var _salvar = function(usuario) {
            return $http.post(baseUrl + '/ws/usuario/salvar', usuario);
        }

        var _deletar = function(idusuario) {
            return $http.post(baseUrl + '/ws/usuario/deletar', idusuario);
        }

        return {
            getTodos: _getTodos,
            salvar: _salvar,
            deletar: _deletar
        }
    }
})();
