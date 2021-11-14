const { SlashCommandBuilder } = require('@discordjs/builders');
const { randomId, getFusionMessages } = require('../utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fuse')
		.setDescription('Fuse random pokemons.'),
	async execute(interaction) {
    const baseId = randomId();
    const faceId = randomId();

    console.log(`Slash fusing ${faceId}, ${baseId}`);

    const messages = getFusionMessages({faceId, baseId});
    await interaction.reply(messages[0]);
    messages.slice(1).forEach(async (m) => await interaction.channel.send(m));
	},
};
