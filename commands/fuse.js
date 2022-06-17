const { SlashCommandBuilder } = require('@discordjs/builders');
const { randomId, getFusionMessages, formatFuseId } = require('../utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fuse')
		.setDescription('Fuse random pokemons.')
        .addStringOption(option =>
            option.setName('pokemon_a')
                .setDescription('Pokemon A you want to fuse')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('pokemon_b')
                .setDescription('Pokemons B you want to fuse')
                .setRequired(false)),
	async execute(interaction) {
        const face = interaction.options.getString('pokemon_a') || undefined;
        const base = interaction.options.getString('pokemon_b') || undefined;
        const {faceId, baseId} = formatFuseId({face, base});

        console.log(`Slash fusing ${faceId}, ${baseId}`);

        const messages = getFusionMessages({faceId, baseId});
        await interaction.reply(messages[0]);
        messages.slice(1).forEach(async (m) => await interaction.channel.send(m));
	},
};
