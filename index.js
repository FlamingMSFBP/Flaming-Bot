const commando = require("discord.js-commando")
const discord = require('discord.js')
const RichEmbed = require("discord.js")
const bot = new commando.Client();

const token = require('./token.json');
const dict = require('./dictionary.json')
const prefix = token.botPrefix
const owner = token.ownerID

bot.on("message", message => {
    if (message.content === `${prefix}ping` && message.author.id === owner)
        message.channel.send("Ping!").then(m =>{
            let ping =m.createdTimestamp - message.editedTimestamp
            m.edit(`Pong! \`${ping}ms\``)
    })
})

//+62 856 5859 5859
bot.on("message", message => {
    const args = message.content.split(" ").slice(1)
    const text = args.join(" ")
    if (message.content.startsWith(`${prefix}cfam`) && message.author.id === owner){
        if (text === "members"){
            const role = message.guild.roles.cache.find(r => r.name === "Gosu's Fams")
            const gosuRole = (role.members.map(user => user))
            let color = ((1 << 24) * Math.random() | 0).toString(16); 
            const embed = new discord.MessageEmbed()
                .setTitle("Members in Gosu's Fams")
                .addField("​", gosuRole)
                .setColor(`#${color}`)
                .setTimestamp();
            message.channel.send({embed: embed})
        }
        else if (text === "random"){
            const role = message.guild.roles.cache.find(r => r.name === "Gosu's Fams")
            const gosuRole = (role.members.map(user => user))
            const gosuRoleRand = gosuRole[Math.floor(Math.random() * gosuRole.length)]
            let color = ((1 << 24) * Math.random() | 0).toString(16); 
            const embed = new discord.MessageEmbed()
                .setTitle("Random Member in Gosu's Fams")
                .addField("​", gosuRoleRand)
                .setColor(`#${color}`)
                .setTimestamp();
            message.channel.send({embed: embed})
        }
        else{
            let color = ((1 << 24) * Math.random() | 0).toString(16); 
            const embed = new discord.MessageEmbed()
                .setTitle("Error")
                .setColor(`#${color}`)
                .setTimestamp();
            message.channel.send({embed: embed})    
        }
    }
})
//Members
bot.on("message", message => {
    const args = message.content.split(" ").slice(1);
    const arg = `${prefix}members`
    const text = args.join(" ");
    if (message.content.startsWith(arg) && (message.author.id === owner)){
    const role = message.guild.roles.cache.find(role => role.name === `${text}`)
    const mem = role.members.map(user => user).slice(0, 50)
    const embed = new discord.MessageEmbed()
        .setTitle("Members in " + text)
        .addField("​", mem, true)
        .addField("Member Count", role.members.size)
        .setTimestamp();
    message.channel.send({embed: embed})
    }
})
//bounty
/*bot.on("message", message => {
    const args = message.content.split(" ").slice(1);
    const arg = `${prefix}bounty`
    const text = args.join(" ");
    if (message.content.startsWith(arg) && (message.author.id === owner)){
    const role = message.guild.roles.cache.find(role => role.name === `Lv30`)
    let random_10 = 0
    let array = []
    while(random_10 <= 9){
        let random_num = Math.floor(Math.random() * role.members.size + 1)
        let random_bounty = role.members.map(user => user).slice(random_num-1, random_num)
        array.push((random_10+1) + ". " + random_bounty)
        random_10 += 1
    }
    const embed = new discord.MessageEmbed()
        .setTitle("Bounties" + text)
        .addField("​", array, true)
        .setTimestamp();
    message.channel.send({embed: embed})
    }
})*/
bot.on('message',({message, attachments, author, channel}) => {
    // don't reply to bots
    if (author.bot) return
    // sends the first attachment if there are any
    if (attachments.size && author.id === owner) {
      const embed = new discord.MessageEmbed()
          .setImage(attachments.first().attachment)
      channel.send({embed: embed})
      attachments.delete()
    }
})
//Membercount
bot.on("message", message => {
    const args = message.content.split(" ").slice(1);
    const arg = `${prefix}membercount`
    const text = args.join(" ");
    if (message.content.startsWith(arg) && (message.author.id === owner) && (text === "online" || text === "idle" || text === "dnd" || text === "offline")){
        var presenceCount = message.guild.members.cache.filter(m => m.presence.status === `${text}`).size;
        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
        const embed = new discord.MessageEmbed()
            .addField(`${capitalize(text)} Count`, presenceCount)
            .setTimestamp();
        message.channel.send({embed: embed})
    }
    else if (message.content.startsWith(arg) && (message.author.id === owner) && (text !== "server") && (text !== "verified")){
    const role = message.guild.roles.cache.find(role => role.name === `${text}`)
    const embed = new discord.MessageEmbed()
        .addField(`${text} Member Count`, role.members.size)
        .setTimestamp();
    message.channel.send({embed: embed})
    }
    else if (message.content.startsWith(arg) && (message.author.id === owner) && (text !== "server")){
        const role = message.guild.roles.cache.find(role => role.name === `Unverified`)
        const role2 = message.guild.roles.cache.find(role => role.name === `Friends`)
        const embed = new discord.MessageEmbed()
            .addField(`Unverified Member Count`, role.members.size)
            .addField(`Friends Member Count`, role2.members.size)
            .addField(`Verified Member Count`, message.guild.memberCount - role2.members.size)
            .setTimestamp();
        message.channel.send({embed: embed})
    }
    else if (message.content.startsWith(arg) && (message.author.id === owner) && (text === "server")){
    const embed = new discord.MessageEmbed()
        .addField("Server Member Count", message.guild.memberCount)
        .setTimestamp();
    message.channel.send({embed: embed})
    }
})
//Status
bot.on("message", message => {
    const args = message.content.split(" ").slice(1);
    const arg = `${prefix}status`
    const text = args.join(" ");
    if (message.content.startsWith(arg) && (message.author.id === owner)){
        if (text === "main"){
        const embed = new discord.MessageEmbed().setTitle("Main Bots' Status");
            if (text === "main"){
            const mainBot = message.guild.roles.cache.find(r => r.name === "Main Bot")
            mainBot.members.forEach((member) => {   
            if (member.presence.status === "online"){
                embed.addField(member.user.username,"<:online:688436294162186299> " + member.presence.status, true);
            }
            else if (member.presence.status === "idle"){
                embed.addField(member.user.username,"<:idle:688436257113768057> " + member.presence.status, true);
            }
            else if (member.presence.status === "dnd"){
                embed.addField(member.user.username, "<:dnd:688436211710427170> " + member.presence.status,true);
            }
            else if (member.presence.status === "offline"){
                embed.addField(member.user.username,"<:offline:688441593233014951> " + member.presence.status, true);
            }
            })
            }
        message.channel.send({embed: embed})
        }
        else if (text === "norm"){
        const embed = new discord.MessageEmbed().setTitle("Normal Bots' Status");    
            if (text === "norm"){
                const normBot = message.guild.roles.cache.find(r => r.name === "Bot")
                normBot.members.forEach((member) => {   
            if (member.presence.status === "online"){
                embed.addField(member.user.username,"<:online:688436294162186299> " + member.presence.status, true);
                }
            else if (member.presence.status === "idle"){
                embed.addField(member.user.username,"<:idle:688436257113768057> " + member.presence.status, true);
                }
            else if (member.presence.status === "dnd"){
                embed.addField(member.user.username, "<:dnd:688436211710427170> " + member.presence.status, true);
                }
            else if (member.presence.status === "offline"){
                    embed.addField(member.user.username,"<:offline:688441593233014951> " + member.presence.status, true);
                    }
            })    
        }
        message.channel.send({embed: embed})
    }
        else if (text === "music"){
        const embed = new discord.MessageEmbed().setTitle("Music Bots' Status");    
            if (text === "music"){
                const musicBot = message.guild.roles.cache.find(r => r.name === "Music Bots")
                musicBot.members.forEach((member) => {   
            if (member.presence.status === "online"){
                embed.addField(member.user.username,"<:online:688436294162186299> " + member.presence.status, true);
                }
            else if (member.presence.status === "idle"){
                embed.addField(member.user.username,"<:idle:688436257113768057> " + member.presence.status, true);
                }
            else if (member.presence.status === "dnd"){
                embed.addField(member.user.username, "<:dnd:688436211710427170> " + member.presence.status, true);
                }
            else if (member.presence.status === "offline"){
                embed.addField(member.user.username,"<:offline:688441593233014951> " + member.presence.status, true);
                }
            })
        }
        message.channel.send({embed: embed})
    }
    else if (args[0] === "custom"){
        const args1 = message.content.split(" ").slice(1, 2)
        const args2 = message.content.split(" ").slice(2);
        const text2 = args2.join(" ")
        const embed = new discord.MessageEmbed().setTitle(`${text2} Status`)
            if (args1[0] === "custom"){
                const customRole = message.guild.roles.cache.find(r => r.name === text2)
                embed.addField("Membercount", `${customRole.members.size} people`)
                customRole.members.forEach((member) => {   
            if (member.presence.status === "online"){
                embed.addField(member.user.username,"<:online:688436294162186299> " + member.presence.status, true);
                }
            else if (member.presence.status === "idle"){
                embed.addField(member.user.username,"<:idle:688436257113768057> " + member.presence.status, true);
                }
            else if (member.presence.status === "dnd"){
                embed.addField(member.user.username, "<:dnd:688436211710427170> " + member.presence.status, true);
                }
            else if (member.presence.status === "offline"){
                embed.addField(member.user.username,"<:offline:688441593233014951> " + member.presence.status, true);
                }
            })
        }
        message.channel.send({embed: embed})
    }
        else{
        const embed = new discord.MessageEmbed().setTitle("Error")
        message.channel.send({embed: embed})
        }
}})
//const normBot = message.guild.roles.cache.find(r => r.name === `Bots`)
bot.on('message', message => {
    const args = message.content.split(" ").slice(1);
    const arg = `${prefix}embed`
    const text = args.join(" ");
    let color = ((1 << 24) * Math.random() | 0).toString(16); 
    if(message.content.startsWith(arg) && (message.author.id === owner)){
    const embed = new discord.MessageEmbed()
        .addField('Message', '\n \`\`\`' + text + '\`\`\`')
        .addField('Color', `#${color}`)
        .setAuthor(message.author.username + '\'s Embed', message.author.displayAvatarURL())
        .setColor(`#${color}`)
        .setTimestamp()
  message.delete()
  message.channel.send({embed: embed})
    }
});
bot.on('message', message => {
    const args = message.content.split(" ").slice(1);
    const arg = `${prefix}randomcolor`
    const text = args.join(" ");
    let color = ((1 << 24) * Math.random() | 0).toString(16); 
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    if(message.content.startsWith(arg) && (message.author.id === owner)){
    const embed = new discord.MessageEmbed()
        .setTitle('Random Color')
        .addField("Hex", `#${color}`)
        .addField("RGB", hexToRgb(`#${color}`).r + ", " + hexToRgb(`#${color}`).g + ", " + hexToRgb(`#${color}`).b)
        .setColor(`#${color}`)
        .setTimestamp();
    message.delete()
    message.channel.send({embed: embed})
    }
});

