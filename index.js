const { Client, Collection, Intents } = require('discord.js');
const { formatFuseId, getFusionMessages } = require('./utils');
const { token } = require('./config.json');
const fs = require('fs');
const pokename = require('./pokename.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
    return;
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  const content = message.content.toLowerCase();

  if (content.startsWith('!fuse')) {
    const [face, base] = content.slice(5).trim().split(' ').filter((c) => c);
    console.log(`input: ${face}, ${base}`);
    const {faceId, baseId} = formatFuseId({face, base});
    console.log(`Prefix fusing ${faceId}, ${baseId}`);

    const messages = getFusionMessages({faceId, baseId});
    messages.forEach(async (m) => await message.channel.send(m));
  }
});

client.login(token);
