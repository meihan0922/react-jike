const path = require("path");
const { whenProd, getPlugin, pluginByName } = require("@craco/craco");
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    // 配置CDN
    // configure: (webpackConfig) => {
    //   const cdn = {
    //     js: [
    //       // 放置cdn資源的地址
    //     ],
    //   };
    //   whenProd(() => {
    //     // key - 要用cdn的包名（對應dependecies中的key名稱
    //     // value - cdn中預備掛載於全局的變量名稱，替換開發環境的
    //     webpackConfig.externals = {
    //       react: "React",
    //       "react-dom": "React-DOM",
    //     };
    //   });
    //   // HtmlWebpackPlugin 插件 為 public/index.html 注入 cdn資源的url
    //   const { isFound, match } = getPlugin(
    //     webpackConfig,
    //     pluginByName("HtmlWebpackPlugin")
    //   );
    //   // 如果有 HtmlWebpackPlugin 插件
    //   if (isFound) {
    //     match.userOptions.cdn = cdn;
    //   }

    //   return webpackConfig;
    // },
  },
};
