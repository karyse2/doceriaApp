angular.module('doceriaApp')

    .factory('Services', function ($http, config, $cordovaPreferences, $ionicPopup) {


        var _login = function (usuario) {
            _verificarConexao();
            return $http({
                method: 'POST',
                url: config.serverUrl + '/iniciar_sessao/iniciar_sessao.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: usuario
            });

            //  return $http.post(config.serverUrl + '/iniciar_sessao/iniciar_sessao.php', usuario);
        }

        var _deslogar = function (usuario) {
            _verificarConexao();
            return $http({
                method: 'POST',
                url: config.serverUrl + '/finalizar_sessao/finalizar_sessao.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: usuario
            });
        }

        var _receberPropostas = function (usuario) {
            _verificarConexao();
            var usuario = config.usuario;
            return $http({
                method: 'POST',
                url: config.serverUrl + '/propostas_avaliacao/propostas_avaliacao.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: usuario
            });
        }

        var _receberFormasPagamento = function (id) {
            _verificarConexao();
            var usuario = config.usuario;
            usuario.proposta = id;
            return $http({
                method: 'POST',
                url: config.serverUrl + '/proposta_formas_pagamentos/proposta_formas_pagamentos.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: usuario
            });
        }

        var _receberVeiculos = function (id) {
            _verificarConexao();
            var usuario = config.usuario;
            usuario.proposta = id;
            return $http({
                method: 'POST',
                url: config.serverUrl + '/proposta_veiculos/proposta_veiculos.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: usuario
            });
        }

        var _receberImoveis = function (id) {
            _verificarConexao();
            var usuario = config.usuario;
            usuario.proposta = id;
            return $http({
                method: 'POST',
                url: config.serverUrl + '/proposta_imoveis/proposta_imoveis.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: usuario
            });
        }

        var _aprovarPropostas = function (proposta) {
            _verificarConexao();
            return $http({
                method: 'POST',
                url: config.serverUrl + '/proposta_avaliar/proposta_avaliar.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: proposta
            });
        }

        var _enviarRelatorios = function (usuario) {
            _verificarConexao();
            var usuario = config.usuario;
            return $http({
                method: 'POST',
                url: config.serverUrl + '/relatorio_propostas_comerciais/relatorio_propostas_comerciais.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: usuario
            });
        }

        var _infoRelatorios = function (periodo) {
            _verificarConexao();
            var enviar = {
                dispositivo: null,
                token: null,
                periodo: null,
                status: null,
            }
            enviar.dispositivo = config.usuario.dispositivo;
            enviar.token = config.usuario.token;
            enviar.periodo = periodo;
            enviar.status = 10;

            return $http({
                method: 'POST',
                url: config.serverUrl + '/relatorio_propostas_comerciais/relatorio_propostas_comerciais.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: enviar
            });
        }

        return {
            login: _login,
            deslogar: _deslogar,
            receberPropostas: _receberPropostas,
            receberFormasPagamento: _receberFormasPagamento,
            receberVeiculos: _receberVeiculos,
            receberImoveis: _receberImoveis,
            aprovarPropostas: _aprovarPropostas,
            enviarRelatorios: _enviarRelatorios,
            infoRelatorios: _infoRelatorios,
        };

    });
