(function () {
    'use strict';

    angular
        .module('devionnAdmin')
        .controller('GrupoUsuarioController', GrupoUsuarioController);

    /** @ngInject */
    function GrupoUsuarioController($mdToast, $mdDialog, $mdPanel, $rootScope, $localStorage, $http, $location, GrupoUsuarioService) {
        var vm = this;
        var panelRef;

        function constructor() {
            vm.getGrupos();

            vm.listaTelas = [
                {
                    nome: 'Cadastro de usuários',
                    permissoes: [
                        {
                            nome: 'Salvar',
                            status: false
                        },
                        {
                            nome: 'Excluir',
                            stauts: false
                        },
                        {
                            nome: 'Visualizar',
                            status: false
                        }
                    ]
                },
                {
                    nome: 'Cadastro de médicos',
                    permissoes: [
                        {
                            nome: 'Salvar',
                            status: false
                        },
                        {
                            nome: 'Excluir',
                            stauts: false
                        },
                        {
                            nome: 'Visualizar',
                            status: false
                        }
                    ]
                },
                {
                    nome: 'Cadastro de pacientes',
                    permissoes: [
                        {
                            nome: 'Salvar',
                            status: false
                        },
                        {
                            nome: 'Excluir',
                            stauts: false
                        },
                        {
                            nome: 'Visualizar',
                            status: false
                        }
                    ]
                },
                {
                    nome: 'Cadastro de grupo de usuário',
                    permissoes: [
                        {
                            nome: 'Salvar',
                            status: false
                        },
                        {
                            nome: 'Excluir',
                            stauts: false
                        },
                        {
                            nome: 'Visualizar',
                            status: false
                        }
                    ]
                },
                {
                    nome: 'Cadastro de procedimentos',
                    permissoes: [
                        {
                            nome: 'Salvar',
                            status: false
                        },
                        {
                            nome: 'Excluir',
                            stauts: false
                        },
                        {
                            nome: 'Visualizar',
                            status: false
                        }
                    ]
                },
                {
                    nome: 'Agendamentos',
                    permissoes: [
                        {
                            nome: 'Salvar',
                            status: false
                        },
                        {
                            nome: 'Excluir',
                            stauts: false
                        },
                        {
                            nome: 'Visualizar',
                            status: false
                        }
                    ]
                }
            ];

            vm.listaTelasOrganizada = [];

            organizarListaTelas();
            console.log(vm.listaTelasOrganizada);
        }

        vm.grupousuario = {
            nome: null,
            descricao: null
        }

        function organizarListaTelas() {
            var index = 0;
            var arrayTelas = [];

            for (var i = 0; i < vm.listaTelas.length; i++) {
                arrayTelas.push(vm.listaTelas[i]);
                arrayTelas.push(vm.listaTelas[(i+1)]);
                arrayTelas.push(vm.listaTelas[(i+2)]);
                vm.listaTelasOrganizada.push(arrayTelas);

                arrayTelas = [];
                i = i + 2;
            }
        }

        vm.selecionarTodos = function(tela) {
            var permissoes = tela.permissoes;

            for (var i = 0; i < permissoes.length; i++) {
                permissoes[i].status = !tela.todos;
            }
        }

        vm.mudarPermissao = function(tela) {
            tela.todos = false;
        }

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
                vm.salvaCadastro();
            }
        }

        var msgResultadoCadastro = function(resultado, retorno) {
            var msg;

            if (resultado) {
                msg = 'Grupo cadastrado com sucesso!';

            } else {
                msg = 'Falha ao cadastrar o grupo!';
            }

            $mdToast.show(
              $mdToast.simple()
                .textContent(msg)
                .position('top right' )
                .hideDelay(3000)
                .parent(angular.element(document.querySelector('#paginacadastrogrupousuario')))
            );
        }

        vm.salvaCadastro = function() {

            GrupoUsuarioService.salvar(vm.grupousuario)
                .success(function (result) {
                    if (result.type == false) {
                        alert(result);
                        console.log(result.type);
                    } else {
                        result.type = true;
                        console.log(result.type);
                        $localStorage.token = result.token;
                    }

                    /*if (result == 'ERROLOGINJAEXISTE') {
                        result = 'Já existe um usuário com este login!';
                    }*/
                    msgResultadoCadastro(result.type, result);
                })
                .error(function (error, status) {
                    console.log(error);
                    $rootScope.error = 'Falha ao tentar acessar';
                    msgResultadoCadastro(false, $rootScope.error);
                });
        }

        /*Manuseia o modal de cadastro*/
        vm.fechaCadastro = function () {
            $location.path('/grupousuario');
        }

        vm.minimizaModalCadastro = function () {
            panelRef && panelRef.close();
        }

        vm.abreCadastro = function () {
            $location.path('/grupousuario/cadastro');
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
            console.log(item.codigo, 'was selected');
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

        vm.getGrupos = function() {
            GrupoUsuarioService.getTodos()
                .success(function (result) {
                    vm.listaGrupos = result;
                })
                .error(function (error, status) {
                    vm.listaGrupos = null;
                });
        }

        constructor();
    };

})();
