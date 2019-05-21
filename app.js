require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', async msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(process.env.BOT_TOKEN);