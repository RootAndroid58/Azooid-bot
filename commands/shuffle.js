const {
  Utils
} = require("erela.js")
const {
  MessageEmbed,
  Collection
} = require("discord.js")
const {
  stripIndents
} = require("common-tags")
exports.run = async (client, message, args) => {
  const server = message.guild.name;
  const player = client.music.players.get(message.guild.id)
  if (!player || !player.queue[0]) return message.channel.send("No Songs Currently playing in this Guild!");
  const voiceChannel = message.member.voice.channel;
  const voiceChannelID = message.member.voice.channelID;

  if (!voiceChannel || voiceChannelID !== player.voiceChannel.id) return message.channel.send("You need to be in same voice channel to shuffle music!!");
  player.queue.shuffle()
  message.channel.send(`\`${server}'s\` queue shuffled!`)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["shift"],
  permLevel: "User"
};

exports.help = {
  name: "shuffle",
  description: "Loops the Queue",
  usage: "seek <time>",
  category: "Music",
};