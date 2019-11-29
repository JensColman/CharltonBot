const prefix = '!';

const help = require('../commands/help');
const kick = require('../commands/kick');
const calc = require('../commands/calculator');
const play = require('../commands/music/play');
const stop = require('../commands/music/stop');
const skip = require('../commands/music/skip');

module.exports = (client, message) => {
    if (message.author.bot) {
        return undefined;
    }

    if (message.content.startsWith(`${prefix}help`)) {
        return help(message);
    }

    if (message.content.startsWith(`${prefix}kick`)) {
        return kick(message);
    }

    if (message.content.startsWith(`${prefix}calc`)) {
        return calc(message);
    }

    if (message.content.startsWith(`${prefix}play`)) {
        return play(message);
    }

    if (message.content.startsWith(`${prefix}stop`)) {
        return stop(message);
    }

    if (message.content.startsWith(`${prefix}skip`)) {
        return skip(message);
    }

};