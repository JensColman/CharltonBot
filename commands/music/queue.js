const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};

module.exports = message => {
    var queueList = new Map();
    const serverQueue = queueList.get(message.guild.id);
    const songInfo = ytdl.getInfo(url);
    const song = {
        title: songInfo.title,
        url: songInfo.video_url
    };
    console.log(songInfo.baseUrl);
    

    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };

        queueList.set(message.guild.id, queueConstruct);
        
        try {
            var connection = voiceChannel.join();
        } catch (error) {
            console.error(`I could not join the voice channel ${error}`);
        }
    } else {

    }
};