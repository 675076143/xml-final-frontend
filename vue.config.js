// vue.config.js
// eslint-disable-next-line no-undef
module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    devServer: {
        // open: process.platform === 'darwin',
        // host: 'localhost',
        port: 8081,
        // open: true, //配置自动启动浏览器
        proxy: {
            '/': {
                target: 'http://localhost:8080', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/': ''
                }
            }
        }
    },
}
