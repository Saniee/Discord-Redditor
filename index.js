const Discord = require('discord.js');
const Snooper = require('reddit-snooper')

const client = new Discord.Client();

snooper = new Snooper(
    {
        app_id: 'bdLPs7vNHCpD5w',
        api_secret: `${process.env.api_secret}`,
        automatic_retries: true, 
        api_requests_per_minuite: 60
    })

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

snooper.watcher.getPostWatcher('factorio')
    .on('post', function(post) {
        sendEmbed(post, client)
    })
    .on('error', console.error)  

function sendEmbed(post, client) {
    var NewPostEmbed = new Discord.MessageEmbed()
        .setAuthor(`Author: ${post.data.author}`)
        .setTitle(post.data.title)
        .setDescription(post.data.selftext)
        .setImage(post.data.url)
        .setURL(`https://www.reddit.com${post.data.permalink}`)
        .setTimestamp()
        .setFooter('Automated Message by Discord-Redditor!')
    console.log(`New post! By ${post.data.author}`)
    console.log(post)
    client.channels.cache.get(`${process.env.CHANNELID}`).send(NewPostEmbed);
}

client.login(process.env.TOKEN)