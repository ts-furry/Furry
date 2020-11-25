const Discord = require('discord.js');
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")
const moment = require('moment');

function log(logg) {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${logg}`);
}

exports.run = function(client, message, args) {
  if(message.author.id !== ayarlar.sahip && message.author.id !== ayarlar.sepya) return
  db.delete("privdeyim")
  if(client.guilds.get("381744690699173902").voiceConnection && client.guilds.get("381744690699173902").voiceConnection.channel) client.guilds.get("381744690699173902").voiceConnection.channel.leave()
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["cik", "çik", "cık"],
  permLevel: 4
};

exports.help = {
  name: 'çık',
  description: 'Çık',
  usage: 'çık'
};