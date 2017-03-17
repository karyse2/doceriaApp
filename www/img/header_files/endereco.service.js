(function() {
    'use strict';

    angular
        .module('devionnAdmin')
        .service('EnderecoService', EnderecoService);

    /** @ngInject */
    function EnderecoService($http, $localStorage) {
        var baseUrl = 'http://localhost:8081';

        var _getTodos = function() {
            return $http.get(baseUrl + '/ws/endereco/getTodos');
        }

        return {
            getTodos: _getTodos
        }
    }
})();
