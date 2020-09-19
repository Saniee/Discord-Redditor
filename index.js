const Discord = require('discord.js');
const Snooper = require('reddit-snooper')
const got = require('got');
const FileType = require('file-type');

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
    client.user.setActivity('/r/factorio', {type: 'WATCHING'})
});

snooper.watcher.getPostWatcher('factorio')
    .on('post', function(post) {
        sendEmbed(post, client)
    })
    .on('error', console.error)  

async function sendEmbed(post, client) {
    var NewPostNoMedia = new Discord.MessageEmbed()
        .setAuthor(`Author: ${post.data.author}`)
        .setTitle(post.data.title)
        .setDescription(post.data.selftext)
        .setImage(post.data.url)
        .setURL(`https://www.reddit.com${post.data.permalink}`)
        .setTimestamp()
        .setFooter('Automated Message by Discord-Redditor!')
    var NewPostMedia = new Discord.MessageEmbed()
        .setAuthor(`Author: ${post.data.author}`)
        .setTitle(post.data.title)
        .setDescription(`${post.data.url}`, post.data.selftext)
        .setThumbnail(post.data.thumbnail)
        .setURL(`https://www.reddit.com${post.data.permalink}`)
        .setTimestamp()
        .setFooter('Automated Message by Discord-Redditor!')
    var NewPostRedditGallery = new Discord.MessageEmbed()
        .setAuthor(`Author: ${post.data.author}`)
        .setTitle(post.data.title)
        .setDescription(post.data.selftext, `${post.data.url}`)
        .setThumbnail(post.data.thumbnail)
        .setURL(`https://www.reddit.com${post.data.permalink}`)
        .setTimestamp()
        .setFooter('Automated Message by Discord-Redditor!')
    console.log(`New post! By ${post.data.author}`)
    console.log(post)

    if (post.data.media == null) {
        await media(got, FileType);
    } else {
        client.channels.cache.get(`${process.env.CHANNELID}`).send(NewPostMedia);
    }

    //client.channels.cache.get(`${process.env.CHANNELID}`).send(NewPostRedditGallery);

    const url = `${post.data.url}`;
 
    async function media(got, FileType) {
        const stream = got.stream(url);
    
        var file = await FileType.fromStream(stream);
        if (file.ext == "jpg" || file.ext == "png") {
            try {
                client.channels.cache.get(`${process.env.CHANNELID}`).send(NewPostNoMedia); 
            } catch (error) {
                console.log(error);
            }
        }
    }
}

client.login(process.env.TOKEN)