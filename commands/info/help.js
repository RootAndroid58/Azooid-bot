const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const fs = require('fs');



module.exports = {
    name: "help",
    aliases: ["h"],
    category: "info",
    description: "Returns all commands, or one specific command info",
    clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
    userPermissions:["VIEW_CHANNEL"],
    userPermissions: [''],
    usage: "[command | alias]",
    run: async (client, message, args,db) => {
      let prefix
   await db.collection('guilds').doc(message.guild.id).get().then((q) => {
        if(q.exists){
            prefix = q.data().prefix;
        }else{
            prefix = "." || config1.prefix_mention ;
        }
    })
       
        // If there's an args found
        // Send the info of that command found
        // If no info found, return not found embed.

        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            // Otherwise send all the commands available
            // Without the cmd info
            return getAll(client, message,prefix);
        }
    }
}

function getAll(client, message,prefix) {
   
    const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setDescription(`Server prefix is\ \ \ \`${prefix}\``)

        .addField("**MODERATION**",stripIndents`
          addrole
          removerole
          kick
          ban
          report`,true)
        .addField(`**Game**`,stripIndents`
          apex
          dota
          dhero
          ditem
          fortnite
          overwatch
          r6stats
          steam
          csgo
          csgow
          pcount
          dleaderboard (dlb)
        `,true)
        .addField("**INFO**",stripIndents`
          serverinfo
          help
          ping
          whois
          today (today-in-history)
          hunble-bundle
          rank`,true)

        .addField("**FUN**",stripIndents`
          apod
          calander
          uptime
          write
          read
          invite
          meme
          xkcd
          joke
          amazeme
          love
          rps
          drankrate (d%)
          fakeban
          fidgetspinner (fspin)
          typing test
        `,true)
        .addField("**SEARCH**",stripIndents`
          book
          giphy
          google autofill (autofill)
          gravatar
          itunes
          mdn
          movie
          nasa
          npm
          osu
          recipe
          reddit
          rule
          stack-overflow
          youtube
          weather
          wikipedia (wiki)
        `,true)
        // .addField("**NSFW**",stripIndents`
        //   4k
        //   anal
        //   boobs
        //   butts
        //   hanal
        //   hbj
        //   hboobs
        //   hcum
        //   hentai
        //   hgif
        //   hles
        //   hpussy
        //   urban`,true)
        .addField("**meme:**",stripIndents`
          3000-years (3ky)
          belike
          beautiful
          demotivational
          discordcard (dcard)
          thug-life
          to-be-continued (tbc)
          triggered
        `,true)
        .addField("**OWNER**",stripIndents`
          log
          reset  (reset-settings)
          prefix
          settings
          welcome
          autorole`,true)

        .addField("**UTIL**",stripIndents`
          bug
          clean
          say
          info
          hastebin (pastebin)
          donate`,true)
        .addField(`**Music**`,stripIndents`
          play (p)
          stop (disconnect,leave)
          seek
          skip
          nowplaying (np)
          radio (usage: radio <station name>)
          repeat
          repeatqueue
          shuffle
          eq (usage: eq help)
          volume (vol)
          `,true)
        .addField(`**text-edit**`,stripIndents`
          base64
          binary
          braille
          brony-speak
          clap
          cursive
          dvorak
          embed
          emojify
          fancy
          hex
          latmes
          imgtfy
          lowercase
          md5
          mocking
          morse
          nobody name
        `,true)
        .addField(`**text edit**`,stripIndents`
          owo
          pig latin
          pirate
          repeattxt
          reverse
          sha-1
          sha-256
          ship-name
          shuffletxt
          snake-speak
          spoiler-letter
          superscript (tiny-text)
          tebahpla
          unspoiler
          uppercase
          upside down
          uri-encode
          uri-decode
          zalgo`,true)
          
        .addField("Note",stripIndents`
        To get more info on each command type help <your command>
        Total commands **143**+        
        example: suppose prefix is . then
        .help ping 
        it will give you more info on ping command`)
        .setFooter(`${client.user.username}`)
        
//     // Map all the commands not adding every command idk why
//     // with the specific category
//     const commands = (category) => {
//         return client.commands
//             .filter(cmd => cmd.category === category)
//             .map(cmd => `  \`${cmd.name}\``)
//             .join("\n");
//     }

//     // Map all the categories
//     const info = client.categories
//         .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
//         .reduce((string, category) => string + "\n" + category);

//     return message.channel.send(embed.setDescription(info));
    message.channel.send("**Bot is in heavy development right now **\n",embed)
    // message.channel.send(embed);
}

function getCMD(client, message, input) {
    const embed = new RichEmbed()

    // Get the cmd by the name or alias
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    
    let info = `No information found for command **${input.toLowerCase()}**`;

    // If no cmd is found, send not found embed
    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    // Add all cmd info to the embed
    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }
    if (cmd.example)  info += `\n**Exaple**: ${cmd.example}`;

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}