(function () {
    'use strict';

    angular
        .module('devionnAdmin')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                abstract: true,
                url: '',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('login2', {
                url: '/login2',
                templateUrl: 'app/login/login2.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('medico', {
                url: '/medico',
                templateUrl: 'app/main/medico/medico.html',
                controller: 'MedicoController',
                controllerAs: 'vm',
                parent: 'main'
            })
            .state('medicocadastro', {
                url: '/medico/cadastro',
                templateUrl: 'app/main/medico/cadastro.html',
                controller: 'MedicoController',
                controllerAs: 'vm',
                parent: 'main'
            })
            .state('paciente', {
                url: '/paciente',
                templateUrl: 'app/main/paciente/paciente.html',
                controller: 'PacienteController',
                controllerAs: 'vm',
                parent: 'main'
            })
            .state('pacientecadastro', {
                url: '/paciente/cadastro',
                templateUrl: 'app/main/paciente/cadastro.html',
                controller: 'PacienteController',
                controllerAs: 'vm',
                parent: 'main'
            })
            .state('calendar', {
                url: '/calendar',
                templateUrl: 'app/main/agenda/calendar.html',
                controller: 'CalendarController',
                controllerAs: 'vm',
                parent: 'main'
            })
            .state('usuario', {
                url: '/usuario',
                templateUrl: 'app/main/usuario/usuario.html',
                controller: 'UsuarioController',
                controllerAs: 'vm',
                parent: 'main'
            })
            .state('usuariocadastro', {
                url: '/usuario/cadastro',
                templateUrl: 'app/main/usuario/cadastro.html',
                controller: 'UsuarioController',
                controllerAs: 'vm',
                parent: 'main'
            })
            .state('grupousuario', {
                url: '/grupousuario',
                templateUrl: 'app/main/grupousuario/grupousuario.html',
                controller: 'GrupoUsuarioController',
                controllerAs: 'vm',
                parent: 'main'
            })
            .state('grupousuariocadastro', {
                url: '/grupousuario/cadastro',
                templateUrl: 'app/main/grupousuario/cadastro.html',
                controller: 'GrupoUsuarioController',
                controllerAs: 'vm',
                parent: 'main'
            })
            .state('tipoagendamento', {
                url: '/tipoagendamento',
                templateUrl: 'app/main/tipoagendamento/tipoagendamento.html',
                controller: 'TipoAgendamentoController',
                controllerAs: 'vm',
                parent: 'main'
            })
            .state('tipoagendamentocadastro', {
                url: '/tipoagendamento/cadastro',
                templateUrl: 'app/main/tipoagendamento/cadastro.html',
                controller: 'TipoAgendamentoController',
                controllerAs: 'vm',
                parent: 'main'
            })
            .state('procedimento', {
                url: '/procedimento',
                templateUrl: 'app/main/procedimento/procedimento.html',
                controller: 'ProcedimentoController',
                controllerAs: 'vm',
                parent: 'main'
            })
            .state('procedimentocadastro', {
                url: '/procedimento/cadastro',
                templateUrl: 'app/main/procedimento/cadastro.html',
                controller: 'ProcedimentoController',
                controllerAs: 'vm',
                parent: 'main'
            });

        $urlRouterProvider.otherwise('/login');
    }

})();
