const Discord = require('discord.js');
const Snooper = require('reddit-snooper')

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

snooper = new Snooper(
{
    app_id: 'bdLPs7vNHCpD5w',
    api_secret: `${process.env.api_secret}`,
    automatic_retries: true, 
    api_requests_per_minuite: 60
})

var on = new Boolean(true)

while (on) {
    snooper.watcher.getPostWatcher('r/dankmemes')
    .on('post', function(post) {
        console.log(`Post Posted by: ${post.data.author}`)
        console.log(post)
    })
    .on('error', console.error)  
}

client.login(process.env.TOKEN)