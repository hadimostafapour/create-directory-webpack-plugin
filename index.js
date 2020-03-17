"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require('fs');

var path = require('path');

var CreateDirectoriesWebpackPlugin =
    /*#__PURE__*/
    function () {
        function CreateDirectoriesWebpackPlugin(options) {
            _classCallCheck(this, CreateDirectoriesWebpackPlugin);

            _defineProperty(this, "options", void 0);

            if (!options || !options.directories) throw new Error('options and options.dirs must be specified');
            this.options = options;
        }

        _createClass(CreateDirectoriesWebpackPlugin, [{
            key: "_createDirectory",
            value: function _createDirectory(directoryPath) {
                var initDir = path.isAbsolute(directoryPath) ? path.sep : '';
                directoryPath.split(path.sep).reduce(function (parentDir, childDir) {
                    var currentDir = path.resolve(parentDir, childDir);

                    if (!fs.existsSync(currentDir)) {
                        fs.mkdirSync(currentDir);
                    }

                    return currentDir;
                }, initDir);
            }
        }, {
            key: "apply",
            value: function apply(compiler) {
                var _this = this;

                compiler.hooks.emit.tapAsync('CreateDirectoriesWebpackPlugin', function (compilation, callback) {
                    _this.options.directories.forEach(function (directory) {
                        _this._createDirectory(directory);
                    });

                    callback();
                });
            }
        }]);

        return CreateDirectoriesWebpackPlugin;
    }();

module.exports = CreateDirectoriesWebpackPlugin;
