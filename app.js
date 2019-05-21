require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

// fs.readdir('./events/', (err, files) => {
//     files.forEach(file => {
//         const eventHandler = require(`./events/${file}`);
//         const eventName = file.split('.')[0];
//         client.on(eventName, arg => eventHandler(client, arg));
//     })
// });

// Geeft een bericht weer in de console wanneer de bot online is.
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

// Wanneer er een bericht verstuurd wordt in de chat.
client.on('message', async message => {
    // if (message.content === 'ping') {
    //     message.reply('Pong!');
    // }

    if (message.content.startsWith('!kick')) {
        const member = message.mentions.members.first()

        if (!member) {
            return message.reply(`Who are you trying to kick? You must mention a user.`)
        }
        if (!member.kickable) {
            return message.reply(`I can't kick this user. Sorry!`)
        }
        return member
            .kick()
            .then(() => message.reply(`${member.user.tag} was kicked.`))
            .catch(error => message.reply(`Sorry, an error occured.`))
    }
});

// Wanneer een nieuwe gebruiker zich aanmeldt op de server.
client.on('guildMemberAdd', member => {
    member.send(`Welcome on the server! Please be aware that we won’t tolerate troll, spam or harassment. Have fun 😀`)
})

client.login(process.env.BOT_TOKEN);