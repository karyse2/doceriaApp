(function () {
    'use strict';

    angular.module('devionnAdmin')
        .directive('menuLink', MenuLink);

    /** @ngInject */
    function MenuLink() {
        return {
            scope: {
                pagina: "="
            },
            transclude: true,
            templateUrl: "app/components/menulink/menulink.html",
            link: function (scope, t) {
                
                scope.isSelected = function () {
                    return scope.pagina.selecionada;
                }
                scope.focusSection = function () {
                    scope.pagina.selecionada = !scope.pagina.selecionada;
                }
            }
        }
    }
})();
