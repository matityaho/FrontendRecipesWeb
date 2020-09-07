module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    host: "localhost",
  },
  
  // devServer:{
  //   proxy:{
  //     '/api':{"https://recipiesmayhay.herokuapp.com/" ,
  //     ws: true,
  //     changeOrigin: true
  //     }
  //   }
  // }
};
