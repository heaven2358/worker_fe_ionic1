angular.module('worker').directive('money', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<m>{{moneyStr}}<em ng-show="show">万</em><m>',
        scope: {
            'value': '='
        },
        link: function(scope, element, attrs) {
            scope.moneyStr = scope.value;

            if( window.tools.endsWith( scope.moneyStr, '万' ) ) {
                scope.moneyStr = scope.moneyStr.substr( 0, scope.moneyStr.length - 1 );
                scope.show = true;
            }
        }
    };
});
