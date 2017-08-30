'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.memoryStore = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _jsonStringifySafe = require('json-stringify-safe');

var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MemoryStore = function () {
    function MemoryStore() {
        (0, _classCallCheck3.default)(this, MemoryStore);

        this._memstore = {};
    }

    (0, _createClass3.default)(MemoryStore, [{
        key: 'map',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(cb) {
                var self;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (_.isFunction(cb)) {
                                    _context.next = 2;
                                    break;
                                }

                                throw new Error('请输入函数类型的参数');

                            case 2:
                                self = this;
                                return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                                    (0, _setImmediate3.default)(function () {
                                        try {
                                            var result = void 0,
                                                mappingArr = new Array();
                                            _.forEach(self._memstore, function (v, k) {
                                                result = cb(v, k);
                                                if (!_.isUndefined(result)) mappingArr.push(result);
                                            });
                                            resolve(mappingArr);
                                        } catch (e) {
                                            reject(e);
                                        }
                                    });
                                }));

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function map(_x) {
                return _ref.apply(this, arguments);
            }

            return map;
        }()
    }, {
        key: 'set',
        value: function set(key) {
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            if (!checkKey(key)) throw new Error('Key的类型 只能为字符或者数字');
            this._memstore[key] = value;
            return this;
        }
    }, {
        key: 'get',
        value: function get(key) {
            if (!checkKey(key)) throw new Error('Key的类型 只能为字符或者数字');
            return this._memstore[key];
        }
    }, {
        key: 'delete',
        value: function _delete(key) {
            if (!checkKey(key)) throw new Error('Key的类型 只能为字符或者数字');
            delete this._memstore[key];
            return this;
        }
    }, {
        key: 'flush',
        value: function flush() {
            this._memstore = {};
            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {
            return JSON.parse((0, _jsonStringifySafe2.default)(this._memstore));
        }
    }]);
    return MemoryStore;
}();

function checkKey(key) {
    return _.isString(key) && key || _.isNumber(key);
}
var memoryStore = new MemoryStore();
exports.memoryStore = memoryStore;
//# sourceMappingURL=memory-store.js.map