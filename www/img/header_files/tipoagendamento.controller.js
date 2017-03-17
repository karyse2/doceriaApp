(function () {
    'use strict';

    angular
        .module('devionnAdmin')
        .controller('TipoAgendamentoController', TipoAgendamentoController);

    /** @ngInject */
    function TipoAgendamentoController($mdDialog, $mdPanel, $rootScope, $localStorage, $http, $location) {
        var vm = this;
        var panelRef;
        var mdDialog = $mdDialog;

        vm.novaImgPerfil = 'http://placehold.it/94x94?text=Sem+Imagem';
        vm.tipoagendamento = {

        };

        vm.procedimentosDisp = ['Cirurgia', 'Troca de curativos', 'Lipoaspiração'];


        vm.validaFormulario = function(valido) {
            if (!valido) {
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .clickOutsideToClose(true)
                    .textContent("Por favor, preencha todos os campos obrigatórios!")
                    .ariaLabel('Alert campos invalidos')
                    .ok('OK')
                );

            } else {
                vm.confirmaCadastro();
            }
        }

        vm.confirmaCadastro = function () {
            var confirmDialog = $mdDialog.confirm()
                .title('Tem certeza que deseja salvar?')
                .parent(angular.element(document.body))
                .textContent('As informações serão salvas.')
                .ariaLabel('Alert confirma cadastro')
                .clickOutsideToClose(true)
                .ok('Salvar')
                .cancel('Cancelar');

            $mdDialog.show(confirmDialog).then(function () {
                vm.salvaCadastro(vm.tipoagendamento);
            }, function () {

            });
        }

        var msgResultadoCadastro = function(resultado, retorno) {
            var titulo;
            var msg;

            if (resultado) {
                titulo = 'Usuário cadastrado com sucesso!';
                msg = 'Este usuário já pode realizar login no sistema';

            } else {
                titulo = 'Falha ao cadastrar o usuário!'
                msg = 'Erro: ' + retorno;
            }

            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.body))
                .clickOutsideToClose(false)
                .title(titulo)
                .textContent(msg)
                .ariaLabel('Alert resultado cadastro')
                .ok('Fechar')
            );
        }

        vm.salvaCadastro = function(tipoagendamento) {
            var baseUrl = 'http://localhost:8081';
            var salvar = $http.post(baseUrl + '/ws/usuario/salvar', tipoagendamento);

            salvar.success(function (result) {
                if (result.type == false) {
                    alert(result);
                } else {
                    $localStorage.token = result.token;
                }

                msgResultadoCadastro(result.type, result);
            })
            .error(function (error, status) {
                console.log(error);
                $rootScope.error = 'Falha ao tentar acessar';
                msgResultadoCadastro(false, error);
            });
        }

        /*Manuseia o modal de cadastro*/
        vm.fechaCadastro = function () {
            $location.path('/tipoagendamento');
        }

        vm.minimizaModalCadastro = function () {
            panelRef && panelRef.close();
        }

        vm.abreCadastro = function () {
            $location.path('/tipoagendamento/cadastro');
        }

        //CONTROLE GRID
        vm.selected = [];

        vm.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };
        vm.limitOptions = [5, 10, 15];

        vm.toggleLimitOptions = function () {
            vm.limitOptions = vm.limitOptions ? undefined : [5, 10, 15];
        };

        vm.getTipoPermissao = function () {
            return ['Admin', 'Recepção', 'Usuário', 'Paciente'];
        };

        vm.loadStuff = function () {
            vm.promise = $timeout(function () {
                // loading
            }, 2000);
        }

        vm.logItem = function (item) {
            console.log(item.name, 'was selected');
        };

        vm.logOrder = function (order) {
            console.log('order: ', order);
        };

        vm.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
        }

        vm.query = {
            order: 'codigo',
            limit: 5,
            page: 1
        };

        vm.desserts = vm.desserts = {
            "count": 12,
            "data": [{
                "codigo": 1,
                "nome": "Paciente 1",
                "procedimento": "Cirurgia",
                "datacadastro": "01/01/2016",
                "dataprocedimento" : "01/02/2016"
            }, {
                "codigo": 2,
                "nome": "Paciente 2",
                "procedimento": "Cirurgia",
                "datacadastro": "01/01/2016",
                "dataprocedimento" : "01/02/2016"
            }, {
                "codigo": 3,
                "nome": "Paciente 3",
                "procedimento": "Cirurgia",
                "datacadastro": "01/01/2016",
                "dataprocedimento" : "01/02/2016"
            }, {
                "codigo": 4,
                "nome": "Paciente 4",
                "procedimento": "Cirurgia",
                "datacadastro": "01/01/2016",
                "dataprocedimento" : "01/02/2016"
            }, {
                "codigo": 5,
                "nome": "Paciente 5",
                "procedimento": "Remover curativos",
                "datacadastro": "01/01/2016",
                "dataprocedimento" : "01/02/2016"
            }, {
                "codigo": 6,
                "nome": "Paciente 6",
                "procedimento": "Remover curativos",
                "datacadastro": "01/01/2016",
                "dataprocedimento" : "01/02/2016"
            }, {
                "codigo": 7,
                "nome": "Paciente 7",
                "procedimento": "Remover curativos",
                "datacadastro": "01/01/2016",
                "dataprocedimento" : "01/02/2016"
            }, {
                "codigo": 8,
                "nome": "Paciente 8",
                "procedimento": "Remover curativos",
                "datacadastro": "01/01/2016",
                "dataprocedimento" : "01/02/2016"
            }, {
                "codigo": 9,
                "nome": "Paciente 9",
                "procedimento": "Remover curativos",
                "datacadastro": "01/01/2016",
                "dataprocedimento" : "01/02/2016"
            }, {
                "codigo": 10,
                "nome": "Paciente 10",
                "procedimento": "Lipoaspiração",
                "datacadastro": "01/01/2016",
                "dataprocedimento" : "01/02/2016"
            }, {
                "codigo": 11,
                "nome": "Paciente 11",
                "procedimento": "Lipoaspiração",
                "datacadastro": "01/01/2016",
                "dataprocedimento" : "01/02/2016"
            }, {
                "codigo": 12,
                "nome": "Paciente 12",
                "procedimento": "Lipoaspiração",
                "datacadastro": "01/01/2016",
                "dataprocedimento" : "01/02/2016"
            }]
        };
    }
})();
