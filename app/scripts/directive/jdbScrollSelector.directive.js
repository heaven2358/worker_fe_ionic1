angular.module('worker')
    .directive('jdbScrollSelector', ['$timeout', function ($timeout) {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'views/directive/jdb-scroll-selector.html',
            scope: {
                items: "=",
                value: "=",
                innerCtl: "=",
                text: "=",
                defaultValue: "="
            },
            link: function (scope, element, attrs) {
                scope.title = attrs.title || '选择';
                var FONT_STYLE = "16px STHeiti";
                var FONT_COLOR = "#000000";
                var SELECTION_HEIGHT = 30;
                // var CONTAINER_WIDTH = 200;
                // var CONTAINER_HEIGHT = SELECTION_HEIGHT * 5;
                var SENSITIVITY = 0.7;
                var EXTRAOFFSET = 30;
                var SPEEDBUMP = 2;
                var dom = element[0];
                var innerCtl;
                var selectionArray = [];
                var minOffset, maxOffset;
                var Y, lastY, endY;
                var X, lastX, endX;
                var lastOffset, lastOffset2, lastOffset3;
                var stage, canvas;
                var offset = 0;
                var createjs = window.createjs;

                scope.init = function () {
                    innerCtl = initSelect();
                };
                scope.init();

                function initSelect() {
                    function initialSelections() {
                        minOffset = -(scope.items.length - 1) * SELECTION_HEIGHT;
                        maxOffset = 0;
                        for (var i = 0; i < scope.items.length; i++) {
                            initialSelection(scope.items[i].text, i);
                        }
                    }

                    function attachEvent() {
                        canvas.addEventListener('touchstart', touch, false);
                        canvas.addEventListener('touchmove', touch, false);
                        canvas.addEventListener('touchend', touch, false);
                    }

                    function initialSelection(text, order) {
                        var newSelection = new createjs.Text(text, FONT_STYLE, FONT_COLOR);
                        newSelection.maxWidth = 1000;
                        newSelection.textAlign = "center";
                        newSelection.textBaseline = "middle";
                        if (window.devicePixelRatio) {
                            newSelection.x = (canvas.width / 2) / window.devicePixelRatio;
                        }

                        newSelection.y = (order + 2.5) * SELECTION_HEIGHT + offset;
                        stage.addChild(newSelection);
                        selectionArray.push(newSelection);
                    }

                    function slide(speed) {
                        scope.handleTick = handleTick;
                        createjs.Ticker.addEventListener('tick', handleTick);

                        function handleTick(event) {
                            if (!event.paused) {
                                speed *= 0.9;
                                if ((offset > EXTRAOFFSET || offset < minOffset - EXTRAOFFSET) && Math.abs(speed) > SPEEDBUMP) {
                                    speed = speed / Math.abs(speed) * SPEEDBUMP;
                                }
                                offset += speed;
                                moveSelections(offset);
                                stage.update();
                                if (Math.abs(speed) < 0.1) {
                                    stop(handleTick);
                                    slideToEnd();
                                }
                            }
                        }
                    }

                    function slideToEnd() {
                        createjs.Ticker.addEventListener('tick', handleTick);
                        scope.handleTick = handleTick;
                        var target = Math.round(offset / SELECTION_HEIGHT) * SELECTION_HEIGHT;
                        if (target > maxOffset) {
                            target = maxOffset;
                        } else if (target < minOffset) {
                            target = minOffset;
                        }
                        var distance = (target - offset);
                        var sppedInterval = 0.1;
                        var bezierSpeed = bezier();
                        var slideTime = 0;
                        var tempOffset = offset;
                        if (offset < minOffset - EXTRAOFFSET || offset > EXTRAOFFSET) {
                            sppedInterval = 0.03;
                        }

                        function handleTick(event) {
                            if (!event.paused) {
                                slideTime += sppedInterval;
                                var tempDistance = distance * bezierSpeed(1 - slideTime);
                                offset = tempOffset + tempDistance;
                                if (slideTime >= 1) {
                                    offset = target;
                                    moveSelections(offset);
                                    if (offset % 30 != 0) {
                                        alert(offset);
                                    }
                                    stop(handleTick);
                                    return;
                                }
                                moveSelections(offset);
                                stage.update();
                            }
                        }
                    }

                    function moveSelections(offset) {
                        for (var i = 0; i < selectionArray.length; i++) {
                            selectionArray[i].y = offset + (i + 2.5) * SELECTION_HEIGHT;
                        }
                    }

                    function scroll() {
                        offset += ((Y - lastY) * SENSITIVITY);
                        if (offset > maxOffset + EXTRAOFFSET * 2) {
                            offset = maxOffset + EXTRAOFFSET * 2;
                        } else if (offset < minOffset - EXTRAOFFSET * 2) {
                            offset = minOffset - EXTRAOFFSET * 2;
                        }
                        moveSelections(offset);
                        stage.update();
                    }


                    function bezier(points) {
                        if (points == undefined) {
                            points = [
                                [1.0, 1.0],
                                [0.58, 1.0],
                                [0.0, 0.0],
                                [0.0, 0.0]
                            ];
                            return function (t) {
                                return interpolate(t, points)[0];
                            };
                        }

                        function interpolate(t, p) {
                            var order = p.length - 1; // curve order is number of control point - 1
                            var d = p[0].length; // control point dimensionality

                            // create a source vector array copy that will be
                            // used to store intermediate results
                            var v = p.map(function (point) {
                                return point.slice();
                            });
                            // for each order reduce the control point array by updating
                            // each control point with its linear interpolation to the next
                            for (var i = order; i > 0; i--) {
                                for (var j = 0; j < order; j++) {
                                    // interpolate each component
                                    for (var k = 0; k < d; k++) {
                                        v[j][k] = (1 - t) * v[j][k] + t * v[j + 1][k];
                                    }
                                }
                            }
                            return v[0];
                        }
                    }

                    function touch(event) {
                        event = event || window.event;
                        switch (event.type) {
                        case "touchstart":
                            {
                                X = event.touches[0].clientX;
                                Y = event.touches[0].clientY;
                                lastX = X;
                                lastY = Y;
                                lastOffset = lastOffset2 = lastOffset3 = 0;
                                stop(scope.handleTick);
                                // scrollStart();
                            }
                            break;
                        case "touchend":
                            {
                                endY = event.changedTouches[0].clientY;
                                endX = event.changedTouches[0].clientX;
                                var startSpeed = (lastOffset3 + lastOffset2 + lastOffset) / 3.0 * 2;
                                slide(startSpeed);
                            }
                            break;
                        case "touchmove":
                            {
                                event.preventDefault();
                                lastX = X;
                                lastY = Y;
                                X = event.touches[0].clientX;
                                Y = event.touches[0].clientY;
                                var xOffset = X - lastX;
                                var yOffset = Y - lastY;
                                if (yOffset == 0) {
                                    lastOffset = 0;
                                } else {
                                    lastOffset = (yOffset / Math.abs(yOffset)) * Math.sqrt(xOffset * xOffset + yOffset * yOffset);
                                }
                                // 保留最近两次的位移记录
                                lastOffset3 = lastOffset2;
                                lastOffset2 = lastOffset;
                                scroll();
                            }
                            break;
                        }
                    }

                    function resizeIfDPR() {
                        if (window.devicePixelRatio) {
                            // grab the width and height from canvas
                            var height = $(canvas).height();
                            var width = $(canvas).width();
                            // reset the canvas width and height with window.devicePixelRatio applied
                            canvas.setAttribute('width', Math.round(width * window.devicePixelRatio));
                            canvas.setAttribute('height', Math.round(height * window.devicePixelRatio));
                            // // force the canvas back to the original size using css
                            canvas.style.width = width + "px";
                            canvas.style.height = height + "px";
                            // set CreateJS to render scaled
                            stage.scaleX = stage.scaleY = window.devicePixelRatio;
                        }
                    }

                    function stop(fn) {
                        createjs.Ticker.removeEventListener('tick', fn);
                    }

                    function initial() {
                        canvas = $(dom).find(".item-container")[0];
                        // canvas.width = CONTAINER_WIDTH;
                        // canvas.height = CONTAINER_HEIGHT;
                        stage = new createjs.Stage(canvas);
                        createjs.Touch.enable(stage);
                        resizeIfDPR();
                        var delayTime = 0;
                        if (!window.requestAnimationFrame) {
                            delayTime = 400;
                        }

                        $timeout(function () {
                            initialSelections();
                            attachEvent();
                            createjs.Ticker.framerate = 60;
                            createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
                            stage.update();
                        }, delayTime);
                    }
                    $timeout(function () {
                        if (scope.value) {
                            initialOffset(scope.value);
                        } else {
                            initialOffset(scope.defaultValue);
                        }
                        initial();
                        scope.innerCtl = innerCtl;
                    });

                    function initialOffset(value) {
                        scope.innerCtl = innerCtl;
                        if (value == undefined) {
                            offset = 0;
                            return;
                        }
                        var index;
                        for (var i = 0; i < scope.items.length; i++) {
                            if (scope.items[i].value == value) {
                                index = i;
                                break;
                            }
                        }
                        offset = -index * SELECTION_HEIGHT;
                        scope.$apply();
                    }
                    return {
                        selectValue: function () {
                            var index = Math.floor(Math.abs(offset) / SELECTION_HEIGHT);
                            scope.value = scope.items[index].value;
                            scope.text = scope.items[index].text;
                        }
                    };
                }
            }
        };
    }]);
