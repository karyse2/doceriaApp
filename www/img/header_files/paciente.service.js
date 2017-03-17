(function() {
    'use strict';

    angular
        .module('devionnAdmin')
        .service('PacienteService', PacienteService);

    /** @ngInject */
    function PacienteService($http, $localStorage) {
        var baseUrl = 'http://localhost:8081';

        var _getTodos = function() {
            return $http.get(baseUrl + '/ws/paciente/getTodos');
        }

        var _salvar = function(paciente) {
            return $http.post(baseUrl + '/ws/paciente/salvar', paciente);
        }

        var _deletar = function(idpaciente) {
            return $http.post(baseUrl + '/ws/paciente/deletar', idpaciente);
        }

        return {
            getTodos: _getTodos,
            salvar: _salvar,
            deletar: _deletar
        }
    }
})();
