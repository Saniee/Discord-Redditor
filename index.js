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

var NewPostEmbed = new Discord.MessageEmbed()
    .setAuthor(post.data.author)
    .setTitle(post.data.title)
    .setImage(post.data.url)
    .setTimestamp()
    .setFooter('Automated Message by Discord-Redditor!')

snooper.watcher.getPostWatcher('dankmemes')
    .on('post', function(post) {
        console.log(`Post Posted by: ${post.data.author}`)
        console.log(post)
        message.channel.send(NewPostEmbed)
    })
    .on('error', console.error)  


client.login(process.env.TOKEN)