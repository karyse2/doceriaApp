(function () {
    'use strict';

    angular
        .module('devionnAdmin')
        .controller('MedicoController', MedicoController);

    /** @ngInject */
    function MedicoController($mdDialog, $mdPanel, $rootScope, $localStorage, $http, $location) {
        var vm = this;
        var panelRef;
        var mdDialog = $mdDialog;

        vm.infoComplementares = {
            tipoGrupoUsuario:    ['Administrador', 'Médico', 'Padrão'],
            idiomasDisp:        ['Português', 'Inglês', 'Espanhol'],
            estadoCivil:        ['Casado', 'Solteiro', 'Viúvo', 'Divorciado' ]
        }

        vm.pais = {
            nome: ['Brasil'],
            estado: [
                'PR',
                'SC',
                'RS'
            ]
        }

        vm.tiposCadastro = ['CRM', 'CREFITO', 'CRO'];

        vm.medico = {

            info: {
                nome: null,
                telefone: null,
                celular: null,
                especialidade: null,
                observacao: null
            },

            usuario: {
                login:  null,
                senha:  null,
                email:  null,
                imgperfil: null,
                nome:   null,
                rg:     null,
                cpf:    null,
                genero: null,
                datanascimento: null,
                datacadastro:   '2016-09-26 13:35:00',
                estadocivil:    null,
                idgrupousuario: null,
            },

            endereco: {
                rua: null,
                numero: null,
                complemento: null,
                cep: null,
                cidade: {
                    nome: null,
                    ddd: '46',
                    idestado: null
                },
                idestado: null,
                idpais: null
            }

        };

        vm.cadastroNovoUsuario = function() {
            if (vm.required){
                vm.required = false;
            } else {
                vm.required = true;
            }
            angular.element(document.querySelector('#btnInfoUsuarioCadastroMedico')).toggleClass('btn-info-usuario-cadastro-medico-hide');
            angular.element(document.querySelector('#infoUsuarioCadastroMedico')).toggleClass('info-usuario-cadastro-medico-show');
        }

        vm.cadastroUsuarioExistente = function() {
            angular.element(document.querySelector('#btnInfoUsuarioCadastroMedico')).toggleClass('btn-info-usuario-cadastro-medico-hide');
            angular.element(document.querySelector('#pesquisaUsuarioExistenteMedico')).toggleClass('pesquisa-usuario-existente-medico-show');
        }

        alteraImgPerfil();
        function alteraImgPerfil() {
            if (vm.medico.usuario.imgperfil == null) {
                vm.medico.usuario.imgperfil = '/assets/images/perfil/noimage.png';
            }

            vm.novaImgPerfil = null;
            vm.novaImgPerfil = vm.medico.usuario.imgperfil;

        }

        vm.mudarImgPerfil = function() {
            if (vm.medico.usuario.imgperfil == null) {
                vm.medico.usuario.imgperfil = vm.novaImgPerfil;
            }
            alteraImgPerfil();
        }

        vm.pesquisaAvancadaCidade = function() {

            mdDialog.show({
              controller: function() {return vm;},
              controllerAs: 'vm',
              templateUrl: 'app/main/medico/pesquisacidademodal.html',
              parent: angular.element(document.body),
              clickOutsideToClose:true
            })
            .then(function(answer) {

            }, function() {
            });
        }

        vm.fecharPesquisaCidade = function(){
            mdDialog.cancel();
        }

        vm.pesquisarCep = function(cep) {
            var consultar = $http.get('http://api.postmon.com.br/v1/cep/' + cep);

            consultar.success(function (result) {
                vm.pesquisaCidade.nome = result.cidade;
            })
            .error(function (error, status) {
                var falhaPesquisaCidade = $mdDialog.alert()
                    .title('Falha ao buscar a cidade!')
                    .parent(angular.element(document.body))
                    .textContent('Verifique se as informações estão corretas e tente novamente!')
                    .ariaLabel('Alert falha pesquisaCidade')
                    .clickOutsideToClose(true)
                    .ok('OK')

                $mdDialog.show(falhaPesquisaCidade).then(function () {
                    vm.pesquisaAvancadaCidade();
                });
            });

        }

        vm.aplicarPesquisaCidade = function() {
            vm.medico.endereco.cidade.nome = vm.pesquisaCidade.nome;
            vm.medico.endereco.cep = vm.pesquisaCidade.cep;
            mdDialog.cancel();
        }

        vm.indexGrupoSelecionado = function(grupoSelecionado) {
            var ind = vm.infoComplementares.tipoGrupoUsuario;
            vm.medico.usuario.idgrupousuario = ind.indexOf(grupoSelecionado) +1;
        };

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
                vm.salvaCadastro(vm.medico);
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

        vm.salvaCadastro = function(medico) {
            var baseUrl = 'http://localhost:8081';
            var salvar = $http.post(baseUrl + '/ws/usuario/salvar', medico);

            salvar.success(function (result) {
                if (result.type == false) {
                    alert(result);
                    console.log(result.type);
                } else {
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
        vm.fechaCadastro = function (alterado) {
            if (alterado) {
                var confirm = $mdDialog.confirm()
                    .title('Tem certeza que deseja sair?')
                    .parent(angular.element(document.body))
                    .textContent('Todas as informações não salvas serão perdidas!')
                    .ariaLabel('Alert fechar cadastro')
                    .clickOutsideToClose(true)
                    .ok('Sair')
                    .cancel('Cancelar');

                $mdDialog.show(confirm).then(function () {
                    $location.path('/medico');
                }, function () {

                });
            } else {
                $location.path('/medico');
            }

        }

        vm.minimizaModalCadastro = function () {
            panelRef && panelRef.close();
        }

        vm.abreCadastro = function () {
            $location.path('/medico/cadastro');
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
                vm.medico.usuario.senha = null;
                form.campoConfirma.$error.senhaInvalida = true;
                form.campoConfirma.$setValidity('senhaInvalida', false);
            } else {
                vm.medico.usuario.senha = vm.senha;
                form.campoConfirma.$error.senhaInvalida = false;
                form.campoConfirma.$setValidity('senhaInvalida', true);
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

        vm.desserts = {
            "count": 12,
            "data": [{
                "codigo": 1,
                "nome": "Médico 1",
                "login": "medico1",
                "especialidade": "Ortopedista",
                "tipopermissao": "Usuário",
                "datacadastro": "01/01/2016"
            }, {
                "codigo": 2,
                "nome": "Médico 2",
                "login": "medico2",
                "especialidade": "Ortopedista",
                "tipopermissao": "Usuário",
                "datacadastro": "01/01/2016"
            }, {
                "codigo": 3,
                "nome": "Médico 3",
                "login": "medico3",
                "especialidade": "Ortopedista",
                "tipopermissao": "Usuário",
                "datacadastro": "01/01/2016"
            }, {
                "codigo": 4,
                "nome": "Médico 4",
                "login": "medico4",
                "especialidade": "Ortopedista",
                "tipopermissao": "Usuário",
                "datacadastro": "01/01/2016"
            }, {
                "codigo": 5,
                "nome": "Médico 5",
                "login": "medico5",
                "especialidade": "Ortopedista",
                "tipopermissao": "Usuário",
                "datacadastro": "01/01/2016"
            }, {
                "codigo": 6,
                "nome": "Médico 6",
                "login": "medico6",
                "especialidade": "Ortopedista",
                "tipopermissao": "Usuário",
                "datacadastro": "01/01/2016"
            }, {
                "codigo": 7,
                "nome": "Médico 7",
                "login": "medico7",
                "especialidade": "Ortopedista",
                "tipopermissao": "Usuário",
                "datacadastro": "01/01/2016"
            }, {
                "codigo": 8,
                "nome": "Médico 8",
                "login": "medico8",
                "especialidade": "Ortopedista",
                "tipopermissao": "Usuário",
                "datacadastro": "01/01/2016"
            }, {
                "codigo": 9,
                "nome": "Médico 9",
                "login": "medico9",
                "especialidade": "Ortopedista",
                "tipopermissao": "Usuário",
                "datacadastro": "01/01/2016"
            }, {
                "codigo": 10,
                "nome": "Médico 10",
                "login": "medico10",
                "especialidade": "Ortopedista",
                "tipopermissao": "Usuário",
                "datacadastro": "01/01/2016"
            }, {
                "codigo": 11,
                "nome": "Médico 11",
                "login": "medico11",
                "especialidade": "Ortopedista",
                "tipopermissao": "Usuário",
                "datacadastro": "01/01/2016"
            }, {
                "codigo": 12,
                "nome": "Médico 12",
                "login": "medico12",
                "especialidade": "Ortopedista",
                "tipopermissao": "Usuário",
                "datacadastro": "01/01/2016"
            }]
        };

    };

})();
