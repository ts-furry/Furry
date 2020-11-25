const Discord = require('discord.js');
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")
const moment = require('moment');

function log(logg) {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${logg}`);
}

exports.run = function(client, message, args) {
  if(message.author.id !== ayarlar.sahip && message.author.id !== ayarlar.furry) return
  var f = client.guilds.get("381744690699173902").members.get("352164931879174144")
  if(f.voiceChannel && f.voiceChannel.name.startsWith("Private")) {
    f.voiceChannel.join().then(() => {
      db.set("privdeyim", true)
    })
  }
  client.guilds.get("381744690699173902").channels.get("575350189716406292").join().then(() => {
    db.set("privdeyim", true)
    client.guilds.get("381744690699173902").channels.get("575349166956347402").send("ts!git <@699875263227625592>")
  })
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'res',
  description: 'res',
  usage: 'res'
};