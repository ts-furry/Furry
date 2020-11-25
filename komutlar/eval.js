const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, args) => {
  const db = require("quick.db");
  const moment = require('moment');
	try {
	  var code = args.join(" ");
		var evaled = eval(code);

		if (typeof evaled !== "string")
		evaled = require("util").inspect(evaled);

		message.channel.send(clean(evaled), {code:true}).then(masage => masage.delete(5000))
	} catch (err) {
	  message.channel.send(`\`Eval\` \`\`\`xl\n${clean(err)}\n\`\`\``).then(masage => masage.delete(5000))
	}
	function clean(text) {
	  if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	  else return text;
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: '',
  description: '',
  usage: ''
};
