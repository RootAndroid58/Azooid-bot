// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
//init database
const firebase = require('firebase/app');
const admin = require('firebase-admin');
let db = admin.firestore();
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const fs = require('fs')
const getUrls = require('get-urls');

module.exports = async (client, message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;
  if (!message.guild) return;

  // Grab the settings for this server from the PersistentCollection
  // If there is no guild, get default conf (DMs)
  // For ease of use in commands and functions, we'll attach the settings
  // to the message object, so `message.settings` is accessible.

  const settings = message.settings = client.getSettings(message.guild);
  let text = getUrls(message.content)
  let test = message.content.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm, '')


  let prefix
  await db.collection('guilds').doc(message.guild.id).get().then((q) => {
    if (q.exists) {
      prefix = q.data().prefix || config1.prefix_mention;
    } else {
      prefix = "." || config1.prefix_mention;
    }
  })
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  //if (message.content.indexOf(settings.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  //const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command.length === 0) return;

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  let cmd = client.commands.get(command);
  if (!cmd) cmd = client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherthign; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return message.channel.send(`Unknown command [\`${command}\`] . Use \`${prefix+'help'}\` or \`@Azooid#8892 help\` to view the command list!`);

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return; // message.author.send(`I cannot send message in ${message.channel.name} in ${message.guild.name} Contact server admin for this issue !`);
  // If the command exists, **AND** the user has permission, run it.
  // client.log("log", `${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "CMD");
  const dataFile = "./data.json";
  let data = JSON.parse(fs.readFileSync(dataFile));
  let promise
  const serverData = data[message.guild.id] || {};
  if (cmd) promise = cmd.run(client, message, args, level, db, serverData);
  let arr = ['watch','unwatch','upcoming','watching','cleanani']
  if (contains(arr , cmd.help.name)){
    promise.then(ret => {
      if (ret) {
        data[message.guild.id] = ret;
        fs.writeFileSync(dataFile, JSON.stringify(ret));
      }
    });

  }
};



function contains(a, obj) {
  var i = a.length;
  while (i--) {
     if (a[i] === obj) {
         return true;
     }
  }
  return false;
}