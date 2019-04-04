'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _animateTypes = require('./animateTypes');

var animateTypess = _interopRequireWildcard(_animateTypes);

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (animateTypes, stage, progress, duration) {
    switch (animateTypes) {
        case animateTypess.DEFAULT:
            switch (stage) {
                case 'pre':
                    return {
                        transform: 'translateX(' + -(_utils.clientWidth + progress) + 'px)',
                        transitionDuration: duration + 's'
                    };
                case 'active':
                    return {
                        transform: 'translateX(' + -progress + 'px)',
                        transitionDuration: duration + "s"
                    };
                case 'next':
                    return {
                        transform: 'translateX(' + (_utils.clientWidth - progress) + 'px)',
                        transitionDuration: duration + "s"
                    };
            }
            break;
        case animateTypess.ROLL:
            switch (stage) {
                case 'pre':
                    return {
                        transform: 'rotateY(' + (progress / _utils.clientWidth * 90 + 90) + 'deg)',
                        transformOrigin: 'center center ' + _utils.clientWidth / 2 + 'px',
                        transitionDuration: duration + 's',
                        zIndex: progress > 0 ? 1 : 3
                    };
                case 'active':
                    return {
                        transform: 'rotateY(' + progress / _utils.clientWidth * 90 + 'deg)',
                        transformOrigin: 'center center ' + _utils.clientWidth / 2 + 'px',
                        transitionDuration: duration + 's',
                        zIndex: 2
                    };
                case 'next':
                    return {
                        transform: 'rotateY(' + (progress / _utils.clientWidth * 90 - 90) + 'deg)',
                        transformOrigin: 'center center ' + _utils.clientWidth / 2 + 'px',
                        transitionDuration: duration + 's',
                        zIndex: progress > 0 ? 3 : 1
                    };
            }
            break;
        case animateTypess.CARD:
            switch (stage) {
                case 'pre':
                    return {
                        width: '80%',
                        left: '10%',
                        transform: 'translateX(' + -(_utils.clientWidth * 0.85 + progress) + 'px) scaleY(' + (0.8 + Math.abs(progress / (_utils.clientWidth * 0.85) * 0.2)) + ')',
                        transitionDuration: duration + 's',
                        zIndex: 2
                    };
                case 'active':
                    return {
                        width: '80%',
                        left: '10%',
                        transform: 'translateX(' + -progress + 'px) scaleY(' + (1 - Math.abs(progress / (_utils.clientWidth * 0.85) * 0.2)) + ')',
                        transitionDuration: duration + 's',
                        zIndex: 3
                    };
                case 'next':
                    return {
                        width: '80%',
                        left: '10%',
                        transform: 'translateX(' + (_utils.clientWidth * 0.85 - progress) + 'px) scaleY(' + (0.8 + Math.abs(progress / (_utils.clientWidth * 0.85) * 0.2)) + ')',
                        transitionDuration: duration + "s",
                        zIndex: 1
                    };
                case 'prePro':
                    return {
                        width: '80%',
                        left: '10%',
                        transform: 'translateX(' + (-(_utils.clientWidth * 1.7) - progress) + 'px) scaleY(' + (1 - Math.abs(progress / (_utils.clientWidth * 0.85) * 0.2)) + ')',
                        transitionDuration: duration + "s",
                        zIndex: 1
                    };
                case 'nextPro':
                    return {
                        width: '80%',
                        left: '10%',
                        transform: 'translateX(' + (_utils.clientWidth * 1.7 - progress) + 'px) scaleY(' + (1 - Math.abs(progress / (_utils.clientWidth * 0.85) * 0.2)) + ')',
                        transitionDuration: duration + "s",
                        zIndex: 1
                    };
            }
            break;
        default:
            break;

    }
};