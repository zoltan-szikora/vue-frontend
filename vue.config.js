module.exports = {
  configureWebpack: {
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' },
      port: 4200,
      watchOptions: {
        poll: true
      }
    }
  }
}
