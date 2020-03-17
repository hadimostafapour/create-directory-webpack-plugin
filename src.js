const fs = require('fs');
const path = require('path');

class CreateDirectoriesWebpackPlugin {

  options = null;

  constructor(options) {

    if (!options || !options.directories)
      throw new Error('options and options.dirs must be specified');

    this.options = options;
  }

  _createDirectory(directoryPath) {
    const initDir = path.isAbsolute(directoryPath) ? path.sep : '';
    directoryPath.split(path.sep).reduce((parentDir, childDir) => {
      const currentDir = path.resolve(parentDir, childDir);
      if (!fs.existsSync(currentDir)) {
        fs.mkdirSync(currentDir);
      }
      return currentDir;
    }, initDir);
  }

  apply(compiler) {

    compiler.hooks.emit.tapAsync(
      'CreateDirectoriesWebpackPlugin',
      (compilation, callback) => {

        this.options.directories.forEach((directory) => {
          this._createDirectory(directory);
        });

        callback();
      }
    );
  }
}

module.exports = CreateDirectoriesWebpackPlugin;
