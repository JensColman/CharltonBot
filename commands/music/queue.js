const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};

module.exports = message => {
    var queueList = new Map();
    const serverQueue = queueList.get(message.guild.id);

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
        
    }
};