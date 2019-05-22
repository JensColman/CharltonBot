// Bericht in de console dat laat weten dat de bot online is.

module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('In the CharltonVerse!');
};