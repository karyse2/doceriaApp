(function () {
    'use strict';

    angular
        .module('devionnAdmin')
        .controller('PacienteController', PacienteController);

    /** @ngInject */
    function PacienteController($scope, $document, $window, $mdToast, $mdDialog, $mdPanel, $rootScope, $localStorage, $http, $location, EnderecoService, PacienteService, GrupoUsuarioService, InfoComplementaresService) {
        var vm = this;
        var panelRef;
        var mdDialog = $mdDialog;


        vm.paciente = {

            info: {
                nome: null,
                foneresidencial: null,
                celular: null,
                fonecomercial: null,
                email:  null,
                rg:     null,
                cpf:    null,
                genero: null,
                datanascimento: null,
                estadocivil:    null,
                escolaridade:   null,
                profissao:  null,
                conjuge:    null,
                convenio:   null,
                matriculaconvenio:  null,
                vencimentoconvenio: null,
                indicacao:    null,
                observacoes:  null
            },

            usuario: {
                idusuario:  null,
                login:      null,
                senha:      null,
                imgperfil:  null,
                email:      null,
                nome:       null,
                idgrupousuario: null,
                ididioma:   null
            },

            endereco: {
                rua: null,
                numero: null,
                complemento: null,
                cep: null,
                bairro: null,
                cidade: {
                    nome: null,
                    ddd: null,
                    idestado: null,
                    idpais: null
                }
            }

        };

        vm.listaPacientes = [];
        vm.listaGrupos = [];
        vm.infoComplementares = {};

        function constructor() {
            vm.getEnderecos();
            vm.getPacientes();
            vm.getGrupos();
            vm.getInfoComplementares();
        }

        alteraImgPerfil();
        function alteraImgPerfil() {
            if (vm.paciente.usuario.imgperfil == null) {
                vm.paciente.usuario.imgperfil = '/assets/images/perfil/noimage.png';
            }

            vm.novaImgPerfil = null;
            vm.novaImgPerfil = vm.paciente.usuario.imgperfil;

        }

        vm.mudarImgPerfil = function() {
            if (vm.paciente.usuario.imgperfil == null) {
                vm.paciente.usuario.imgperfil = vm.novaImgPerfil;
            }
            alteraImgPerfil();
        }

        vm.cadastroNovoUsuario = function() {
            if (vm.required){
                vm.required = false;
            } else {
                vm.required = true;
            }
            angular.element(document.querySelector('#btnInfoUsuarioCadastroPaciente')).toggleClass('btn-info-usuario-hide');
            angular.element(document.querySelector('#infoUsuarioCadastroPaciente')).toggleClass('info-usuario-show');
        }

        vm.cadastroUsuarioExistente = function() {
            angular.element(document.querySelector('#btnInfoUsuarioCadastroPaciente')).toggleClass('btn-info-usuario-hide');
            angular.element(document.querySelector('#pesquisaUsuarioExistentePaciente')).toggleClass('pesquisa-usuario-existente-paciente-show');
        }

        vm.pesquisaAvancadaCidade = function(cidade) {
            if (vm.paciente.endereco.cep == null || vm.paciente.endereco.cep.length == 0 || cidade == 'cidade') {
                mdDialog.show({
                  controller: function() {return vm;},
                  controllerAs: 'vm',
                  templateUrl: 'app/main/paciente/pesquisacidademodal.html',
                  parent: angular.element(document.body),
                  clickOutsideToClose:true
                })
                .then(function(answer) {

                }, function() {
                });

            } else {
                pesquisarCidade(vm.paciente.endereco.cep, null, function(retorno){
                        if (retorno != null) {
                            aplicarEndereco(retorno);
                        }
                    });
            }
        }

        function aplicarEndereco (endereco) {

            for (var i = 0; i < vm.listaEnderecos.estados.length; i++) {
                if (vm.listaEnderecos.estados[i].idestado == endereco.idestado) {
                    vm.paciente.endereco.cidade.idpais = vm.listaEnderecos.estados[i].idpais;
                    vm.paciente.endereco.cidade.idestado = endereco.idestado;
                    vm.paciente.endereco.cidade.nome = endereco.nome;
                    vm.paciente.endereco.bairro = endereco.bairro;
                    vm.paciente.endereco.rua = endereco.rua;
                    vm.paciente.endereco.cidade.ddd = endereco.ddd;
                    console.log(vm.paciente);
                    break;
                }
            }
        }

        vm.fecharPesquisaCidade = function(){
            mdDialog.cancel();
        }

        vm.pesquisarPorCep = function(cep) {
            pesquisarCidade(cep, null, function(retorno){
                vm.cidadesEncontradas = retorno;
            });
        }

        function pesquisarCidade(cep, cidade, retorno) {
            var buscarCep;
            var buscarBanco;

            if (cep != null && cep.length != 0) {
                buscarCep = $http.get('http://api.postmon.com.br/v1/cep/' + cep);

                buscarCep.success(function (retornoCep) {
                    buscarBanco = $http.get('http://localhost:8081/ws/endereco/getByIbge?ibge=' + retornoCep.cidade_info.codigo_ibge);

                    buscarBanco.success(function (retornoBanco) {

                        if (retornoBanco == null || retornoBanco.length == 0) {
                            var falhaPesquisaCidade = $mdDialog.alert()
                                .title('Falha ao buscar a cidade!')
                                .parent(angular.element(document.body))
                                .textContent('Não foram encontrados registros desta cidade!')
                                .ariaLabel('Alert falha pesquisaCidade')
                                .clickOutsideToClose(true)
                                .ok('OK')

                             $mdDialog.show(falhaPesquisaCidade);
                            // .then(function () {
                            //     vm.pesquisaAvancadaCidade();
                            // });

                            retorno(null);
                        } else {
                            retornoBanco.cep = retornoCep.cep;
                            retornoBanco.bairro = retornoCep.bairro;
                            retornoBanco.rua = retornoCep.logradouro;
                            retorno(retornoBanco);
                        }
                    })
                    .error(function (error, status) {
                        var falhaPesquisaCidade = $mdDialog.alert()
                            .title('Falha ao buscar a cidade!')
                            .parent(angular.element(document.body))
                            .textContent('Tente novamente mais tarde!')
                            .ariaLabel('Alert falha pesquisaCidade')
                            .clickOutsideToClose(true)
                            .ok('OK')

                         $mdDialog.show(falhaPesquisaCidade);
                        // .then(function () {
                        //     vm.pesquisaAvancadaCidade();
                        // });

                        retorno(null);
                    });
                })
                .error(function (error, status) {
                    var falhaPesquisaCidade = $mdDialog.alert()
                        .title('Falha ao buscar a cidade!')
                        .parent(angular.element(document.body))
                        .textContent('Verifique se as informações estão corretas e tente novamente!')
                        .ariaLabel('Alert falha pesquisaCidade')
                        .clickOutsideToClose(true)
                        .ok('OK')

                     $mdDialog.show(falhaPesquisaCidade);
                    // .then(function () {
                    //     vm.pesquisaAvancadaCidade();
                    // });

                    retorno(null);
                });
            }

        }

        vm.aplicarPesquisaCidade = function() {
            if (vm.cidadeselected.length > 0) {
                aplicarEndereco(vm.cidadeselected[0]);
                vm.paciente.endereco.cidade.nome = vm.cidadeselected[0].nome;
                vm.paciente.endereco.cep = vm.cidadeselected[0].cep;
                mdDialog.cancel();
            }
        }

        vm.indexGrupoSelecionado = function(grupoSelecionado) {
            var ind = vm.infoComplementares.tipoGrupoUsuario;
            vm.usuario.idgrupousuario = ind.indexOf(grupoSelecionado) +1;
        };

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
                vm.salvaCadastro(vm.paciente);
            }, function () {

            });
        }

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

        vm.validaFormulario = function(valido) {
            // if (!valido) {
            //     $mdDialog.show(
            //       $mdDialog.alert()
            //         .parent(angular.element(document.body))
            //         .clickOutsideToClose(true)
            //         .textContent("Por favor, preencha todos os campos obrigatórios!")
            //         .ariaLabel('Alert campos invalidos')
            //         .ok('OK')
            //     );
            //
            // } else {
            //     vm.confirmaCadastro();
            // }

            console.log(vm.paciente);
        }

        vm.salvaCadastro = function(usuario) {
            PacienteService.salvar(vm.paciente)
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
            $location.path('/paciente');
        }

        vm.minimizaModalCadastro = function () {
            panelRef && panelRef.close();
        }

        vm.abreCadastro = function () {
            $location.path('/paciente/cadastro');
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
                vm.paciente.usuario.senha = null;
                form.campoConfirma.$error.senhaInvalida = true;
                form.campoConfirma.$setValidity('senhaInvalida', false);
            } else {
                vm.paciente.usuario.senha = vm.senha;
                form.campoConfirma.$error.senhaInvalida = false;
                form.campoConfirma.$setValidity('senhaInvalida', true);
            }
        }

        vm.getPacientes = function() {
            PacienteService.getTodos()
                .success(function (result) {
                    vm.listaPacientes = result;
                })
                .error(function (error) {
                    console.log(error);
                })
        }

        vm.getEnderecos = function() {
            EnderecoService.getTodos()
                .success(function (result) {
                    vm.listaEnderecos = result;
                })
                .error(function (error, status) {
                    vm.listaEnderecos = null;
                });
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

        vm.getInfoComplementares = function() {
            InfoComplementaresService.getTodos()
                .success(function (result) {
                    vm.infoComplementares = result;
                })
                .error(function (error, status) {
                    vm.infoComplementares = null;
                });
        }

        constructor();


        //CONTROLE GRID TELA INICIAL
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

        //CONTROLE GRID PESQUISA CIDADE
        vm.cidadeselected = [];

        vm.cidadeoptions = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };

        vm.cidadequery = {
            order: 'cidade'
        };

    }
})();
