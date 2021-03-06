const {
    MessageEmbed
} = require("discord.js")

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission(["MANAGE_ROLES"])) return message.channel.send("You dont have permission to perform this command!")

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])
    if (!rMember) return message.channel.send("Please provide a user to remove a role too.")
    let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if (!role) return message.channel.send("Please provide a role to remove from said user.")
    let reason = args.slice(2).join(" ")
    if (!reason) return message.channel.send("Please provide a reason")

    if (!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("I don't have permission to perform this command.")

    if (!rMember.roles.has(role.id)) {
        return message.channel.send(`${rMember.displayName}, doesnt have the role!`)
    } else {
        await rMember.roles.remove(role.id).catch(e => console.log(e.message))
        message.channel.send(`The role, ${role.name}, has been removed from ${rMember.displayName}.`)
    }

    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .addField("Moderation:", "Addrole")
        .addField("Mutee:", rMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.cache.find(ch => ch.name.includes('member-log')) || message.guild.channels.cache.find(ch => ch.name.includes('log')) || message.guild.channels.cache.find(ch => ch.name.includes('logs'));
    sChannel.send(embed)
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["rr", "roleremove"],
    permLevel: "User"
};

exports.help = {
    name: "removerole",
    description: "Removes a role to a member of the guild!",
    category: "Moderation",
    usage: "removerole <@user> <@Role mention>",
};