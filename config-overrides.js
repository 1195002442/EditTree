const {override, addLessLoader, fixBabelImports,addBabelPlugin, addBabelPlugins, useBabelRc} = require('customize-cra');
module.exports = override(
    addLessLoader({
    // strictMath: true,
    // noIeCompat: true,
    // javascriptEnabled: true,
    // modifyVars: { "@primary-color": "#1DA570" }
    }),
    fixBabelImports('import', { libraryName: 'antd', libraryDirectory: 'es', style: true }),
    
    addBabelPlugin(["@babel/plugin-proposal-decorators", {"legacy": true}]),
    
    // ...addBabelPlugins(
    //  ["@babel/plugin-proposal-decorators", {"legacy": true}]
    // ),
    // useBabelRc(),
);
     