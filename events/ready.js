const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")
var prefix = ayarlar.prefix;

function log(logg) {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${logg}`);
}

module.exports = client => {

}