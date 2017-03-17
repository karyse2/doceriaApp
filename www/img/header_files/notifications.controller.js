(function () {
    'use strict';

    angular
        .module('devionnAdmin')
        .controller('NotificationsController', NotificationsController);

    /** @ngInject */
    function NotificationsController($scope) {

        $scope.notificacoes = [
            {
                titulo: 'Notificação'
            },
            {
                titulo: 'Notificação'
            },
            {
                titulo: 'Notificação'
            },
            {
                titulo: 'Notificação'
            },
            {
                titulo: 'Notificação'
            }
        ];
    };

})();
