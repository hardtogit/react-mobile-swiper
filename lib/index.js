'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var styles = _interopRequireWildcard(_style);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by XR on 2017/12/21 0021.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Use auto
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * email 413401168@qq.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
/**
 * Created by xiangguo .
 * time:2017/12/18 0020.
 * email:413401168@qq.com.
 * use:auto...
 */


var Index = function (_Component) {
    _inherits(Index, _Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.clientWidth = document.body.clientWidth;
        _this.startX = 0;
        _this.timerOut = 0;
        _this.distances = 0;
        _this.timer = 0;
        _this.scale = 0;
        _this.slides = 0;

        _this.handleTouchStart = function (e) {
            var $this = _this;
            if (_this.props.autoPlay) {
                clearInterval(_this.timer);
            }
            if (_this.props.loop) {
                if (_this.state.index == _this.slides - 1) {
                    clearInterval(_this.timerOut);
                    _this.setState({
                        styles: {
                            translateX: -($this.state.index + $this.slides) * _this.clientWidth * (_this.props.width + (1 - _this.props.width) / 4) + _this.clientWidth * (1 - _this.props.width) / 4,
                            duration: 0
                        },
                        index: $this.state.index + $this.slides
                    });
                    _this.distances = -($this.state.index + $this.slides) * _this.clientWidth * (_this.props.width + (1 - _this.props.width) / 4) + _this.clientWidth * (1 - _this.props.width) / 4;
                } else if (_this.state.index == _this.slides + $this.slides) {
                    clearInterval(_this.timerOut);
                    _this.setState({
                        styles: {
                            translateX: -($this.state.index - $this.slides) * _this.clientWidth * (_this.props.width + (1 - _this.props.width) / 4) + _this.clientWidth * (1 - _this.props.width) / 4,
                            duration: 0
                        },
                        index: $this.state.index - $this.slides
                    });
                    _this.distances = -($this.state.index - $this.slides) * _this.clientWidth * (_this.props.width + (1 - _this.props.width) / 4) + _this.clientWidth * (1 - _this.props.width) / 4;
                } else {
                    _this.setState({
                        styles: {
                            duration: 0
                        }
                    });
                    _this.distances = _this.state.styles.translateX;
                }
            } else {
                _this.setState({
                    styles: {
                        duration: 0
                    }
                });
                _this.distances = _this.state.styles.translateX;
            }
            _this.startX = e.touches[0].pageX;

            e.preventDefault();
        };

        _this.handleTouchMove = function (e) {
            var distance = e.touches[0].pageX - _this.startX;
            _this.scale = Math.abs(0.2 * distance / _this.clientWidth * (_this.props.width + (1 - _this.props.width) / 4));
            if (!_this.props.loop) {
                if (_this.distances + distance > 0) {
                    if (distance > 0) {
                        distance = Math.sqrt(distance);
                    } else {
                        distance = -Math.sqrt(-distance);
                    }
                } else if (_this.distances + distance < -_this.clientWidth * (_this.props.width + (1 - _this.props.width) / 4) * (_this.slides - 1 - (1 - _this.props.width) / 4)) {
                    if (distance > 0) {
                        distance = Math.sqrt(distance);
                    } else {
                        distance = -Math.sqrt(-distance);
                    }
                }
            }
            _this.setState({
                styles: {
                    translateX: _this.distances + distance
                }
            });
        };

        _this.handleTouchEnd = function (e) {
            _this.scale = 0;
            if (_this.props.autoPlay) {
                _this.timer = setInterval(function () {
                    _this.next();
                }, _this.props.interval);
            }
            var distance = e.changedTouches[0].pageX - _this.startX;
            _this.distances = _this.distances + distance;
            if (distance > _this.props.distance) {
                if (_this.state.index <= 0 && !_this.props.loop) {
                    _this.back();
                } else {
                    _this.pre();
                }
            } else if (distance < -_this.props.distance) {
                if (_this.state.index >= _this.slides - 1 && !_this.props.loop) {
                    _this.back();
                } else {
                    _this.next();
                }
            } else {
                _this.back();
            }
        };

        _this.setMyState = function (index) {
            _this.setState({
                styles: {
                    translateX: -index * _this.clientWidth * (_this.props.width + (1 - _this.props.width) / 4) + _this.clientWidth * (1 - _this.props.width) / 4,
                    duration: .5
                },
                index: index
            });
        };

        _this.pre = function () {
            var $this = _this;
            if (_this.props.loop) {
                if (_this.state.index == _this.slides && _this.props.autoPlay) {
                    _this.setMyState(_this.state.index - 1);
                    _this.timerOut = setTimeout(function () {
                        $this.setState(function (_ref) {
                            var index = _ref.index;
                            return {
                                styles: {
                                    duration: 0,
                                    translateX: -(index + _this.slides) * _this.clientWidth * (_this.props.width + (1 - _this.props.width) / 4) + _this.clientWidth * (1 - _this.props.width) / 4
                                },
                                index: index + _this.slides
                            };
                        });
                    }, _this.props.duration * 1000);
                } else {
                    _this.setMyState(_this.state.index - 1);
                }
            } else {
                if (_this.state.index <= 0) {
                    _this.setMyState(_this.slides - 1);
                } else {
                    _this.setMyState(_this.state.index - 1);
                }
            }
        };

        _this.next = function () {
            var $this = _this;
            if (_this.props.loop) {
                if (_this.state.index == _this.slides * 2 && _this.props.autoPlay) {
                    _this.setMyState(_this.state.index + 1);
                    _this.timerOut = setTimeout(function () {
                        $this.setState(function (_ref2) {
                            var index = _ref2.index;
                            return {
                                styles: {
                                    duration: 0,
                                    translateX: -(index - _this.slides) * _this.clientWidth * (_this.props.width + (1 - _this.props.width) / 4) + _this.clientWidth * (1 - _this.props.width) / 4
                                },
                                index: index - _this.slides
                            };
                        });
                    }, _this.props.duration * 1000);
                } else {
                    _this.setMyState(_this.state.index + 1);
                }
            } else {
                if (_this.state.index >= _this.slides - 1) {
                    _this.setMyState(0);
                } else {
                    _this.setMyState(_this.state.index + 1);
                }
            }
        };

        _this.back = function () {
            _this.setMyState(_this.state.index);
        };

        _this.state = {
            styles: {
                translateX: _this.props.loop && -(_this.props.index + _this.props.children.length) * _this.clientWidth * (_this.props.width + (1 - _this.props.width) / 4) + _this.clientWidth * (1 - _this.props.width) / 4 || -_this.props.index * _this.clientWidth * (_this.props.width + (1 - _this.props.width) / 4) + _this.clientWidth * (1 - _this.props.width) / 4,
                duration: _this.props.duration

            },
            index: _this.props.loop && _this.props.index + _this.props.children.length || _this.props.index
        };
        return _this;
    }

    _createClass(Index, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var length = this.props.children.length;
            this.slides = length;
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
        key: 'render',
        value: function render() {
            var _this3 = this;

            var children = this.props.children;

            var slide_style = {
                width: this.clientWidth * this.props.width + "px",
                marginLeft: this.clientWidth * (1 - this.props.width) / 4 + "px",
                transform: this.props.type == "card" ? "scale(1," + (this.props.width + this.scale) + ")" : '',
                transitionDuration: this.state.styles.duration + "s"
            };
            var slide_style_active = {
                width: this.clientWidth * this.props.width + "px",
                marginLeft: this.clientWidth * (1 - this.props.width) / 4 + "px",
                transform: this.props.type == "card" ? "scale(1," + (1 - this.scale) + ")" : "",
                transitionDuration: this.state.styles.duration + "s"
            };
            var wrapper_style = {
                transitionDuration: this.state.styles.duration + "s",
                transform: "translate3d(" + this.state.styles.translateX + "px, 0px, 0px)"
            };
            Object.assign(wrapper_style, styles.swiper_wrapper);
            Object.assign(slide_style, styles.swiper_slide);
            Object.assign(slide_style_active, styles.swiper_slide);
            var sliderDom = [];
            var j = 1;
            if (this.props.loop) {
                j = 3;
            }
            for (var k = 0; k < j; k++) {
                children.map(function (item, i) {
                    sliderDom.push(_react2.default.createElement(
                        'div',
                        { key: 10 * i + k, className: 'swiper-slide', style: _this3.state.index % children.length == i && slide_style_active || slide_style },
                        item
                    ));
                });
            }

            return _react2.default.createElement(
                'div',
                { className: 'swiper-container', style: styles.swiper_container, ref: 'swiper', onTouchStart: this.handleTouchStart, onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd },
                _react2.default.createElement(
                    'div',
                    { className: 'swiper-wrapper', style: wrapper_style },
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

Index.propTypes = {
    index: _propTypes2.default.number, //初始值
    duration: _propTypes2.default.number, //动画完成周期
    distance: _propTypes2.default.number, //触发的距离
    loop: _propTypes2.default.bool, //是否循环播放
    width: _propTypes2.default.number, //0~1,1表示100%
    autoPlay: _propTypes2.default.bool, //是否自动播放
    interval: _propTypes2.default.number, //轮播间隔秒数
    type: _propTypes2.default.string, //轮播类型 default 默认   card 卡片轮播
    pagination: _propTypes2.default.bool //是否显示分页
};
Index.defaultProps = {
    index: 0,
    duration: 0.5,
    distance: 100,
    loop: false,
    width: 1,
    autoPlay: false,
    interval: 3000,
    type: 'default',
    pagination: true
};
exports.default = Index;