module.exports = {
    apps: [
        {
            name: "Discord-Redditor",
            script: "./index.js",
            watch: true,
            cron_restart: "5 0 * * *",
            env: {
                "NODE_ENV": "development",
                "TOKEN": "bla bla",
                "api_secret": "bla bla",
                "CHANNELID": "586636934005260483"
            }
        }
    ]
}
