// Doet een berekening.

module.exports = message => {
    const gotMessage = message.content.split(' ');
    const calculation = gotMessage[1];

    function calculate(fn) {
        return new Function('return ' +fn)();
    }    

    return message.reply(`${calculation} = ${calculate(calculation)}`);
};