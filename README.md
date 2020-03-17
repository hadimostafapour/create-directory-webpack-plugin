Webpack create directory plugin.

Installation
```bash
npm install create-directory-webpack-plugin --save-dev
```

Sample Usage
```javascript
import CreateDirectoryPlugin from 'create-directory-webpack-plugin';

...
plugins: [
  new CreateDirectoryPlugin({
          directories: [
              resolve(config.directory.build, config.build.data)
          ]
      })
]
...
```
