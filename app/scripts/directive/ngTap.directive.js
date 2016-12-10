angular.module('worker').directive('ngTap', function() {
    return function(scope, element, attrs) {
        var tapping = false;

        element.bind('touchstart', function(e) {
            element.addClass('tap-active');
            tapping = true;
        });
        element.bind('touchmove', function(e) {
            element.removeClass('tap-active');
            tapping = false;
        });
        element.bind('touchend', function(e) {
            event.preventDefault();
            event.stopPropagation();
            element.removeClass('tap-active');
            if (tapping) {
                scope.$apply(attrs['ngTap']);
            }
        });
    };
});
