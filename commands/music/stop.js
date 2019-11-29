const ytdl = require('ytdl-core');

module.exports = message => {
    const voiceChannel = message.member.voiceChannel;
    const permissions = voiceChannel.permissionsFor(message.client.user);
    var args = message.content.split(' ');
    var url = args[1];

    if (!message.member.voiceChannel) {
        return message.reply('You are not in a voice channel.');
    } else {
        voiceChannel.leave();
		return undefined;
    }
    
};