bot.on('message', message => {
    const args = message.content.split(" ").slice(1);
    if (message.author.bot || message.author.id !== owner) return;
    if(message.content.startsWith(`${prefix}say`)){
    let text = args.join(" ");
    message.delete();
    message.channel.send(text);
  }
});

bot.on('message', message => {
    const args = message.content.split(" ").slice(1)
    const text = args.join(" ")
    let jk = bot.guilds.cache.get('493164609591574528')
    let emote_req = jk.channels.cache.get('692086660929683506');
    if (message.content.startsWith("f!request")){
        message.delete()
        if (args.length > 2 || args.length <= 1){
            const embed = new discord.MessageEmbed()
                .setTitle(`Command: f!request`)
                .addField("​", "**Usage:** f!request [emoji name] [link]\n**Example:** f!request uwu https://cdn.discordapp.com/emojis/511583505168203806.png?v=1")
                .setTimestamp();
            message.channel.send({embed: embed})
        }
        else{
            const isValidUrl = (string) => {
                try {
                new URL(string);
                return true;
                } catch (_) {
                return false;  
                }
            }
            if (isValidUrl(args[1]) === false){
            const embed = new discord.MessageEmbed()
                .setTitle(`Command: f!request`)
                .addField("​", "**Usage:** f!request [emoji name] [link]\n**Example:** f!request uwu https://cdn.discordapp.com/emojis/511583505168203806.png?v=1")
                .setTimestamp();
            message.channel.send({embed: embed})
            }
            else{
            const embed = new discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setTitle(`${args[0]}`)
                .setURL(`${args[1]}`)
                .setImage(`${args[1]}`)
                .setTimestamp();
            emote_req.send({embed: embed})
            message.channel.send("Request has been processed")
            }
        }
    }
})
bot.on('message', message =>{
    const args = message.content.split(" ").slice(1);
    const arg = `${prefix}famcolor`
    const text = args.join(" ");
    let color = ((1 << 24) * Math.random() | 0).toString(16); 
    if(message.content.startsWith(arg) && (message.author.id === owner)){
    const gosuFams = message.guild.roles.cache.find(r => r.name === "Hasu")
    const gosuFamsColor = gosuFams.color.toString(16)
    const gosuFamsNewColor = gosuFams.setColor(`${color}`)
    const embed = new discord.MessageEmbed()
        .addField('Previous Color', gosuFamsColor)
        .addField('New Color', `${color}`)
        .setAuthor('Gosu\'s Fams Color')
        .setColor(`#${color}`)
        .setTimestamp();
  message.delete()
  message.channel.send({embed: embed})
    }
})

