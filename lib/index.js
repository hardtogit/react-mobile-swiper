'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _createStyle = require('./createStyle');

var _createStyle2 = _interopRequireDefault(_createStyle);

var _animateTypes = require('./animateTypes');

var animateTypes = _interopRequireWildcard(_animateTypes);

var _style = require('./style');

var styles = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by XR on 2017/12/21 0021.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Use auto
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * email 413401168@qq.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Index = function (_Component) {
    _inherits(Index, _Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.handleTouchStart = function (e) {
            _this.startX = e.touches[0].pageX;
            if (_this.props.autoPlay) {
                clearInterval(_this.timer);
            }
            if (_this.props.loop) {
                if (_this.state.index == _this.slides - 1) {
                    clearInterval(_this.timerOut);
                    _this.setState({
                        duration: 0,
                        index: _this.state.index + _this.slides
                    });
                } else if (_this.state.index == _this.slides + _this.slides) {
                    clearInterval(_this.timerOut);
                    _this.setState({
                        duration: 0,
                        index: _this.state.index - _this.slides
                    });
                } else {
                    _this.setState({
                        duration: 0
                    });
                }
            } else {
                _this.setState({
                    duration: 0
                });
            }
        };

        _this.handleTouchMove = function (e) {
            if (_this.props.loop) {
                _this.setState({
                    progress: _this.startX - e.touches[0].pageX
                });
            } else {
                if (_this.state.index === _this.slides - 1) {
                    if (_this.startX - e.touches[0].pageX < 0) {
                        _this.setState({
                            progress: _this.startX - e.touches[0].pageX
                        });
                    }
                } else if (_this.state.index === 0) {
                    if (_this.startX - e.touches[0].pageX > 0) {
                        _this.setState({
                            progress: _this.startX - e.touches[0].pageX
                        });
                    }
                } else {
                    _this.setState({
                        progress: _this.startX - e.touches[0].pageX
                    });
                }
            }
        };

        _this.handleTouchEnd = function () {
            if (_this.props.autoPlay) {
                _this.timer = setInterval(function () {
                    _this.next();
                }, _this.props.interval);
            }
            if (Math.abs(_this.state.progress) < _this.props.distance) {
                _this.back();
            } else {
                if (_this.state.progress < 0) {
                    if (_this.props.loop) {
                        _this.pre();
                    } else if (_this.state.index === 0) {
                        _this.back();
                    } else {
                        _this.pre();
                    }
                } else {
                    if (_this.props.loop) {
                        _this.next();
                    } else if (_this.state.index === _this.slides - 1) {
                        _this.back();
                    } else {
                        _this.next();
                    }
                }
            }
        };

        _this.setCurrentSlide = function (index) {
            _this.setState({
                duration: _this.props.duration,
                progress: 0,
                index: index
            }, function () {
                if (_this.props.onSlideChange && typeof _this.props.onSlideChange === "function") {
                    _this.props.onSlideChange(index % _this.slides);
                }
            });
        };

        _this.pre = function () {
            if (_this.props.loop) {
                if (_this.state.index === _this.slides && _this.props.autoPlay) {
                    _this.setCurrentSlide(_this.state.index - 1);
                    _this.timerOut = setTimeout(function () {
                        _this.setState({
                            duration: 0,
                            index: _this.state.index + _this.slides
                        });
                    }, _this.props.duration * 1000);
                } else {
                    _this.setCurrentSlide(_this.state.index - 1);
                }
            } else {
                if (_this.state.index <= 0) {
                    _this.setCurrentSlide(_this.slides - 1);
                } else {
                    _this.setCurrentSlide(_this.state.index - 1);
                }
            }
        };

        _this.next = function () {
            if (_this.props.loop) {
                if (_this.state.index == _this.slides * 2 && _this.props.autoPlay) {
                    _this.setCurrentSlide(_this.state.index + 1);
                    _this.timerOut = setTimeout(function () {
                        _this.setState({
                            duration: 0,
                            index: _this.state.index - _this.slides
                        });
                    }, _this.props.duration * 1000);
                } else {
                    _this.setCurrentSlide(_this.state.index + 1);
                }
            } else {
                if (_this.state.index >= _this.slides - 1) {
                    _this.setState({
                        duration: 0,
                        index: 0
                    });
                } else {
                    _this.setCurrentSlide(_this.state.index + 1);
                }
            }
        };

        _this.back = function () {
            _this.setCurrentSlide(_this.state.index);
        };

        _this.state = {
            duration: _this.props.duration,
            progress: 0,
            index: _this.props.loop && _this.props.index + _this.props.children.length || _this.props.index

        };
        _this.startX = 0;
        _this.timerOut = 0;
        _this.timer = 0;
        _this.slides = 0;
        return _this;
    }

    _createClass(Index, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.slides = this.props.children.length;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            if (this.props.autoPlay) {
                this.timer = setInterval(function () {
                    _this2.next();
                }, this.props.interval);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.timer);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                progress = _state.progress,
                duration = _state.duration,
                index = _state.index;
            var _props = this.props,
                children = _props.children,
                type = _props.type,
                typePro = _props.typePro,
                height = _props.height;

            var createStyleFactory = _createStyle2.default;
            if (this.props.createStyle && typeof _createStyle2.default === "function") {
                createStyleFactory = this.props.createStyle;
            }
            var slide_style_pre = _extends({}, styles.swiper_slide, createStyleFactory(type, 'pre', progress, duration));
            var slide_style_active = _extends({}, styles.swiper_slide, createStyleFactory(type, 'active', progress, duration));
            var slide_style_next = _extends({}, styles.swiper_slide, createStyleFactory(type, 'next', progress, duration));
            var slide_style_prePro = {};
            var slide_style_nextPro = {};
            if (typePro) {
                slide_style_prePro = _extends({}, styles.swiper_slide, createStyleFactory(type, 'prePro', progress, duration));
                slide_style_nextPro = _extends({}, styles.swiper_slide, createStyleFactory(type, 'nextPro', progress, duration));
            }

            var sliderDom = [];
            var j = 1;
            if (this.props.loop) {
                j = 3;
            }
            // console.log(index)
            if (children.map) {
                for (var k = 0; k < j; k++) {
                    children.map(function (item, i) {
                        sliderDom.push(_react2.default.createElement(
                            'div',
                            { key: 10 * k + i, className: 'swiper-slide',
                                style: function () {
                                    if (index === children.length * k + i) {
                                        return slide_style_active;
                                    } else if (index === children.length * k + i - 1) {
                                        return slide_style_next;
                                    } else if (index === children.length * k + i - 2) {
                                        if (typePro) {
                                            return slide_style_nextPro;
                                        } else {
                                            return { display: 'none' };
                                        }
                                    } else if (index === children.length * k + i + 1) {
                                        return slide_style_pre;
                                    } else if (index === children.length * k + i + 2) {
                                        if (typePro) {
                                            return slide_style_prePro;
                                        } else {
                                            return { display: 'none' };
                                        }
                                    } else {
                                        return { display: 'none' };
                                    }
                                }() },
                            item
                        ));
                    });
                }
            } else {
                sliderDom = _react2.default.createElement(
                    'div',
                    { className: 'swiper-slide', style: slide_style_active },
                    children
                );
            }

            return _react2.default.createElement(
                'div',
                { className: 'swiper-container',
                    style: _extends({}, styles.swiper_container, { height: height + 'px' }), ref: 'swiper',
                    onTouchStart: function onTouchStart(e) {
                        e.preventDefault();_this3.handleTouchStart(e);
                    },
                    onTouchMove: function onTouchMove(e) {
                        e.preventDefault();_this3.handleTouchMove(e);
                    },
                    onTouchEnd: function onTouchEnd(e) {
                        e.preventDefault();_this3.handleTouchEnd(e);
                    }
                },
                _react2.default.createElement(
                    'div',
                    { className: 'swiper-wrapper', style: styles.wrapper_style },
                    sliderDom
                ),
                this.props.pagination && _react2.default.createElement(
                    'div',
                    { className: 'swiper-pagination', style: styles.swiper_pagination },
                    function () {
                        var list = [];
                        for (var i = 0; i < _this3.slides; i++) {
                            list.push(_react2.default.createElement('span', { key: i, className: (0, _classnames2.default)(i == _this3.state.index % _this3.slides && "active", "pagination-item"), style: i == _this3.state.index % _this3.slides && styles.pagination_item_active || styles.pagination_item }));
                        }
                        return list;
                    }()
                ) || ""
            );
        }
    }]);

    return Index;
}(_react.Component);

Index.defaultProps = {
    index: 0,
    height: 200,
    duration: 0.5,
    distance: 150,
    loop: false,
    width: 1,
    autoPlay: false,
    interval: 3000,
    type: animateTypes.DEFAULT,
    typePro: false,
    pagination: true
};

Index.PropTypes = {
    index: _propTypes2.default.number, //初始值
    height: _propTypes2.default.oneOfType([//容器的高度
    _propTypes2.default.number, _propTypes2.default.string]).isRequired,
    duration: _propTypes2.default.number, //动画完成周期
    distance: _propTypes2.default.number, //触发的距离
    loop: _propTypes2.default.bool, //是否循环播放
    autoPlay: _propTypes2.default.bool, //是否自动播放
    interval: _propTypes2.default.number, //轮播间隔秒数
    type: _propTypes2.default.string, //轮播类型 默认支持animateType
    typePro: _propTypes2.default.bool,
    pagination: _propTypes2.default.bool, //是否显示分页
    onSlideChange: _propTypes2.default.func, //回调
    createStyle: _propTypes2.default.func //样式生成器，可自行传入
};
Index.animateTypes = animateTypes;
exports.default = Index;