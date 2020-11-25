const db = require('quick.db')
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);
var prefix = ayarlar.prefix
var token = ayarlar.token
client.on('ready', msg => {
  console.log(`${client.user.tag} Adlı Bota Giriş Yapıldı !`)
});

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} Komut Yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
client.elevation = message => {
  if(message.author.id == ayarlar.sahip || message.author.id == ayarlar.furry) return 4;
  else return 0;
};
  
client.on("ready", () => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yaptı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);

      var sayOyun = "AFK"
      var sayDurum = "dnd"
      var sayType = "PLAYING"
      var zamann = "null"
      if(db.has("timestam")) zamann = db.fetch("timestam")
      if(db.has("oyunum")){ sayOyun = db.fetch("oyunum") }
      if(db.has("durumum")){ sayDurum = db.fetch("durumum") }
      if(db.has("tipim")){ sayType = db.fetch("tipim") }
      //client.user.setPresence({ game: { name: sayOyun, type: sayType, timestamps: { start: zamann, end: null } }, status: sayDurum} );
      log("Oyun : " + sayOyun + ", Tip : " + sayType + ", Durum : " + sayDurum + " (Reboot)")
  
  if(db.has("privdeyim")) {
    var f = client.guilds.get("381744690699173902").members.get("352164931879174144")
    f = client.guilds.get("381744690699173902").channels.get(f.voiceChannel ? f.voiceChannel.id : null)
    //console.log(f.userLimit, f.members.size)
    if(f && f.name.startsWith("Private") && f.userLimit !== f.members.size) {
      f.join().then(() => {
        db.set("privdeyim", true)
      })
    } else client.guilds.get("381744690699173902").channels.get("575350189716406292").join()
  }
})
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.login(ayarlar.token)