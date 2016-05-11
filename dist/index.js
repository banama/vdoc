'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Vdoc;

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _process = require('./process');

var _process2 = _interopRequireDefault(_process);

var _vwm = require('./vwm');

var _vwm2 = _interopRequireDefault(_vwm);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Vdoc(options) {
    (0, _init2.default)(this);
    !!options && (0, _utils.mergeData)(this, options);
    this.register();
}

(0, _api2.default)(Vdoc);
(0, _process2.default)(Vdoc);
(0, _vwm2.default)(Vdoc);
(0, _cache2.default)(Vdoc);