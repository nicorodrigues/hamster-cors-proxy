module.exports = {
    apps : [{
        name: "Cors Proxy",
        script: "./server.js",
        env: {
            NODE_ENV: "production",
        },
        watch: true,
        ignore_watch: ['node_modules'],
    }]
}