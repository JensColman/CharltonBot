const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};

module.exports = message => {
    const voiceChannel =  message.guild.channels.find(channel => channel.id === '580791585021755408');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    var song = message.content.split(' ');
    var url = song[1];

    if (!url) {
        return message.reply(' Please add the Youtube link of your song after the !musicPlay command, divided with a space.');
    }

    if (!voiceChannel) {
        return message.reply('I need to be in the voice channel to play music.');
    }

    if (!permissions.has('CONNECT')) {
        return message.reply('I cannot connect to the voice channel, make sure I have the proper permissions.');
    }

    if (!permissions.has('SPEAK')) {
        return message.reply('I cannot speak in the voice channel, make sure I have the proper permissions.');
    }
    
    if (voiceChannel != null) {
        // console.log(`${VoiceChannel.name} was found and is a ${VoiceChannel.type} channel.`);
        voiceChannel.join()
        .then(connection => {
            // console.log('Bot joined the channel.'); 
            const stream = ytdl(url, {filter: 'audioonly'});
            const dispatcher = connection.playStream(stream, streamOptions);

            dispatcher.on('end', () => {
                voiceChannel.leave();
            })

            // dispatcher.setVolumeLogarithmic(5 / 5);
        })
        .catch();
    } 
};