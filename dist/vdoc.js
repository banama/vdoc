'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Vdoc;

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Vdoc(options) {
    this.configfile = './.vodc.vdoc';
    this._route = {};
    this.data = {};
    this.moutData = {};
}

(0, _init2.default)(Vdoc);
(0, _env2.default)(Vdoc);
(0, _util2.default)(Vdoc);