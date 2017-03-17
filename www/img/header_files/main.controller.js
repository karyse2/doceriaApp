(function() {
  'use strict';

  angular
    .module('devionnAdmin')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($http) {
    var vm = this;

    getMenus();

    function getMenus() {
        var menus = $http.get('http://localhost:8081/ws/menus/categoria/getTodos');

        menus.success(function (result) {
            vm.menus = result;
            console.log(vm.menus);
        })
        .error(function (error, status) {
            console.log(error);
        });
    }

    /*vm.menus = [
        {
            nome: 'Categoria',
            tipo: 'heading',
            submenus: [
                {
                    nome: 'Agenda',
                    tipo: 'toggle',
                    icone: 'event',
                    aberto: false,
                    paginas: [
                        {
                            nome: 'Todos',
                            url: '#/calendar',
                            tipo: 'link',
                            hidden: false,
                            selecionada: false
                        }
                    ]
                },
                {
                    nome: 'Cadastro',
                    tipo: 'toggle',
                    icone: 'assignment',
                    aberto: false,
                    paginas: [
                        {
                            nome: 'Médico',
                            url: '#/medico',
                            tipo: 'link',
                            hidden: false,
                            selecionada: false
                        },
                        {
                            nome: 'Paciente',
                            url: '#/paciente',
                            tipo: 'link',
                            hidden: false,
                            selecionada: false
                        },
                        {
                            nome: 'Usuário',
                            url: '#/usuario',
                            tipo: 'link',
                            hidden: false,
                            selecionada: false
                        },
                        {
                            nome: 'Grupo de usuário',
                            url: '#/grupousuario',
                            tipo: 'link',
                            hidden: false,
                            selecionada: false
                        },
                        {
                            nome: 'Tipo de Agendamento',
                            url: '#/tipoagendamento',
                            tipo: 'link',
                            hidden: false,
                            selecionada: false
                        },
                        {
                            nome: 'Procedimento',
                            url: '#/procedimento',
                            tipo: 'link',
                            hidden: false,
                            selecionada: false
                        }
                    ]
                }
            ]
        }
    ];*/

    vm.notificacoes = 7;

    vm.btnMenuToggle = angular.element(document.querySelector('#btn-menu-toggle'));
    activate();

    function activate() {
        vm.toggleSideNavLeft = toggleSideNavLeft;
        vm.toggleSideNavRight = toggleSideNavRight;
        vm.btnMenuToggle.toggleClass('arrow');
    };

    vm.openLockedLeft = true;
    vm.openLockedRight = false;
    vm.openLockedRight_profile = false;
    vm.openLockedRight_chat = false;
    vm.openLockedRight_notifications = false;

    function toggleSideNavLeft() {
        vm.btnMenuToggle.toggleClass('arrow');
        vm.openLockedLeft = !vm.openLockedLeft;
    }

    function toggleSideNavRight(menuClick) {
        if (menuClick == 'profile') {
            vm.openLockedRight_profile = !vm.openLockedRight_profile;
            vm.openLockedRight_chat = false;
            vm.openLockedRight_notifications = false;
            vm.contentSidenavRight = '/app/contentSidenavRight/profile/profile.html';
            vm.openLockedRight = vm.openLockedRight_profile;

        } else if (menuClick == 'chat') {
            vm.openLockedRight_chat = !vm.openLockedRight_chat;
            vm.openLockedRight_profile = false;
            vm.openLockedRight_notifications = false;
            vm.contentSidenavRight = '/app/contentSidenavRight/chat/chat.html';
            vm.openLockedRight = vm.openLockedRight_chat;

        } else if (menuClick == 'notifications') {
            vm.openLockedRight_notifications = !vm.openLockedRight_notifications;
            vm.openLockedRight_chat = false;
            vm.openLockedRight_profile = false;
            vm.contentSidenavRight = '/app/contentSidenavRight/notifications/notifications.html';
            vm.openLockedRight = vm.openLockedRight_notifications;
        }
    }

    vm.pesquisarSistema = function(){
        angular.element(document.querySelector('#menuacessorapido')).toggleClass('menu-acesso-rapido-hide');
        angular.element(document.querySelector('#divpesquisasistema')).toggleClass('search-menu-show');
        angular.element(document.querySelector('#searchboxmenu')).focus();
    }

    vm.fecharPesquisaSistema = function() {
        angular.element(document.querySelector('#divpesquisasistema')).toggleClass('search-menu-show');
        angular.element(document.querySelector('#menuacessorapido')).toggleClass('menu-acesso-rapido-hide');
    }
  }
})();
