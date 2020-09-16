module.exports = {
    apps: [
        {
            name: "Index",
            script: "./index.js",
            watch: true,
            env: {
                "NODE_ENV": "development",
                "TOKEN": "bla bla"
            }
        }
    ]
}
