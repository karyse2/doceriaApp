(function () {
    'use strict';

    angular
        .module('devionnAdmin')
        .controller('UsuarioController', UsuarioController);

    /** @ngInject */
    function UsuarioController($mdToast, $mdDialog, $mdPanel, $rootScope, $localStorage, $http, $location, Sessao, $window, GrupoUsuarioService, UsuarioService) {
        var vm = this;
        var panelRef;

        vm.listaUsuarios = [];

        vm.listaGrupos = [];

        vm.infoComplementares = {
            idiomasDisp:        ['Português', 'Inglês', 'Espanhol'],
            estadoCivil:        ['Casado', 'Solteiro', 'Viúvo', 'Divorciado' ]
        }

        vm.usuario = {
            login:  null,
            senha:  null,
            email:  null,
            imgperfil: null,
            nome:   null,
            rg:     null,
            cpf:    null,
            genero: null,
            datanascimento: null,
            datacadastro:   new Date(),
            estadocivil:    null,
            idgrupousuario: null,
        }

        function constructor() {
            vm.carregarUsuarios();
            vm.getGrupos();
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

        alteraImgPerfil();
        function alteraImgPerfil() {
            if (vm.usuario.imgperfil == null) {
                vm.usuario.imgperfil = '/assets/images/perfil/noimage.png';
            }

            vm.novaImgPerfil = null;
            vm.novaImgPerfil = vm.usuario.imgperfil;

        }

        vm.mudarImgPerfil = function() {
            if (vm.usuario.imgperfil == null) {
                vm.usuario.imgperfil = vm.novaImgPerfil;
            }
            alteraImgPerfil();
        }

        vm.indexGrupoSelecionado = function(grupoSelecionado) {
            var ind = vm.infoComplementares.tipoGrupoUsuario;
            vm.usuario.idgrupousuario = ind.indexOf(grupoSelecionado) +1;
        };


        var msgResultadoCadastro = function(resultado, retorno) {
            var msg;

            if (resultado) {
                msg = 'Usuário cadastrado com sucesso!';

            } else {
                msg = 'Falha ao cadastrar o usuário!';
            }

            $mdToast.show(
              $mdToast.simple()
                .textContent(msg)
                .position('top right' )
                .hideDelay(3000)
                .parent(angular.element(document.querySelector('#paginacadastrousuario')))
            );
        }

        vm.salvaCadastro = function() {

            UsuarioService.salvar(vm.usuario)
                .success(function (result) {
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
            $location.path('/usuario');

        }

        vm.minimizaModalCadastro = function () {
            panelRef && panelRef.close();
        }

        vm.abreCadastro = function () {
            $location.path('/usuario/cadastro');
        }

        vm.deletarUsuario = function(idusuario) {
            UsuarioService.deletar(idusuario)
                .success(function (result) {

                })
                .error(function (error, status) {
                    console.log(error);
                });
        }

        /*
          Manuseia os campos de senha e confirmação de senha da aba 'INFORMAÇÕES DE USUÁRIO' do cadastro de
          médico
        */
        vm.typeCampoSenha = 'password';
        vm.typeCampoConfirmaSenha = 'password';
        vm.senhaIcon = 'visibility';
        vm.confirmaSenhaIcon = 'visibility';

        vm.mostrarsenha = function (campo) {
            if (campo == 'campoSenha') {
                if (vm.typeCampoSenha == 'password') {
                    vm.typeCampoSenha = 'text';
                    vm.senhaIcon = 'visibility_off'

                } else {
                    vm.typeCampoSenha = 'password';
                    vm.senhaIcon = 'visibility'
                }

            } else if (campo == 'campoConfirma') {
                if (vm.typeCampoConfirmaSenha == 'password') {
                    vm.typeCampoConfirmaSenha = 'text';
                    vm.confirmaSenhaIcon = 'visibility_off'

                } else if (vm.typeCampoConfirmaSenha == 'text') {
                    vm.typeCampoConfirmaSenha = 'password';
                    vm.confirmaSenhaIcon = 'visibility'
                }

            }
        }

        vm.msgSenhaInvalida = 'As senhas não são compatíveis';
        vm.validaSenha = function (form) {

            if (vm.senha != vm.confirmaSenha) {
                vm.usuario.senha = null;
                form.campoConfirma.$error.senhaInvalida = true;
                form.campoConfirma.$setValidity('senhaInvalida', false);
                form.$invalid = true;
            } else {
                vm.usuario.senha = vm.senha;
                form.campoConfirma.$error.senhaInvalida = false;
                form.campoConfirma.$setValidity('senhaInvalida', true);
                form.$invalid = false;
            }
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

        vm.carregarUsuarios = function() {
            UsuarioService.getTodos()
                .success(function (result) {
                    vm.listaUsuarios = result;
                })
                .error(function (error) {
                    console.log(error);
                })
        }

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
    }
})();
