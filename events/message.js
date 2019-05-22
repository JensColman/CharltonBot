// Berichten in de chat.

const kick = require('../commands/kick');
const calc = require('../commands/calculator');
const music = require('../commands/music');

module.exports = (client, message) => {
    if (message.content.startsWith('!kick')) {
        return kick(message);
    }

    if (message.content.startsWith('!calc')) {
        return calc(message);
    }

    if (message.content.startsWith('!play')) {
        return music(message);
    }
};