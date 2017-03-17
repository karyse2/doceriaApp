(function () {
    'use strict';

    angular.module('devionnAdmin')
        .directive("menuToggle", MenuToggle);


    function MenuToggle($timeout, $mdUtil) {
        return {
            scope: {
                menu: "="
            },
            transclude: false,
            templateUrl: "app/components/menutoggle/menutoggle.html",
            link: function (scope, n) {
                scope.isOpen = function () {
                    return scope.menu.aberto;
                }
                scope.toggle = function () {
                    scope.menu.aberto = !scope.menu.aberto;
                }
                $mdUtil.nextTick(function () {
                    scope.$watch(function () {
                        return scope.isOpen(scope.menu)
                    },
                    function (a) {
                        $mdUtil.nextTick(function () {
                            function o() {
                                var e;
                                return l.addClass("no-transition"), l.css("height", ""), e = l.prop("clientHeight"), l.css("height", 0), l.removeClass("no-transition"), e;
                            }
                            var l = n.find("ul"),
                                i = l[0].querySelector("a.active"),
                                s = document.querySelector(".admin-menu").parentNode,
                                r = a ? o() : 0;

                            $timeout(function () {
                                l.css({
                                    height: r + "px"
                                });
                                a && i && i.offsetParent && 0 === l[0].scrollTop && $timeout(function () {
                                    var e = i.scrollHeight,
                                        a = i.offsetTop,
                                        n = i.offsetParent.offsetTop,
                                        o = 2 * e,
                                        l = a + n - o;
                                    $mdUtil.animateScrollTo(s, l)
                                }, 350, !1)
                            }, 0, !1)
                        }, !1)
                    })
                });
                var l = n[0].parentNode.parentNode.parentNode;
                if (l.classList.contains("parent-list-item")) {
                    var i = l.querySelector("h2");
                    n[0].firstChild.setAttribute("aria-describedby", i.id)
                }
            }
        }
    }
})();