bot.on('message', message => {
    const args = message.content.split(" ").slice(1)
    const text = args.join(" ")
    if((message.content.startsWith(`${prefix}temp`))  && (message.author.id === owner)){
        message.channel.send(args)
        if(text === "create"){
            message.guild.channels.create( 'temp', { type: 'text'});
        }
        else if(text === "delete"){
            message.guild.channel.delete
        }
    }
})

bot.on('message', message => {
    if (message.content === 'f!restart') {
    if (message.author.id !== owner) return;
    message.channel.send('Restarted.').then(() => {
    process.exit(1)
    bot.login(token.token)
        })
    }
});
//https://discordapp.com/oauth2/authorize?client_id=475114835059933186&permissions=18432&scope=bot&permissions=2134207679

bot.on('message', message => {
    if (message.content === 'f!invite') {
    if (message.author.id !== owner) return;
    message.channel.send('https://discordapp.com/oauth2/authorize?client_id=475114835059933186&permissions=18432&scope=bot&permissions=2134207679.')
    }
});

bot.on('message', message => {
    if (message.content === `${prefix}end`) {
    if (message.author.id !== '274909438366973953') return;
    message.channel.send('Ended.').then(() => {
    process.exit(1);
        })
    }
});
/* bot.on('message', message => {
    const args = message.content
    let afkLogs = message.guild.channels.cache.get("687075634064916501")
    if (message.content.startsWith("?a")){
        const embed = new discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(`Used \`afk\` command in ${message.channel}\n${args}`)
            .setColor("#2874CC")
        afkLogs.send({embed: embed})
    }
}) */
bot.on('message', message => {
    const args = message.content
    let afkLogs = message.guild.channels.cache.get("707646339173056562")
    if (message.content.startsWith(`${prefix}rolefaq`)){
        const embed = new discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("Server Roles")
            .setDescription("**Gosu Squad**\n\n<@&495727509959344149> | Gosu Squad Leader\n<@&700151699444334652> | Gosu Squad Vice Leader\n<@&495721986857762843> | Members of Gosu Squad\n\n**Admin and Mods**\n\n<@&495718851288236032> | Admin\n<@&496915843364552706> | Server Developer\n<@&495727371140202506> | Server Moderation Team\n<@&495722197244051457> | Stream Moderation Team\n\n**VIPs**\n\n<@&499643027346948112> | Lovely People Who Subscribe To Membership On Streams\n<@&585672404383039530> | Wonderful Server Boosters\n<@&581996154116374542> | Won through a limited event\n\n**Level Roles**\nBased upon MEE6 `!rank`\n\n<@&542051690195451907> | Level 70\n<@&523184440491638795> | Level 50\n<@&497578834376392724> | Level 30\n<@&687470373331402752> | Level 25\n<@&497491254838427674> | Level 15\n<@&497843968151781378> | Level 5\n<@&659628122756349982> | Can be obtained at Lv. 25\nOther roles can be obtained upon choosing when leveling up.\n\n**Bot Roles**\n\n<@&511987649288863744> | The Main Important Bots\n<@&495735086558478337> | Normal Play Bots\n<@&527645289775890432> | Music Bots\n\n**Others**\n\n<@&528731175133642782> | YouTuber Role\n<@&496717793388134410> | Obtained upon verifying\n<@&534439431453671445> | People who don\'t play ML\n<@&497654614729031681> | People who are subscribed \`|iam subscriber\`\n<@&706932223181324340> | Pings for giveaways \`|iam giveawaypings\`\n<@&527780768961789975> | Members that are muted\n<@&687137752571314257> | Music DJ\n\n__**Please Don\'t Beg For Roles**__\n*Even though some are given out*")
            .setColor("#FFFEFE")
        afkLogs.send({embed: embed})
    }
})
bot.on('message', message => {
    const args = message.content
    let afkLogs = message.guild.channels.cache.get("733815810157445142")
    if (message.content.startsWith(`${prefix}welcome`)){
        const embed = new discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("Welcome to Gosu(고수) Server")
            .setDescription("Hi. This is the official Gosu server.\n\nPlease keep in mind the rules that need to be followed in <#714954683084701779>\n\nBasic guides can be found throughout the server.\n<#714954683084701780>\n\nThis community is full of wonderful people you can chat with upon verifying.\n-Note moderators are busy people with their own lives and will verify you ASAP.\n\nRewards are received upon being active in the servers and donators are given special privileges. \n\nMany fun bots and music to keep you intrigued.\n\nWe hope you have a splendid time on the server!\n\nInvite links:\nhttps://discord.gg/xgxD5hB\ndiscord.gg/gosugeneral")
            .setColor("#FFFEFE")
        afkLogs.send({embed: embed})
    }
})
/*bot.on('message', async message => {
    let afkLogs = message.guild.channels.cache.get("823237054392958976")
    let welcomeFetch = await afkLogs.messages.fetch("823244352553615380")
    let join = await afkLogs.messages.fetch("823244353090093056")
    if (message.content.startsWith(`${prefix}join`)){
        const embed = new discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("Welcome to Gosu(고수) Server\nRules to abide to:")
            .setDescription("**1. Respect the channels**\nKeep things in their appropriate channels. They exist for a reason, please use them as intended.\n\n**2. No personal attacks or harassment**\nRacism or sexism will not be tolerated. Casual swearing is not allowed, although excessive use of rough language will result in a warning/mute/kick/ban in the server.\n\n**3. No spamming links, images, mentions, etc.**\nSpamming messages/Excessive emotes will get you muted/kicked/banned from the server.\n\n**4. No NSFW content**\nDo not post NSFW content of any kind as this may result for you to get kicked/banned. \nKeep it PG12!\n\n**5. No Advertising in chat or in PM/DM**\nSending unsolicited invite links may result in a ban. Advertising other unaffiliated sites is not allowed. Sending links through DM without the permission of the user you shared that link with is strictly not allowed.\nWill most likely result you in a ban/kick if not a mute.\n\n**6. No writing in caps**\nDo not write in all caps, if it is more than 70% it will be deleted by the bot and excessive use of caps will get you muted. \n\n**7. Do not excessively ping any members**\nFor example pinging random members few/multiple times for no reason even if they are different people or for bots. **Do not ping the Mods/Gosu.** There is a reason why <#500079487610912791> exists. If there is something going wrong in chat or in one of the channels or voice channel you may DM/ping **one** of the mod that is online or idle if not the nearest mod that can be seen and patiently wait for them to respond.\n\n**8. <@!155149108183695360>'s\nAutomod for messages will mute/kick you if you break one of the rules**\n\n**9. Do not consistently beg for roles/skins**\nBegging for roles/skins will not get you anywhere except a warning or a mute.\n\n**10.\nServer guides and invites can be found in <#733815810157445142> and <#720423939041656916>**\n\n**11. Moderators and admin may punish a member upon their appropriate discretion at any given time.**\n** **")
            .setColor("#FFFEFE")
        welcomeFetch.edit({embed: embed})
        const embed2 = new discord.MessageEmbed()
            .setDescription("**12. Any type of copypasta (copying and pasting large messages) will result in 180 minute mute.**\n\n**13. Any account selling/Account piloting services are prohibited.**\n__Selling accounts on this server is bannable and any type of free diamond app advertisement can lead you to a **kick or ban at the least**__\n\n**14. Anything that can get you banned in ML can get you banned here. Please follow ML's ToS. That applies to the same as Discord's ToS since we are a partnered server.**\n\n**15. Alternate accounts are not allowed.**\nThis means that verifying with your __main or smurf account on two different discord accounts__ is bannable. We **do not** tolerate users who escape their punishment by using different accounts. If you are caught using two accounts(no matter the reason), you will be **kicked or banned**.\n\n**16. Have some sense unless you want to be muted.**\n\n**17. Have fun in the server and that's it :smile:**")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setColor("#FFFEFE")
        join.edit({embed: embed2})
    }
})*/
/*bot.on('message', async message => {
    let afkLogs = message.guild.channels.cache.get("733815810157445142")
    let welcomeFetch = await afkLogs.messages.fetch("733816099954622585")
    if (message.content.startsWith(`${prefix}editwelcome`)){
        const embed = new discord.MessageEmbed('733816099954622585')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("Welcome to Gosu(고수) Server")
            .setDescription("Hi. This is the official Gosu server.\n\nPlease keep in mind the rules that need to be followed in <#719638526735679608>\n\nBasic guides can be found throughout the server.\n<#720423939041656916>\n\nThis community is full of wonderful people you can chat with upon verifying.\n-Note moderators are busy people with their own lives and will verify you ASAP.\n\nRewards are received upon being active in the servers and donators are given special privileges. \n\nMany fun bots and music to keep you intrigued.\n\nWe hope you have a splendid time on the server!\n\nInvite links:\nhttps://discord.gg/xgxD5hB\ndiscord.gg/gosugeneral")
            .setColor("#FFFEFE")
        welcomeFetch.edit({embed: embed})
    }
})*/
bot.on('message', async message => {
    const args = message.content
    let afkLogs = message.guild.channels.cache.get("817984009963044884")
    if (message.content.startsWith(`${prefix}socials`)){
        let welcomeFetch = afkLogs.messages.fetch("733815810157445142")
        const embed = new discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("General's Social Links")
            .setDescription("**YouTube**\nhttps://www.youtube.com/c/TeamGosu/videos\n\n**Trovo**\nhttps://trovo.live/GosuGeneral\n\n**Twitch**\nhttps://www.twitch.tv/gosugeneraltv\n\n**Instagram**\nhttps://www.instagram.com/parkjimahn/\n\n**Facebook**\nhttps://www.facebook.com/GosuFamily/\n\n**Invite links**\nhttps://discord.gg/xgxD5hB\ndiscord.gg/gosugeneral")
            .setColor("#FFFEFE")
        welcomeFetch.send({embed: embed})
        /*let afkLogs = message.guild.channels.cache.get("817984009963044884")
        let welcomeFetch = await afkLogs.messages.fetch("818490419960741899")
        const embedtwo = new discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("General's Mobile Legend")
            .setDescription("**General's ID and IGN**\n__Main__\nɢᴏsᴜ General\n18292632\n__Smurf__\n46732750\n\n**Gosu Gang**\n174495\n246146\n615464")
            .setColor("#FFFEFE")
        welcomeFetch.edit({embed: embedtwo})*/
        /*let afkLogs = message.guild.channels.cache.get("817984009963044884")
        let welcomeFetch = await afkLogs.messages.fetch("818490420471398412")
        const embedthree = new discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("General's Donation and Merch")
            .setDescription("**Secret Lab Chair**\nhttps://secretlab.co/?rfsn=3472715.0098ca&utm_source=refersion&utm_medium=affiliate&utm_campaign=3472715.0098ca\n\n**Stream Labs**\nhttps://streamlabs.com/teamgosu/tip\n\n**VIP Membership**\nhttps://www.youtube.com/sponsor_channel/UCqp8SDQ4WI77KEI7g4IZBfg?app=desktop&noapp=1\n\n**__Merch__**\nhttps://teespring.com/stores/generaltv\n__Hoodie__\nhttps://teespring.com/en/gosu-logo-zip-up-hoodie?view_as=USA\n__Short Sleeve T-Shirt__\nhttps://teespring.com/shop/Gosu-logo-tee1")
            .setImage("https://ibb.co/3RG4yKv")
            .setColor("#FFFEFE")
        welcomeFetch.edit({embed: embedthree})*/
    }
})
//Leveling
bot.on('message', message => {
    const args = message.content
    let afkLogs = message.guild.channels.cache.get("804748326989332528")
    if (message.content.startsWith(`${prefix}level5`)){
        const embed = new discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("Level 5")
            .setDescription(":two:-Noble")
            .setColor("#c6869e")
        afkLogs.send({embed: embed})
    }
    else if (message.content.startsWith(`${prefix}level-15`)){
        const embed = new discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("Level 15")
            .addField('Noble', ':three:-Soldier\n:four:-Scholar')
            .setColor("#b1ab9e")
        afkLogs.send({embed: embed})
    }
    else if (message.content.startsWith(`${prefix}level-30`)){
        const embed = new discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("Level 30")
            .addField("Scholar", ":four:-Head Scholar")
            .setColor("#76ffce")
        afkLogs.send({embed: embed})
    }
    else if (message.content.startsWith(`${prefix}level-50`)){
        const embed = new discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("Level 50")
            .addField("Head Scholar", ":four:-Chief Scholar")
            .setColor("#b5fff7")
        afkLogs.send({embed: embed})
    }
    else if (message.content.startsWith(`${prefix}level-70`)){
        const embed = new discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("Level 50")
            .setDescription("<@&497591253144436736>\n<@&497582173612670976>\n<@&497593990498222080>\n<@&497594302818418689>")
            .setColor("#FFFEFE")
        afkLogs.send({embed: embed})
    }
})
bot.on('message', message => {
    const args = message.content.split(" ").slice(1)
    if (message.content.startsWith(`${prefix}slowmode`)){
        message.channel.setRateLimitPerUser(args[0])
    message.delete()
    }
})
//709396844454871122
bot.on('message', message => {
    if (message.content.startsWith(`${prefix}faqedit`)){
        const embed = "709396844454871122"
        const exampleEmbed = new discord.MessageEmbed(embed).setTitle("Server Roles")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription("**Gosu Squad**\n\n<@&495727509959344149> | Gosu Squad Leader\n<@&700151699444334652> | Gosu Squad Vice Leader\n<@&495721986857762843> | Members of Gosu Squad\n\n**Admin and Mods**\n\n<@&495718851288236032> | Admin\n<@&496915843364552706> | Server Developer\n<@&495727371140202506> | Server Moderation Team\n<@&495722197244051457> | Stream Moderation Team\n\n**VIPs**\n\n<@&499643027346948112> | Lovely Donators On Streams\n<@&585672404383039530> | Wonderful Server Boosters\n<@&581996154116374542> | Won through a limited event\n\n**Level Roles**\nBased upon MEE6 `!rank`\n\n<@&542051690195451907> | Level 70\n<@&523184440491638795> | Level 50\n<@&497578834376392724> | Level 30\n<@&687470373331402752> | Level 25\n<@&497491254838427674> | Level 15\n<@&497843968151781378> | Level 5\n<@&659628122756349982> | Can be obtained at Lv. 25\nOther roles can be obtained upon choosing when leveling up.\n\n**Bot Roles**\n\n<@&511987649288863744> | The Main Important Bots\n<@&495735086558478337> | Normal Play Bots\n<@&527645289775890432> | Music Bots\n\n**Others**\n\n<@&528731175133642782> | YouTuber Role\n<@&496717793388134410> | Obtained upon verifying\n<@&534439431453671445> | People who don\'t play ML\n<@&497654614729031681> | People who are subscribed \`|iam subscriber\`\n<@&706932223181324340> | Pings for giveaways \`|iam giveawaypings\`\n<@&527780768961789975> | Members that are muted\n<@&687137752571314257> | Music DJ\n\n__**Please Don\'t Beg For Roles**__\n*Even though some are given out*")
            .setColor("#FFFEFE")
        message.edit(exampleEmbed)
    }
})
bot.on('message', async message => {
    if (message.content.startsWith(`${prefix}rcolor`)){
        const args = message.content.split(" ").slice(1, 2)
        const args2 = message.content.split(" ").slice(2)
        const text = args.join(" ")
        const text2 = args2.join(" ")
        const colors = message.guild.channels.cache.get("813099734498541568")
        let color = await colors.messages.fetch(text2)
        if(text === `1`){
        const exampleEmbed = new discord.MessageEmbed(colors).setTitle("Color 1")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(":watermelon:<@&820021275685552128>\n:cherry_blossom:<@&820021548198527042>\n:peach:<@&820021805359300629>")
            .setFooter("Requires Color 1")
            .setColor("#a900ff")
        color.edit({embed: exampleEmbed})
        }
        else if(text === "2"){
        const exampleEmbed = new discord.MessageEmbed(colors).setTitle("Color 2")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(":tea:<@&820022069974532129>\n:ocean:<@&820022340594434099>\n:droplet:<@&820022551228710963>")
            .setFooter("Requires Color 2")
            .setColor("#a900ff")
        color.edit({embed: exampleEmbed})
        }
        else if(text === "3"){
        const exampleEmbed = new discord.MessageEmbed(colors).setTitle("Color 3")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(":snowflake:<@&820022963687653417>\n:sparkles:<@&820023274587029544>\n:tulip:<@&820023727433318431>")
            .setFooter("Requires Color 3")
            .setColor("#a900ff")
        color.edit({embed: exampleEmbed})
        }
        else if(text === "4"){
        const exampleEmbed = new discord.MessageEmbed(colors).setTitle("Color 4")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(":crown:<@&820024024083333131>\n:strawberry:<@&820024750838644746>\n:hibiscus:<@&820036044475990087>")
            .setFooter("Requires Color 4")
            .setColor("#a900ff")
        color.edit({embed: exampleEmbed})
        }
        else if(text === "5"){
        const exampleEmbed = new discord.MessageEmbed(colors).setTitle("Color 5")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(":pie:<@&820025241405227012>\n:custard:<@&820025457914675231>\n:four_leaf_clover:<@&820025603373400084>")
            .setFooter("Requires Color 5")
            .setColor("#a900ff")
        color.edit({embed: exampleEmbed})
        }
        else if(text === "6"){
        const exampleEmbed = new discord.MessageEmbed(colors).setTitle("Color 6")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(":cloud:<@&820025765608554526>\n:mango:<@&820025901836009474>\n:grapes:<@&820026074788134963>")
            .setFooter("Requires Color 6")
            .setColor("#a900ff")
        color.edit({embed: exampleEmbed})
        }
        else if(text === "7"){
        const exampleEmbed = new discord.MessageEmbed(colors).setTitle("Color 7")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(":heartbeat:<@&820026375259684934>\n:fish_cake:<@&820026636455378996>\n:chocolate_bar:<@&820026796748832770>")
            .setFooter("Requires Color 7")
            .setColor("#a900ff")
        color.edit({embed: exampleEmbed})
        }
        else if(text === "8"){
        const exampleEmbed = new discord.MessageEmbed(colors).setTitle("Color 8")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(":coffee:<@&820026984431616051>\n:fog:<@&820027152912089158>\n:cookie:<@&813767512352358470>")
            .setFooter("Requires Color 8")
            .setColor("#a900ff")
        color.edit({embed: exampleEmbed})
        }
        else if(text === "free"){
        const exampleEmbed = new discord.MessageEmbed(colors).setTitle("Free Colors")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(":heart:<@&820327239467270144>\n:orange_heart:<@&820328618822598657>\n:yellow_heart:<@&820328716571770920>\n:green_heart:<@&820328896820936744>\n:blue_heart:<@&820329131438243911>\n:purple_heart:<@&820329311353176074>")
            .setFooter("Requires Lv15")
            .setColor("#a900ff")
        color.edit({embed: exampleEmbed})
        }
        else if(text === "elite"){
        const exampleEmbed = new discord.MessageEmbed(colors).setTitle("Elite")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(":shield:Elite")
            .setFooter("Requires Pre-Elite\nWhich Can Be Bought In u!shop")
            .setColor("#a900ff")
        color.edit({embed: exampleEmbed})
        }
    message.delete()
    }
})
/*bot.on('message', async message => {
    let afkLogs = message.guild.channels.cache.get("707646339173056562")
    let welcomeFetch = await afkLogs.messages.fetch("733815452010283101")
    if (message.content.startsWith(`${prefix}editfaq`)){
        const embed = new discord.MessageEmbed('733815452010283101').setTitle("Server Roles")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription("**Gosu Squad**\n\n<@&495727509959344149> | Gosu Squad Leader\n<@&700151699444334652> | Gosu Squad Vice Leader\n<@&495721986857762843> | Members of Gosu Squad\n\n**Admin and Mods**\n\n<@&495718851288236032> | Admin\n<@&496915843364552706> | Server Developer\n<@&495727371140202506> | Server Moderation Team\n<@&495722197244051457> | Stream Moderation Team\n\n**VIPs**\n\n<@&797932385429487676> | Lovely People Who Subscribe To Membership On YouTube Streams\n<@&832458135544266752> | Lovely People Who Subscribe To Membership On Twitch Streams\n<@&779424860563701791> | Lovely People Who Subscribe To Membership On Trovo Streams\n<@&585672404383039530> | Wonderful Server Boosters\n<@&581996154116374542> | Won through a limited event\n\n**Level Roles**\nBased upon MEE6 `!rank`\n\n<@&542051690195451907> | Level 70\n<@&523184440491638795> | Level 50\n<@&497578834376392724> | Level 30\n<@&687470373331402752> | Level 25\n<@&497491254838427674> | Level 15\n<@&497843968151781378> | Level 5\n<@&659628122756349982> | Can be bought in the shop at <@!292953664492929025>\nOther roles can be obtained upon choosing when leveling up.\n\n**Bot Roles**\n\n<@&511987649288863744> | The Main Important Bots\n<@&495735086558478337> | Normal Play Bots\n<@&527645289775890432> | Music Bots\n\n**Others**\n\n<@&528731175133642782> | YouTuber Role\n<@&496717793388134410> | Obtained upon verifying\n<@&534439431453671445> | People who don\'t play ML\n<@&497654614729031681> | People who are subscribed \`|iam subscriber\`\n<@&706932223181324340> | Pings for giveaways \`|iam giveawaypings\`\n<@&527780768961789975> | Members that are muted\n<@&687137752571314257> | Music DJ\n\n__**Please Don\'t Beg For Roles**__\n*Even though some are given out*")
            .setColor("#FFFEFE")
        welcomeFetch.edit({embed: embed})
    }
})*/
bot.on('message', message => {
    if(message.content.startsWith(`${prefix}rainbow`) && message.author.id === owner){
        const args = message.content.split(" ").slice(1)
        const text = args.join(" ")
        console.log("Pass")
        if (text === "true"){
            let a = true
            console.log("Pass 2")
            while(a === true){
            message.channel.send("1")
            let color = ((1 << 24) * Math.random() | 0).toString(16); 
            let role = message.guild.roles.cache.find(role => role.name === "Rainbow");
            setInterval(() => {
                role.setColor(`${color}`)
            },10000);
            message.channel.send("Changed color")
            }
        }
    }
})

