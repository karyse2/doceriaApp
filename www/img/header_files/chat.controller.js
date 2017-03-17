(function () {
    'use strict';

    angular
        .module('devionnAdmin')
        .controller('ChatController', ChatController);

    /** @ngInject */
    function ChatController($scope) {

        $scope.usuarios = [
            {
                imgperfil: '/assets/images/perfil/profile-img3.jpg',
                nome: 'Jhon Doe',
                status: 'avaliable',
                ultimamsg: 'Reunião para definir a...',
                envioUltimaMsg: '09:35',
                msgsNaoLidas: 5
            },
            {
                imgperfil: '/assets/images/perfil/profile-img4.jpg',
                nome: 'Ana Silva',
                status: 'busy',
                ultimamsg: 'Reunião para definir a...',
                envioUltimaMsg: 'ONTEM',
                msgsNaoLidas: 0
            },
            {
                imgperfil: '/assets/images/perfil/profile-img.jpg',
                nome: 'Paulo Roberto',
                status: 'invisible',
                ultimamsg: 'Reunião para definir a...',
                envioUltimaMsg: '05/09/2016',
                msgsNaoLidas: 0
            }
        ];

        $scope.sair = function() {
            $location.path('/login');
        }

        $scope.removerCompromisso = function(compromisso) {
            var index = $scope.agenda.indexOf(compromisso);
            $scope.agenda.splice(index, 1);

            if ($scope.agenda.length==0) {
                $scope.agenda_vazia = true;
            }
        }

        $scope.chatcontato = {
            nome: '',
            imgperfil: ''
        }

        $scope.abrirChat = function (contato) {
            $scope.chatcontato.nome = contato.nome;
            $scope.chatcontato.imgperfil = contato.imgperfil;

            angular.element(document.querySelector('#listacontatos')).toggleClass('lista-contatos-hide');
            angular.element(document.querySelector('#chatcontato')).toggleClass('chat-contato-show');
        }

        $scope.fecharchat = function() {
            angular.element(document.querySelector('#listacontatos')).toggleClass('lista-contatos-hide');
            angular.element(document.querySelector('#chatcontato')).toggleClass('chat-contato-show');
        }

    };

})();
