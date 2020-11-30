const path = require('path');
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@sass": path.resolve(__dirname, 'src/assets/sass'),
                "@components": path.resolve(__dirname, 'src/components'),
            }
        }
    }
}
