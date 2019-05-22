const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};

module.exports = message => {
    const voiceChannel =  message.guild.channels.find(channel => channel.id === '580791585021755408');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    var song = message.content.split(' ');
    var url = song[1];

    if (!message.member.voiceChannel) {
        return message.reply('You are not in a voice channel.');
    }
    voiceChannel.leave();
    return undefined;
};