exports.run = async (client, message, args) => {
	let start = args[0]
	let end = args[1]
	if (!args[0] || !args[1]) return message.channel.send(`What name should be at the start name and end name of the ship?`)

	if (args[3]) return message.channel.send("please enter a 2 word name");
	return message.channel.send(`${start.slice(0, Math.floor(start.length / 2))}${end.slice(Math.floor(end.length / 2))}`);
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'ship-name',
	description: 'Creates a ship name from two names.',
	category: "text-edit",
	usage: "ship-name <start> <end>",
};