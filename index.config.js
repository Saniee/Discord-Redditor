module.exports = {
    apps: [
        {
            name: "Discord-Redditor",
            script: "./index.js",
            watch: true,
            env: {
                "NODE_ENV": "development",
                "TOKEN": "bla bla",
                "api_secret": "bla bla"
            }
        }
    ]
}
