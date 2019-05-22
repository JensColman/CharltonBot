// Speelt muziek af.
const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};

module.exports = message => {
    const VoiceChannel =  message.guild.channels.find(channel => channel.id === '580791585021755408');
    var song = message.content.split(' ');
    var url = song[1];

    if (!url) {
        return message.reply(' Please add the Youtube link of your song after the !play command, divided with a space.');
    }
    
    if (VoiceChannel != null) {
        // console.log(`${VoiceChannel.name} was found and is a ${VoiceChannel.type} channel.`);
        VoiceChannel.join()
        .then(connection => {
            // console.log('Bot joined the channel.'); 
            const stream = ytdl(url, {filter: 'audioonly'});
            const dispatcher = connection.playStream(stream, streamOptions);

            dispatcher.on('end', () => {
                VoiceChannel.leave();
            })
        })
        .catch();
    } 
};