bot.on('guildMemberAdd',function(message){
    const jk = bot.guilds.cache.get("493164609591574528")
    const channel = jk.channels.cache.get("744610120004010005")

})

bot.on('message', function(message){
    const role1 = message.guild.roles.cache.find(role => role.name === `Unverified`)
    const role2 = message.guild.roles.cache.find(role => role.name === `Friends`)
    const Members = message.guild.members.cache.map(member => member);
    if(message.content.startsWith(`${prefix}unverified`) && (Members.roles.cache.some(role => role.name === 'Unverified') === false)){
        message.channel.send(Members)
    }
});

bot.on('message', function(message){
    const args = parseInt(message.content.split(" ").slice(1))
    if(message.content.startsWith(`${prefix}prune`) && message.author.id === owner)
    message.channel.messages.fetch({ limit: args+1 })
    .then(fetched => {
      const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);
  
      message.channel.bulkDelete(notPinned, true);
    })
    .catch(console.error);
});
bot.on('message', function(message){
    const args = message.content.split(" ").slice(1)
    const text = args.join(' ')
    if(message.content.startsWith(`${prefix}setactivity`)){
    //bot.user.setPresence({ activity: { name: 'https://www.youtube.com/c/TeamGosu/videos and https://disord.gg/gosugeneral' }, status: 'dnd'})
    bot.user.setActivity(`${text}`)
    message.delete()}
});
bot.on('message', function(message){
    const args = message.content.split(" ").slice(1)
    const text = args.join(' ')
    if(message.content.toLowerCase() === `no u` || message.content.toLowerCase() === `no you` || message.content === `nou`){
        if(message.channel.name === "chat" || message.channel.name === "bots-fiesta"){
            message.channel.send("No u <@!" + message.author + ">")
        }
    }
});
bot.on('ready', function(){
    console.log("Ready")
    bot.user.setPresence({status: 'dnd' })
});
/*bot.on('message', function(message){
    if (message.channel.name !== "274909438366973953" || message.author.bot || message.author.role == 526898122664837120 || message.content.includes('Owo') || message.content.includes('owo'))
    return;
    else message.delete({timeout: 5000})
});*/
bot.on('message', function(message){
    let jk = bot.guilds.cache.get('495716062097309697')
    let afkLogs = jk.channels.cache.get("823541984173359144")
    let args = message.content
    if (message.channel.id === '531582320214278144' && message.content.startsWith("Owo")){
        message.channel.send("Cooldown").then(msg => msg.delete({timeout: 14000}))
    }/*return;*/
    /*else {
    const embed = new discord.MessageEmbed()
        .setTitle(message.guild.name)
        .addField("In:" , `<#${message.channel.id}>`)
        .addField('Mention:',`<@!${message.author.id}>`)
        .addField('Message:',`${args}`)
        .setDescription(message.guild.member(message.author).nickname)
        .setColor("#FFFEFE")
        .setTimestamp()
    afkLogs.send({embed: embed})///.then(msg => msg.delete({timeout: 3000}));
    ///return;
    }*/
});
const talkedRecently = new Set();
bot.on('message', function(message){
    let lottery = (Math.floor(Math.random() * 100000) + 1)
    if(message.content.startsWith(`?slot`) || message.content.startsWith("/slot")){
    if(message.channel.id === "814180051444170779" || message.channel.id === "497076896199344156" || message.channel.id === "834412932942004305" || message.channel.id === "834427984114221076"){
        message.delete()
        if (talkedRecently.has(message.author.id)) {
        /*const embed = new discord.MessageEmbed('818895369400221716')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription("Wait 3 second before getting typing this again. - " + `${message.author}`)
            .setColor("#FFFEFE")
            .setTimestamp()
        message.channel.send({embed: embed}).then(msg => msg.delete({timeout: 3000}));*/
        return;
    } else {

           // the user can type the command ... your command code goes here :)
        if (lottery === 100000){
        const embed = new discord.MessageEmbed('818895369400221716')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`You won 200000 dias ${message.author}`)
            .setColor("#FFFEFE")
            .setTimestamp()
        message.channel.send({embed: embed})
        message.channel.send(`<@!${owner}>`)
        }
        else if (lottery === 69 || lottery === 690 || lottery === 6969 || lottery === 69690 || lottery ===69696){
        const embed = new discord.MessageEmbed('818895369400221716')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`You won 69 dias ${message.author} cause you got ${lottery}`)
            .setColor("#FFFEFE")
            .setTimestamp()
        message.channel.send({embed: embed})
        message.channel.send(`<@!${owner}>`)
        }
        else if(lottery >= 99900 && lottery !== 100000){
            const embed = new discord.MessageEmbed('818895369400221716')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription("You got a " + lottery + ` ${message.author}` + "\nSo close but not quite")
            .setFooter("Winning number is 100,000")
            .setColor("#FFFEFE")
            .setTimestamp()
        message.channel.send({embed: embed})
        }
        else if(lottery <= 100){
            const embed = new discord.MessageEmbed('818895369400221716')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription("You got a " + lottery + ` ${message.author}` + "\nNot even remotely close")
            .setFooter("Winning number is 100,000")
            .setColor("#FFFEFE")
            .setTimestamp()
        message.channel.send({embed: embed})
        }
        else{
        const embed = new discord.MessageEmbed('818895369400221716')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription("You got a " + lottery + ` ${message.author}`)
            .setFooter("Winning number is 100,000")
            .setColor("#FFFEFE")
            .setTimestamp()
        message.channel.send({embed: embed}).then(msg => msg.delete({timeout: 5000}));
        }
        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 3000);
    }
    }
    }
})
//dictionary
bot.on('message', function(message){
    const args = message.content.split(" ").slice(1)
    const list = args[0]
    const text = args.join(" ")
    const text2 = args[1]
    let p = require('./dictionary.json')
    for (let key of Object.keys(p)) {
        if (message.content.startsWith(`${prefix}dict`)){
            message.delete()
            if(key.toLowerCase() === text.toLowerCase()){
            const embed = new discord.MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setTitle("Gosu Dictionary")
                .addField(`${key}`, p[key])
                .setColor("#FFFEFE")
            message.channel.send({embed: embed}).then(msg => msg.delete({timeout: 30000}))
            }
            else if(list === "list"){
                if(text2 === "1"){
                const embed = new discord.MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setTitle("Gosu Dictionary")
                    .addField("List", 'Goddess Syndrome\nFlaming\nRubyJ\nJenny\nDreaming\nShuu\nMaze\nGoddess\nNagshi\nDark Phantom')
                    .setFooter("Page 1/5")
                    .setColor("#FFFEFE")
                message.channel.send({embed: embed}).then(msg => msg.delete({timeout: 15000}))
                }
                else if(text2 === "2"){
                const embed = new discord.MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setTitle("Gosu Dictionary")
                    .addField("List", 'Prince Fire\nGeneral\nKitsune\nFluffy\nSunny\nCapri\nCheap\nCherry\nCindu\nTeru')
                    .setFooter("Page 2/5")
                    .setColor("#FFFEFE")
                message.channel.send({embed: embed}).then(msg => msg.delete({timeout: 15000})) 
                }
                else if(text2 === "3"){
                const embed = new discord.MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setTitle("Gosu Dictionary")
                    .addField("List", 'Yujin\nZero\nMelody\nKousei\nStoner\nHoon\nZultra\nChoke\nG4\nVector')
                    .setFooter("Page 3/5")
                    .setColor("#FFFEFE")
                message.channel.send({embed: embed}).then(msg => msg.delete({timeout: 15000})) 
                }
                else if(text2 === "4"){
                    const embed = new discord.MessageEmbed()
                        .setAuthor(message.guild.name, message.guild.iconURL())
                        .setTitle("Gosu Dictionary")
                        .addField("List", 'Loy Jie Hao\nHazel\nIcey\nFlaming Bot\nNova Melody\nShemale\nLoli\nClown\nSmh\nSimp')
                        .setFooter("Page 4/5")
                        .setColor("#FFFEFE")
                    message.channel.send({embed: embed}).then(msg => msg.delete({timeout: 15000})) 
                }
                else if(text2 === "5"){
                    const embed = new discord.MessageEmbed()
                        .setAuthor(message.guild.name, message.guild.iconURL())
                        .setTitle("Gosu Dictionary")
                        .addField("List", 'Oop\nSeagull\nKnife\nFreddy\nLoogie')
                        .setFooter("Page 5/5")
                        .setColor("#FFFEFE")
                    message.channel.send({embed: embed}).then(msg => msg.delete({timeout: 15000})) 
                }
                else{
                const embed = new discord.MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setTitle("Gosu Dictionary")
                    .addField("List", 'Goddess Syndrome\nFlaming\nRubyJ\nJenny\nDreaming\nShuu\nMaze\nGoddess\nNagshi\nDark Phantom')
                    .setFooter("Page 1/5")
                    .setColor("#FFFEFE")
                message.channel.send({embed: embed}).then(msg => msg.delete({timeout: 15000})) 
                }
            break;
            }
            else if(text.toLowerCase() === "word of the day" || text.toLowerCase() === "wotd"){
                const embed = new discord.MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setTitle("Gosu Dictionary")
                    .setDescription("**Word of the day**")
                    .addField("Catbat/Cabat", 'Literally what it is it\'s a cat with bat wings')
                    .setImage("https://cdn.discordapp.com/attachments/496716663144579082/825373824613875783/unknown.png")
                    .setColor("#FFFEFE")
                message.channel.send({embed: embed}).then(msg => msg.delete({timeout: 15000}))
            break;
            }
            /*else{
            message.channel.send("Word not found").then(msg => msg.delete({timeout: 3000}))
            break;
            }*/
        }
    }
})
bot.login(token.token)
/*1. Respect the channels
Keep things in their appropriate channels. They exist for a reason, please use them as intended.

2. No personal attacks or harassment
Racism or sexism will not be tolerated. Casual swearing is not allowed, although excessive use of rough language will result in a warning/mute/kick/ban in the server.

3. No spamming links, images, mentions, etc.
Spamming messages/Excessive emotes will get you muted/kicked/banned from the server.

4. No NSFW content
Do not post NSFW content of any kind as this may result for you to get kicked/banned. 
Keep it PG12!

5. No Advertising in chat or in PM/DM
Sending unsolicited invite links may result in a ban. Advertising other unaffiliated sites is not allowed. Sending links through DM without the permission of the user you shared that link with is strictly not allowed.
Will most likely result you in a ban/kick if not a mute.

7. No writing in caps
Do not write in all caps, if it is more than 70% it will be deleted by the bot and excessive use of caps will get you muted. 

8. Do not excessively ping any members
For example pinging random members few/multiple times for no reason even if they are different people or for bots. Do not ping the Mods/Gosu. There is a reason why #support exists. If there is something going wrong in chat or in one of the channels or voice channel you may DM/ping one of the mod that is online or idle if not the nearest mod that can be seen and patiently wait for them to respond.

9. @Filter's Automod for messages will mute/kick you if you break one of the rules

10. Do not consistently beg for roles/skins
Begging for roles/skins will not get you anywhere except a warning or a mute.

11. Server guides and invites can be found in #old-welcome and #📣server-guide

12. Moderators and admin may punish a member upon their appropriate discretion at any given time.

12. Any type of copypasta (copying and pasting large messages) will result in 180 minute mute.

13. Any account selling/Account piloting services are prohibited.
Selling accounts on this server is bannable and any type of free diamond app advertisement can lead you to a kick or ban at the least

14. Anything that can get you banned in ML can get you banned here. Please follow ML's ToS. That applies to the same as Discord's ToS since we are a partnered server.

15. Alternate accounts are not allowed.
This means that verifying with your main or smurf account on two different discord accounts is bannable. We do not tolerate users who escape their punishment by using different accounts. If you are caught using two accounts(no matter the reason), you will be kicked or banned.

16. Have fun in the server and that's it :smile:*/
/*bot.on('message', async message => {
    let afkLogs = message.guild.channels.cache.get("676955266394226689")
    let welcomeFetch = await afkLogs.messages.fetch("818895369400221716")
    if (message.content.startsWith(`${prefix}rules`)){
        const embed = new discord.MessageEmbed('818895369400221716')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("Welcome to " + message.guild.name)
            .setDescription("Important to be followed in this server.\nRule 1: You can swear, but keep it limited.\nRule 2: No sexual hate, no gender hate, no slurs, no racial stuff.(Includes LGTBQ+)\nRule 3: No Harassing People, Doxing, or DDosing.\nRule 4: Keep this server PG12+.\nRule 5: Talk in the proper channel, ty.\nRule 6: Please don't ping for no reason. (Ghost Ping)\nRule 7: Don't fight in this server for more than 5 minutes. (Must be out of this server.)\nRule 8: Please follow our Discord ToS. Any Rule broken from our Discord ToS that person will be banned.\nRule 9: No NSFW with exposed aroused genitalia OR gore. (Automatic Ban)\nRule 10: Don't ping Mod roles or the High Power Roles.\nRule 11: If any mod is abusing the power, please DM <@!597182208817627143> right away.")
            .setColor("#FFFEFE")
        welcomeFetch.edit({embed: embed})
    }
})*/