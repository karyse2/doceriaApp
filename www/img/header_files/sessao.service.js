(function() {
    'use strict';

    angular
        .module('devionnAdmin')
        .service('Sessao', Sessao);

    /** @ngInject */
    function Sessao($http, $localStorage) {
        var baseUrl = 'http://localhost:8081';

        function mudarUsuario(usuario) {
            angular.extend(usuarioLogado, usuario);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Cadeia de caracteres base64 inválida';
            }
            return window.atob(output);
        }

        function _getUsuarioFromToken() {
            var token = $localStorage.token;
            var usuario = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                usuario = JSON.parse(urlBase64Decode(encoded));
            }
            return usuario;
        }

        var usuarioLogado = _getUsuarioFromToken();

        var _login = function(usuario) {
            return $http.post(baseUrl + '/ws/usuario/login', usuario);
        }

        var _autenticar = function() {
            return $http.get(baseUrl + '/ws/usuario/autenticar');
        }

        var _logoff = function () {
            // return $http.(baseUrl + '/ws/usuario/logoff');
            mudarUsuario({});
            delete $localStorage.token;
        }

        var _isUsuarioLogado = function () {
            return usuarioLogado == null ? false : true;
        }

        return {
            login: _login,
            autenticar: _autenticar,
            logoff: _logoff,
            isUsuarioLogado: _isUsuarioLogado,
            getUsuarioLogado: _getUsuarioFromToken
        }
    }
})();
