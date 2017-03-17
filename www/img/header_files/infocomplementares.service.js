(function() {
    'use strict';

    angular
        .module('devionnAdmin')
        .service('InfoComplementaresService', InfoComplementaresService);

    /** @ngInject */
    function InfoComplementaresService($http, $localStorage) {
        var baseUrl = 'http://localhost:8081';

        var _getTodos = function() {
            return $http.get(baseUrl + '/ws/infocomplementares/getTodos');
        }


        return {
            getTodos: _getTodos
        }
    }
})();
