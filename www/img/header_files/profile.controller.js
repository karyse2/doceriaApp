(function () {
    'use strict';

    angular
        .module('devionnAdmin')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController($scope, $location) {
        $scope.agenda_vazia = false;

        $scope.agenda = [
            {
                titulo: "Cirurgia: Ana Gabriela",
                horario: "14:30",
                descricao: "Cirurgia para correção de imperfeições no nariz.",
                dia: 14,
                mes: "DEZEMBRO"
            },
            {
                titulo: "Reunião com equipe de cirurgias plásticas",
                horario: "09:15",
                descricao: "Reunião para definir a melhor forma de aplicar os novos padrões de procedimento.",
                dia: 23,
                mes: "DEZEMBRO"
            }
        ]

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

    };

})();
