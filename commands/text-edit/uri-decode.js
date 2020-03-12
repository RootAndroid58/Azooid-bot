

module.exports =  {

	name: 'url-decode',
	aliases: ['decode-url', 'decode-uri', 'uri-decode', 'decode-uri-component'],
	group: 'text-edit',
	memberName: 'url-decode',
	description: 'Decodes URL characters to regular characters.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'text',
			prompt: 'What text would you like to decode?',
			type: 'string',
			validate: text => {
				if (decodeURIComponent(text).length < 2000) return true;
				return 'Invalid text, your text is too long.';
			}
		}
	],
    run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to decode?`)
		
		return message.channel.send(decodeURIComponent(text));
	}
};
