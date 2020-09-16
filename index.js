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

snooper.watcher.getPostWatcher('dankmemes')
    .on('post', function(post) {
        sendEmbed(post)
    })
    .on('error', console.error)  

function sendEmbed(post, Discord) {
    const channel = client.channels.cache.find(channel => channel.id === '586636934005260483')
    console.log(`New post! By ${post.data.author}`)
    var NewPostEmbed = new Discord.MessageEmbed()
        .setAuthor(post.data.author)
        .setTitle(post.data.title)
        .setImage(post.data.url)
        .setURL('https://www.reddit.com/r/factorio/')
        .setTimestamp()
        .setFooter('Automated Message by Discord-Redditor!')
    channel.send(NewPostEmbed);
}

client.login(process.env.TOKEN)